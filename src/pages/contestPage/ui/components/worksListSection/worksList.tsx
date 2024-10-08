import { FC, useEffect, useState } from 'react'
import clsx from 'clsx'
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
import Spinner from 'shared/ui/spinner'
import { VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

interface Props {
    workType: 'media' | 'text'
    sort: 'new' | 'popular'
    openModal: (work: Work) => void
}

export const WorksList: FC<Props> = (props) => {
    const { sort, workType, openModal } = props

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
            (media.nextLoading ||
                media.loading ||
                media.totalPages <= media.page ||
                !media.totalElements)
        ) {
            return true
        }
        if (
            workType === 'text' &&
            (text.nextLoading ||
                text.loading ||
                text.totalPages <= text.page ||
                !text.totalElements)
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
        if (media.loading || text.loading) {
            if (windowWidth > 1200) {
                return (
                    <>
                        <li>
                            <WorkCardSkeleton media={workType === 'media'} />
                        </li>
                        <li>
                            <WorkCardSkeleton media={workType === 'media'} />
                        </li>
                        <li>
                            <WorkCardSkeleton media={workType === 'media'} />
                        </li>
                    </>
                )
            }
            return (
                <>
                    <li>
                        <WorkCardSkeleton media={workType === 'media'} />
                    </li>
                    <li>
                        <WorkCardSkeleton media={workType === 'media'} />
                    </li>
                </>
            )
        }

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
                return newMediaWorks?.map((item) => (
                    <WorkCard key={item.id} data={item} openModal={openModal} />
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
            return popularMediaWorks?.map((item) => (
                <WorkCard key={item.id} data={item} openModal={openModal} />
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
                      <WorkCard
                          key={item.id}
                          data={item}
                          openModal={openModal}
                      />
                  ))
            : (!popularTextWorks.length && (
                  <li className='participants-works__message'>
                      <Text Tag='p' size='xl'>
                          No popular works yet.
                      </Text>
                  </li>
              )) ||
                  popularTextWorks?.map((item) => (
                      <WorkCard
                          key={item.id}
                          data={item}
                          openModal={openModal}
                      />
                  ))
    }

    return (
        <VStack className='participants-works__list-wrapper align__center '>
            <ul
                className={clsx(
                    'participants-works__list',
                    (newTextWorks.length > 4 && `${workType}-works`) ||
                        (popularTextWorks.length > 4 && `${workType}-works`)
                )}>
                {renderList()}
            </ul>

            {(media.nextLoading || text.nextLoading) && <Spinner />}
            {loadMoreCondition() ||
                (sort === 'new' && (
                    <Button variant='secondary' onClick={onLoadMore}>
                        Show more works
                    </Button>
                ))}
        </VStack>
    )
}
