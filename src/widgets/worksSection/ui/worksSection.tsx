import React, { useCallback, useEffect, useMemo,useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import FeedWorkSkeleton from 'entities/feedWork/ui/feedWorkSkeleton'
import { Work } from 'entities/work'
import WorkComponent from 'entities/work/ui/workComponent'
import { fetchFeedWorks } from 'pages/feedPage/model/services/fetchWorks'
import { Button } from 'shared/ui/button'
// import { MobileWorkPreview } from 'shared/ui/mobileWorkPreview'
import { ModalWindow } from 'shared/ui/modalWindow'
import Spinner from 'shared/ui/spinner'

import { WorkPreview } from './workPreview/workPreview'

import './worksSection.scss'

const WorksSection: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const loaderRef = useRef<HTMLDivElement | null>(null)
    const [workPreviewId, setWorkPreviewId] = useState<string>('')


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


    // если закрываем модалку - очищаем квери
    const handleCloseModal = () => {
        const params = new URLSearchParams(location.search)
        params.delete('workId')
        navigate(`${location.pathname}?${params.toString()}`, { replace: true, preventScrollReset: true })
    }

    // если такой ворк есть в кеше, то открываем модалку
    useEffect(() => {
        const workIdParam = searchParams.get('workId') ?? ''
        

        setWorkPreviewId(workIdParam)
        
    }, [searchParams.toString(), posts])

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

    return (
        <div className='worksSection'>
            <div className='worksSection_container'>
                <Button variant='secondary' type='button' onClick={handleInvalidate} style={{width: "100%"}}>Show new works</Button>
                <div>
                    <ul>
                        {works? works.pages.map((page) =>
                            page.content.map((data: Work) => (
                                <li><WorkComponent work={data} key={data.id} /></li>
                            ))
                        ): 
                        Array.from({ length: 3 }).map((_, i) => (
                            <li key={i}>
                                <FeedWorkSkeleton />
                            </li>
                        ))}
                    </ul>
                </div>

                <div ref={loaderRef} style={{ height: 500, position: "absolute", bottom: '0px'}} />
                {isFetchingNextPage  && <Spinner bottom/> }
                {!hasNextPage && <p>Больше новостей нет</p>}
            </div>
            
            {workPreviewId && (
                <ModalWindow isOpen onClose={handleCloseModal}>
                    <WorkPreview workId={workPreviewId} isFeed contestLink/>
                </ModalWindow>
            )}

        </div>
    )
}

export default WorksSection
