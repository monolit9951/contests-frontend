import { FC, useEffect, useState } from 'react'
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
import { Button } from 'shared/ui/button'
import { ModalWindow } from 'shared/ui/modalWindow'
// import { ModalWindow } from 'shared/ui/modalWindow'
import Spinner from 'shared/ui/spinner'
import { Text } from 'shared/ui/text'
import { WorkPreview } from 'widgets/worksSection/ui/workPreview/workPreview'

// import { WorkPreview } from 'widgets/worksSection/ui/workPreview/workPreview'
import './worksList.scss'

interface Props {
    workType: 'media' | 'text'
    sort: 'new' | 'popular'
}

export const WorksList: FC<Props> = (props) => {
    const { sort, workType } = props

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const dispatch = useAppDispatch()

    const ownerId = useAppSelector(selectContestOwnerId)
    const media = useAppSelector(selectContestMedia)
    const text = useAppSelector(selectContestText)

    const popularTextWorks = text.popular as Work[]
    const newTextWorks = text.new as Work[]

    const popularMediaWorks = media.popular as Work[]
    const newMediaWorks = media.new as Work[]

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [windowWidth])

    const loadMoreCondition = () => {
        if (
            workType === 'media' &&
            (media.nextLoading || media.loading || media.totalPages <= media.page || !media.totalElements)
        ) {
            return true
        }
        if (workType === 'text' && (text.nextLoading || text.loading || text.totalPages <= text.page || !text.totalElements)
        ) {
            return true
        }
        return false
    }

    const onLoadMore = () => {
        loadMoreCondition()

        if (workType === 'media') {
            dispatch(fetchNextMediaWorks(ownerId))
        } else {
            dispatch(fetchNextTextWorks(ownerId))
        }
    }


    const renderList = () => {

        if (workType === 'media') {
            if (sort === 'new') {
                if (!newMediaWorks.length) {
                    return (
                        <li className='participants-works__message media-works'>
                            <Text Tag='p' size='xl'>
                                No works yet.
                            </Text>
                        </li>
                    )
                }
                return newMediaWorks?.map((item: Work) => (
                    <WorkCard key={item.id} data={item} />

                ))
            }

            if (!popularMediaWorks.length) {
                return (
                    <li className='participants-works__message media-works'>
                        <Text Tag='p' size='xl'>
                            No popular works yet.
                        </Text>
                    </li>
                )
            }
            return popularMediaWorks?.map((item: Work) => (
                <WorkCard key={item.id} data={item} />

            ))
        }

        return sort === 'new'
            ? (!newTextWorks.length && (
                  <li className='participants-works__message'>
                      <Text Tag='p' size='xl'>
                          No works yet.
                      </Text>
                  </li>
              )) ||
                  newTextWorks?.map((item) => (
                    <WorkCard key={item.id} data={item} />
                  ))
            : (!popularTextWorks.length && (
                  <li className='participants-works__message'>
                      <Text Tag='p' size='xl'>
                          No popular works yet.
                      </Text>
                  </li>
              )) ||
                  popularTextWorks?.map((item) => (
                    <WorkCard key={item.id} data={item} />

                  ))
    }

    const [searchParams] = useSearchParams();

    const location = useLocation()
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [workPreviewId, setWorkPreviewId] = useState<string>('')

    const handleCloseModal = () => {
        const params = new URLSearchParams(location.search);
        params.delete("workId");

        navigate(`${location.pathname}?${params.toString()}`, { replace: true, preventScrollReset: true });
    }

    useEffect(() => {
        const workId = searchParams.get("workId");

        if (workId) {
            setWorkPreviewId(workId)
            setOpenModal(true)
        } else {
            setOpenModal(false)
            setWorkPreviewId('')
        }
    }, [searchParams]); // отслеживаем изменения

    return (
        <div className="worksList">
            {(!media.nextLoading || !text.nextLoading) && <ul>{renderList()}</ul>}
            {media.loading && <ul>
                <li><WorkCardSkeleton/></li>
                <li><WorkCardSkeleton/></li>
                <li><WorkCardSkeleton/></li>
                <li><WorkCardSkeleton/></li>
                <li><WorkCardSkeleton/></li>
                <li><WorkCardSkeleton/></li>
                <li><WorkCardSkeleton/></li>
                <li><WorkCardSkeleton/></li>
                <li><WorkCardSkeleton/></li>
            </ul>}
            {(sort === 'new' && !newMediaWorks.length) || (sort=== 'popular' && !popularMediaWorks.length) && <div className="worksList_noWorks">No {sort === 'popular' && 'popular'} works</div>}
            {(media.nextLoading || text.nextLoading) && <Spinner />}

            {loadMoreCondition() ||
            (sort === 'new' && (
                <Button variant='secondary' onClick={onLoadMore}>
                    Show more works
                </Button>
            ))}


            {openModal && <ModalWindow isOpen onClose={handleCloseModal}><WorkPreview workId={workPreviewId}/></ModalWindow>}
        </div>
        
    )
}
