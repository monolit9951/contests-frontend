import React, { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
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
import Spinner from 'shared/ui/spinner'
import { Text } from 'shared/ui/text'

import './worksSection.scss'

const WorksSection: React.FC = () => {

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const works = useAppSelector(selectWorks)
    const loading = useAppSelector(selectLoading)
    const error = useAppSelector(selectError)
    const page = useAppSelector(selectPage)
    const hasMore = useAppSelector(selectHasMore)

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
        [loading, hasMore]
    )

    useEffect(() => {
        dispatch(fetchWorks(page))
    }, [dispatch, page])


    if (loading && !works.length) {
        return <Spinner center />
    }

    if (error) {
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
    }

    return (
        <div className="worksSection">
            <div className="worksSection_container">
                <ul className='worksSection_list'>
                    {works.map((data: Work, index: number) => {
                        if (index === works.length - 1) {
                            return (
                                <li key={data.id} ref={lastWorkElementRef}>
                                    <WorkComponent work={data} />
                                </li>
                            )
                        }
                            return (
                                <li key={data.id}>
                                    <WorkComponent work={data} />
                                </li>
                            )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default WorksSection
