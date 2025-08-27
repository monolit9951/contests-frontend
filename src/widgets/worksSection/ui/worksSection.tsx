import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
// import FeedWorkSkeleton from 'entities/feedWork/ui/feedWorkSkeleton'
import { Work } from 'entities/work'
import WorkComponent from 'entities/work/ui/workComponent'
import {
    fetchWorks,
    incrementPage,
    selectError,
    selectHasMore,
    selectLoading,
    selectPage,
    selectWorks,
} from 'pages/feedPage'
import { useAppDispatch, useAppSelector } from 'shared/lib/store'
import { Button } from 'shared/ui/button'
import { ModalWindow } from 'shared/ui/modalWindow'
import Spinner from 'shared/ui/spinner'
import { Text } from 'shared/ui/text'

import { WorkPreview } from './workPreview/workPreview'

import './worksSection.scss'

const WorksSection: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useAppDispatch()
    const [searchParams] = useSearchParams()

    // хуки должны быть ВСЕГДА вызваны первыми
    const works = useAppSelector(selectWorks)
    const loading = useAppSelector(selectLoading)
    const error = useAppSelector(selectError)
    const page = useAppSelector(selectPage)
    const hasMore = useAppSelector(selectHasMore)

    const [workPreviewId, setWorkPreviewId] = useState<string>('')

    const observer = useRef<IntersectionObserver | null>(null)
    const lastWorkElementRef = useCallback(
        (node: any) => {
            if (loading) return
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    dispatch(incrementPage())
                }
            })
            if (node) observer.current.observe(node)
        },
        [loading, hasMore, dispatch]
    )

    const handleCloseModal = () => {
        const params = new URLSearchParams(location.search)
        params.delete('workId')
        navigate(`${location.pathname}?${params.toString()}`, { replace: true, preventScrollReset: true })
    }

    // безопасный useEffect для searchParams
    useEffect(() => {
        const workIdParam = searchParams.get('workId') ?? ''
        setWorkPreviewId(workIdParam)
    }, [searchParams.toString()])

    useEffect(() => {
        dispatch(fetchWorks(page))
    }, [dispatch, page])

    if (loading && !works.length) return <Spinner center />
    if (error)
        return (
            <div className='works-section__error-message'>
                <Text Tag='p' bold size='xl'>
                    Error: {error}
                </Text>
                <Button variant='secondary' onClick={() => navigate(-1)}>
                    Go back
                </Button>
            </div>
        )

    return (
        <div className='worksSection'>
            <div className='worksSection_container'>
                <ul className='worksSection_list'>
                    {works.map((data: Work, index: number) => {
                        if (index === works.length - 1) {
                            return (
                                <li key={index} ref={lastWorkElementRef}>
                                    <WorkComponent work={data} />
                                </li>
                            )
                        }
                        return (
                            <li key={index}>
                                <WorkComponent work={data} />
                            </li>
                        )
                    })}
                    {/* {(loading && !works.length && 
                        <>
                            <li><FeedWorkSkeleton /></li>
                            <li><FeedWorkSkeleton /></li>
                            <li><FeedWorkSkeleton /></li>
                        </> 
                    )} */}
                </ul>
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
