import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
// import Spinner from 'shared/ui/spinner'
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query'
import { Work } from 'entities/work'
import WorkComponent from 'entities/work/ui/workComponent'
import { fetchFeedWorks } from 'pages/feedPage/model/services/fetchWorks'
import { ModalWindow } from 'shared/ui/modalWindow'

import { WorkPreview } from './workPreview/workPreview'

import './worksSection.scss'

const WorksSection: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const loaderRef = useRef<HTMLDivElement | null>(null);

    const [workPreviewId, setWorkPreviewId] = useState<string>('')

    // если закрываем модалку - очищаем квери
    const handleCloseModal = () => {
        const params = new URLSearchParams(location.search)
        params.delete('workId')
        navigate(`${location.pathname}?${params.toString()}`, { replace: true, preventScrollReset: true })
    }

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
        initialPageParam: 1, 
        getNextPageParam: (lastPage, allPages) =>
            lastPage.content.length === 3 ? allPages.length + 1 : undefined,
    });



    console.log(works)

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

    const queryClient = useQueryClient();

    const updateDescription = (workId: string, newDescription: string) => {
        queryClient.setQueryData(['feedWorks'], (oldData: any) => {
            if (!oldData) return oldData;

            return {
            ...oldData,
            pages: oldData.pages.map((page: any) => ({
                ...page,
                content: page.content.map((work: any) =>
                work.id === workId ? { ...work, description: newDescription } : work
                ),
            })),
            pageParams: oldData.pageParams,
            };
        });
    };


    return (
        <div className='worksSection'>
            
            <div className='worksSection_container'>
                <button type='button' onClick={() => updateDescription('68aefd0d4437153ad8d1c5d9', 'Новый текст описания')}>CHANGE</button>
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
            

            {workPreviewId && (
                <ModalWindow isOpen onClose={handleCloseModal}>
                    <WorkPreview workId={workPreviewId} isFeed/>
                </ModalWindow>
            )}
        </div>
    )
}

export default WorksSection
