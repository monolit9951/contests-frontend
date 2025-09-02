import React, { useCallback, useEffect, useMemo,useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { Work } from 'entities/work'
import WorkComponent from 'entities/work/ui/workComponent'
import { AnimatePresence, motion } from "framer-motion"
import { fetchFeedWorks } from 'pages/feedPage/model/services/fetchWorks'
// import { MobileWorkPreview } from 'shared/ui/mobileWorkPreview'
import { ModalWindow } from 'shared/ui/modalWindow'

import { WorkPreview } from './workPreview/workPreview'

import './worksSection.scss'

const WorksSection: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const loaderRef = useRef<HTMLDivElement | null>(null)
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [workPreviewId, setWorkPreviewId] = useState<string>('')

    // анимации для мобильной версии
    const variants = {
        enter: (dir: "up" | "down") => ({
            y: dir === "up" ? "100%" : "-100%",
        }),
        center: { y: 0 },
        exit: (dir: "up" | "down") => ({
            y: dir === "up" ? "-100%" : "100%",
        }),
    }

    const { 
        data: works, 
        fetchNextPage, 
        hasNextPage, 
        isFetchingNextPage 
    } = useInfiniteQuery({
        queryKey: ['feedWorks'],
        queryFn: fetchFeedWorks,
        initialPageParam: 0, 
        getNextPageParam: (lastPage, allPages) =>
            lastPage.content.length === 3 ? allPages.length : undefined,
    })

    // Собираем массив id из всех страниц
    const posts = useMemo(() => {
        if (!works) return []
        return works.pages.flatMap(page => page.content.map((w: Work) => w.id))
    }, [works])

    const currentWorkId = searchParams.get("workId")
    const initialIndex = posts.findIndex((p) => p === currentWorkId)
    const startIndex = initialIndex !== -1 ? initialIndex : 0
    const [[index, direction], setIndex] = useState<[number, "up" | "down"]>([
        startIndex,
        "up",
    ])

    // свайп ап, это не переход вверх, а переход вниз (дирекшн это направление самого свайпа)
    const handleSwipe = async (dir: "up" | "down") => {
        if (dir === "up") {
            if (index < posts.length - 1) {
            setIndex([index + 1, "up"]);

            // подгруза на ПРЕДПОСЛЕДНЕМ ЭЛЕМЕНТЕ
            if (index === posts.length - 2 && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
            }
        } else if (dir === "down" && index > 0) {
            setIndex([index - 1, "down"]);
        }
    };



    // если закрываем модалку - очищаем квери
    const handleCloseModal = () => {
        const params = new URLSearchParams(location.search)
        params.delete('workId')
        navigate(`${location.pathname}?${params.toString()}`, { replace: true, preventScrollReset: true })
    }

    // обновляем URL при свайпах
    useEffect(() => {
        if (isMobile && posts.length > 0) {
            navigate(`/feed?workId=${posts[index]}`, { replace: true })
        }
    }, [index, navigate, posts])

    // если такой ворк есть в кеше, то открываем модалку
    useEffect(() => {
        const workIdParam = searchParams.get('workId') ?? ''
        
        if (isMobile) {
            // если квери пустой, то ставим первый пост
            setWorkPreviewId(workIdParam || posts[0] || '')
        } else {
            setWorkPreviewId(workIdParam)
        }
    }, [searchParams.toString(), isMobile, posts])

    // наблюдатель для подгрузки новых страниц
    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const target = entries[0]
            if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage()
            }
        },
        [hasNextPage, isFetchingNextPage, fetchNextPage]
    )

    // наблюдатель
    useEffect(() => {
        const option = { root: null, rootMargin: '20px', threshold: 0 }
        const observer = new IntersectionObserver(handleObserver, option)
        if (loaderRef.current) observer.observe(loaderRef.current)
        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current)
        }
    }, [handleObserver])

    // инвалидация, если юзер хочет новые ворки
    const queryClient = useQueryClient()
    const handleInvalidate = () =>{
        queryClient.invalidateQueries({ queryKey: ['feedWorks'] })
    }

    // отловить мобильную версию
    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth < 700)
        setIsMobile(window.innerWidth < 700)
        window.addEventListener("resize", handler)
        return () => window.removeEventListener("resize", handler)
    }, [])

    return (
        <div className='worksSection'>
            <div className='worksSection_container'>
                <button type='button' onClick={handleInvalidate} style={{width: "100%"}}>Invalidate</button>
                <div>
                    {!isMobile && works?.pages.map((page, pageIndex) => (
                        <ul key={pageIndex}>
                            {page.content.map((data: Work) => (
                                <WorkComponent work={data} key={data.id} />
                            ))}
                        </ul>
                    ))}
                </div>

                {!isMobile && <div ref={loaderRef} style={{ height: 40 }} />}
                {isFetchingNextPage && <p>Загрузка...</p>}
                {!hasNextPage && <p>Больше новостей нет</p>}
            </div>
            
            {!isMobile && workPreviewId && (
                <ModalWindow isOpen onClose={handleCloseModal}>
                    <WorkPreview workId={workPreviewId} isFeed contestLink/>
                </ModalWindow>
            )}

            {isMobile && posts.length > 0 && (
                <div className="feed_wrapper">
                    <div className="feed">
                        <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={posts[index]}
                            className="post"
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.35 }}
                            drag="y"
                            dragConstraints={{ top: 0, bottom: 0 }}
                            onDragEnd={(_, info) => {
                                if (info.offset.y < -100) handleSwipe("up")
                                if (info.offset.y > 100) handleSwipe("down")
                            }}
                        >
                            {/* <MobileWorkPreview workId={posts[index]}/> */}
                        </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </div>
    )
}

export default WorksSection
