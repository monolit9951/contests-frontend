import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
// import Spinner from 'shared/ui/spinner'
// eslint-disable-next-line
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query'
import { Work } from 'entities/work'
import WorkComponent from 'entities/work/ui/workComponent'
import { AnimatePresence, motion } from "framer-motion";
import { fetchFeedWorks } from 'pages/feedPage/model/services/fetchWorks'
import { MobileWorkPreview } from 'shared/ui/mobileWorkPreview'
import { ModalWindow } from 'shared/ui/modalWindow'

import { WorkPreview } from './workPreview/workPreview'

import './worksSection.scss'

const WorksSection: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [workPreviewId, setWorkPreviewId] = useState<string>('')

      const variants = {
        enter: (dir: "up" | "down") => ({
            y: dir === "up" ? "100%" : "-100%",
        }),
        center: { y: 0 },
        exit: (dir: "up" | "down") => ({
            y: dir === "up" ? "-100%" : "100%",
        }),
    };

    const posts = [
        "68ad936c4437153ad8d1c544",
        "68af10974437153ad8d1c631",
        "68aefd0d4437153ad8d1c5d9",
        "68ac653d4437153ad8d08d14",
        "68ac653d4437153ad8d08d60",
    ];

    const currentWorkId = searchParams.get("workId");
    const initialIndex = posts.findIndex((p) => p === currentWorkId);
    const startIndex = initialIndex !== -1 ? initialIndex : 0;
    const [[index, direction], setIndex] = useState<[number, "up" | "down"]>([
        startIndex,
        "up",
    ]);

    const handleSwipe = (dir: "up" | "down") => {
        if (dir === "up" && index < posts.length - 1) {
            setIndex([index + 1, "up"]);
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


    useEffect(() => {
    navigate(`/feed?workId=${posts[index]}`, { replace: true });
  }, [index, navigate]);

    // если есть воркАйди в квери, то открываем модалку
    useEffect(() => {
        const workIdParam = searchParams.get('workId') ?? ''
        setWorkPreviewId(workIdParam)
    }, [searchParams.toString()])

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
    });


    // наблюдатель для скролла
    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
        const target = entries[0];

            if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        },
        [hasNextPage, isFetchingNextPage, fetchNextPage]
    );

    useEffect(() => {
        const option = { root: null, rootMargin: '20px', threshold: 0 };
        const observer = new IntersectionObserver(handleObserver, option);

        if (loaderRef.current) observer.observe(loaderRef.current);
            return () => {
                if (loaderRef.current) observer.unobserve(loaderRef.current);
            };
    }, [handleObserver]);


    const queryClient = useQueryClient()

    const handleInvalidate = () =>{
        queryClient.invalidateQueries({ queryKey: ['feedWorks'] })
    }

    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth < 700);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);


    return (
        <div className='worksSection'>
            <div className='worksSection_container'>
                <button type='button' onClick={handleInvalidate} style={{width: "100%"}}>Invalidate</button>
                <div>
                    {works?.pages.map((page, pageIndex) => (
                        <ul key={pageIndex}>
                            {page.content.map((data: Work) => (
                                <WorkComponent work={data} key={data.id} />
                            ))}
                        </ul>
                    ))}
                </div>

                <div ref={loaderRef} style={{ height: 40 }} />
                {isFetchingNextPage && <p>Загрузка...</p>}
                {!hasNextPage && <p>Больше новостей нет</p>}
            </div>
            

            {!isMobile && workPreviewId && (
                <ModalWindow isOpen onClose={handleCloseModal}>
                    <WorkPreview workId={workPreviewId} isFeed contestLink/>
                </ModalWindow>
            )}

            {isMobile && (
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
                            if (info.offset.y < -100) handleSwipe("up");
                            if (info.offset.y > 100) handleSwipe("down");
                            }}
                        >
                            <MobileWorkPreview workId={posts[index]} />
                        </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </div>
    )
}

export default WorksSection
