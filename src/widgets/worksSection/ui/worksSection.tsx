import React, { useCallback, useEffect, useRef, useState } from 'react'
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
import useAxios from 'shared/lib/hooks/useAxios'

const WorksSection: React.FC = () => {
    // const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)

    // const navigate = useNavigate()

    // const dispatch = useAppDispatch()

    // const works = useAppSelector(selectWorks)
    // const loading = useAppSelector(selectLoading)
    // const error = useAppSelector(selectError)
    // const page = useAppSelector(selectPage)
    // const hasMore = useAppSelector(selectHasMore)

    // const observer = useRef<IntersectionObserver | null>(null)

    // const lastWorkElementRef = useCallback(
    //     (node: any) => {
    //         if (loading) return
    //         if (observer.current) observer.current.disconnect()
    //         observer.current = new IntersectionObserver((entries) => {
    //             if (entries[0].isIntersecting && hasMore) {
    //                 dispatch(incrementPage())
    //             }
    //         })
    //         if (node) observer.current.observe(node)
    //     },
    //     [loading, hasMore]
    // )

    // useEffect(() => {
    //     const handleResize = () => {
    //         setWindowWidth(window.innerWidth)
    //     }

    //     window.addEventListener('resize', handleResize)

    //     return () => window.removeEventListener('resize', handleResize)
    // }, [windowWidth])

    // useEffect(() => {
    //     dispatch(fetchWorks(page))
    // }, [dispatch, page])


    // if (loading && !works.length) {
    //     return <Spinner center />
    // }

    // if (error) {
    //     return (
    //         <div className='works-section__error-message'>
    //             <Text Tag='p' bold size='xl'>
    //                 Error: {error}
    //             </Text>
    //             <Button variant='secondary' onClick={() => navigate(-1)}>
    //                 Go back
    //             </Button>
    //         </div>
    //     )
    // }


    const { data, isLoading } = useAxios<Work>(
        `works/68a8957b2a7ba106f3dcba7c`
    )


    return (
        <div className="worksSection">
            <div className="worksSection_container">
                <ul className='worksSection_list'>
                    {!isLoading && data && <WorkComponent work={data}/>}
                </ul>
            </div>
        </div>
    )
}

export default WorksSection
