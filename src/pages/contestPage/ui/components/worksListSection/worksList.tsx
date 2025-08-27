import { FC, useCallback,useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Work, WorkCard, WorkCardSkeleton } from 'entities/work'
import {
    selectContestMedia,
    selectContestOwnerId,
    selectContestText,
} from 'pages/contestPage/model/selectors'
import {
    fetchNextMediaWorks,
    fetchNextTextWorks,
} from 'pages/contestPage/model/services'
import { useAppDispatch, useAppSelector } from 'shared/lib/store'
import { ModalWindow } from 'shared/ui/modalWindow'
import Spinner from 'shared/ui/spinner'
import { Text } from 'shared/ui/text'
import { WorkPreview } from 'widgets/worksSection/ui/workPreview/workPreview'

import './worksList.scss'

interface Props {
    workType: 'media' | 'text'
    sort: 'new' | 'popular'
}

export const WorksList: FC<Props> = ({ workType, sort }) => {
    const dispatch = useAppDispatch()
    const ownerId = useAppSelector(selectContestOwnerId)
    const media = useAppSelector(selectContestMedia)
    const text = useAppSelector(selectContestText)

    const popularTextWorks = text.popular as Work[]
    const newTextWorks = text.new as Work[]
    const popularMediaWorks = media.popular as Work[]
    const newMediaWorks = media.new as Work[]

    const [searchParams] = useSearchParams()
    const location = useLocation()
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [workPreviewId, setWorkPreviewId] = useState<string>('')

    const loadMoreCondition = () => {
        if (
            workType === 'media' &&
            (media.nextLoading || media.loading || media.totalPages <= media.page || !media.totalElements)
        ) {
            return true
        }
        if (
            workType === 'text' &&
            (text.nextLoading || text.loading || text.totalPages <= text.page || !text.totalElements)
        ) {
            return true
        }
        return false
    }

    const onLoadMore = () => {
        if (loadMoreCondition()) return

        if (workType === 'media') {
            dispatch(fetchNextMediaWorks(ownerId))
        } else {
            dispatch(fetchNextTextWorks(ownerId))
        }
    }

    const renderList = () => {
        if (workType === 'media') {
            return (sort === 'new' ? newMediaWorks : popularMediaWorks)?.map((item) => (
                <WorkCard key={item.id} data={item} />
            ))
        }

        const works = sort === 'new' ? newTextWorks : popularTextWorks
        if (!works.length) {
            return (
                <li className='participants-works__message'>
                    <Text Tag='p' size='xl'>
                        {sort === 'new' ? 'No works yet.' : 'No popular works yet.'}
                    </Text>
                </li>
            )
        }

        return works.map((item) => <WorkCard key={item.id} data={item} />)
    }

    const handleCloseModal = () => {
        const params = new URLSearchParams(location.search)
        params.delete('workId')
        navigate(`${location.pathname}?${params.toString()}`, { replace: true, preventScrollReset: true })
    }

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

    // подгрузка по скроллу
    const handleScroll = useCallback(() => {
        const scrollTop = window.scrollY
        const windowHeight = window.innerHeight
        const fullHeight = document.documentElement.scrollHeight

        if (scrollTop + windowHeight >= fullHeight * 0.8) {
            onLoadMore()
        }
    }, [media, text, workType, sort, ownerId])

    useEffect(() => {
        const debounce = (func: () => void, wait = 200) => {
            let timeout: ReturnType<typeof setTimeout>
            return () => {
                clearTimeout(timeout)
                timeout = setTimeout(func, wait)
            }
        }

        const debouncedScroll = debounce(handleScroll, 200)
        window.addEventListener('scroll', debouncedScroll)
        return () => window.removeEventListener('scroll', debouncedScroll)
    }, [handleScroll])

    return (
        <div className="worksList">
            <ul>{renderList()}</ul>

            {(media.loading || text.loading) && (
                <ul>
                    {Array.from({ length: 9 }).map((_, idx) => (
                        <li key={idx}>
                            <WorkCardSkeleton />
                        </li>
                    ))}
                </ul>
            )}

            {(media.nextLoading || text.nextLoading) && <Spinner />}

            {openModal && (
                <ModalWindow isOpen onClose={handleCloseModal}>
                    <WorkPreview workId={workPreviewId} />
                </ModalWindow>
            )}
        </div>
    )
}
