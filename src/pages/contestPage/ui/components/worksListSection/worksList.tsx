import { FC,useCallback,useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Work, WorkCard } from 'entities/work'
import WorkComponent from 'entities/work/ui/workComponent'
import { fetchNewWorks } from 'pages/contestPage/model/services/fetchMediaWorks'
import { ModalWindow } from 'shared/ui/modalWindow'
import { WorkPreview } from 'widgets/worksSection/ui/workPreview/workPreview'

import './worksList.scss'

interface Props {
    sort: 'new' | 'popular'
}

export const WorksList: FC<Props> = ({ sort }) => {

    const navigate = useNavigate()
    const location = useLocation()
    const [workPreviewId, setWorkPreviewId] = useState<string>('')
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [searchParams] = useSearchParams()
    const loaderRef = useRef<HTMLDivElement | null>(null);

    console.log(sort)

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
        queryKey: ['contestWorks', contestId],
        queryFn: ({ pageParam = 0 }) => {
            if (!contestId) return Promise.resolve({ content: [] });
            return fetchNewWorks(contestId, pageParam);
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) =>
            lastPage.content.length === 9 ? allPages.length : undefined,
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
                {works?.pages.flatMap((page) =>
                    page.content.map((data: Work) => (
                    <WorkCard data={data} key={data.id} />
                    ))
                )}
            </ul>

            <div ref={loaderRef} style={{ height: 40 }} />
            {isFetchingNextPage && <p>LOADING...</p>}
            {/* {!hasNextPage && <p>NO WORKS </p>} */}


            {openModal && (
                <ModalWindow isOpen onClose={handleCloseModal}>
                    <WorkPreview workId={workPreviewId} />
                </ModalWindow>
            )}
        </div>
    )
}
