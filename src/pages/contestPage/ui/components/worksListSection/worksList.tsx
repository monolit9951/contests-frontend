import { FC,useCallback,useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
// eslint-disable-next-line
import { useInfiniteQuery } from '@tanstack/react-query'
import { Work, WorkCard } from 'entities/work'
import { fetchNewWorks, fetchPopularWorks } from 'pages/contestPage/model/services/fetchMediaWorks'
import { ModalWindow } from 'shared/ui/modalWindow'
import Spinner from 'shared/ui/spinner'
import { WorkPreview } from 'widgets/worksSection/ui/workPreview/workPreview'

import './worksList.scss'

interface Props {
    sort: 'new' | 'popular'
    handleActualWorksNum: (worksAmount: number) => void
}

export const WorksList: FC<Props> = ({ sort, handleActualWorksNum }) => {

    const navigate = useNavigate()
    const location = useLocation()
    const [workPreviewId, setWorkPreviewId] = useState<string>('')
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [searchParams] = useSearchParams()
    const loaderRef = useRef<HTMLDivElement | null>(null);

    // закрытие модалки и удаление квери
    const handleCloseModal = () => {
        const params = new URLSearchParams(location.search)
        params.delete('workId')
        navigate(`${location.pathname}?${params.toString()}`, { replace: true, preventScrollReset: true })
    }

    // открытие модалки при наличии воркАйди в квери
    useEffect(() => {
        const workId = searchParams.get('workId')
        if (workId) {
            setWorkPreviewId(workId)
            setOpenModal(true)
        } else {
            setOpenModal(false)
            setWorkPreviewId('')
        }
    }, [searchParams])

    const { contestId } = useParams<{ contestId: string }>();

    const { 
        data: works, 
        fetchNextPage, 
        hasNextPage, 
        isFetchingNextPage 
    } = useInfiniteQuery({
        queryKey: ['contestWorks', contestId, sort],
        queryFn: ({ pageParam = 0 }) => {
            if (!contestId) return Promise.resolve({ content: [] });

            if (sort === 'new') return fetchNewWorks(contestId, pageParam);

            if (sort === 'popular') return fetchPopularWorks(contestId, pageParam);

            return Promise.resolve({ content: [] });
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) =>
            lastPage.content.length === 6 ? allPages.length : undefined,
        enabled: !!contestId,
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

    useEffect(() =>{
        if(works){
            handleActualWorksNum(works.pages[0].totalElements)
        }
    }, [works])

    useEffect(() => {
        const option = { root: null, rootMargin: '20px', threshold: 0 };
        const observer = new IntersectionObserver(handleObserver, option);

        if (loaderRef.current) observer.observe(loaderRef.current);
            return () => {
                if (loaderRef.current) observer.unobserve(loaderRef.current);
            };
    }, [handleObserver])

    return (
        <div className="worksList">
            <ul>
                {works?.pages.map((page) =>
                    page.content.map((data: Work, index: number) => (
                        <WorkCard data={data} key={index} />
                    ))
                )}
            </ul>

            <div ref={loaderRef} style={{ height: 40 }} />
            {isFetchingNextPage && <Spinner />}


            {openModal && (
                <ModalWindow isOpen onClose={handleCloseModal}>
                    <WorkPreview workId={workPreviewId} />
                </ModalWindow>
            )}
        </div>
    )
}
