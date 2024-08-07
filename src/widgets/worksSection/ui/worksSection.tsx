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
import { ModalWindow } from 'shared/ui/modalWindow'
import Spinner from 'shared/ui/spinner'
import { VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'
import { WorkPreview } from 'widgets/worksSection/ui/workPreview/workPreview'

import './worksSection.scss'

const WorksSection: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [selectedWork, setSelectedWork] = useState<Work | null>(null)
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)

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
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [windowWidth])

    useEffect(() => {
        dispatch(fetchWorks(page))
    }, [dispatch, page])

    const openModal = (work: Work) => {
        setSelectedWork(work)
        setIsModalOpen(true)
    }

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

    const getModalMaxWidth = (work: Work | null): string => {
        if (work?.typeWork === 'TEXT') {
            return '520px'
        }
        return '100%'
    }

    return (
        <VStack className='works-section'>
            {works.map((work: Work, index: number) => (
                <div
                    key={work.id}
                    ref={works.length === index + 1 ? lastWorkElementRef : null}
                    className='works-section__content'>
                    <WorkComponent work={work} openModal={openModal} />
                </div>
            ))}

            {isModalOpen && (
                <ModalWindow
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    isOuterClose
                    maxWidth={getModalMaxWidth(selectedWork)}
                    height={windowWidth > 1024 ? '83%' : '88%'}
                    maxHeight={windowWidth >= 1024 ? '900px' : ''}
                    modalContentClass='work-preview-modal'>
                    {selectedWork && <WorkPreview work={selectedWork} />}
                </ModalWindow>
            )}

            {loading && <Spinner />}
        </VStack>
    )
}

export default WorksSection
