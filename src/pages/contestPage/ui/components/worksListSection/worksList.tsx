import { FC } from 'react'
import clsx from 'clsx'
import { Work, WorkCard } from 'entities/work'
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
import { VStack } from 'shared/ui/stack'

interface Props {
    workType: 'media' | 'text'
    sort: 'new' | 'popular'
}

export const WorksList: FC<Props> = (props) => {
    const { sort, workType } = props

    const dispatch = useAppDispatch()

    const ownerId = useAppSelector(selectContestOwnerId)
    const media = useAppSelector(selectContestMedia)
    const text = useAppSelector(selectContestText)

    const popularTextWorks = text.popular as Work[]
    const newTextWorks = text.new as Work[]

    const popularMediaWorks = media.popular as Work[]
    const newMediaWorks = media.new as Work[]

    const renderList = () => {
        if (media.loading || text.loading) {
            return <p>Loading...</p>
        }

        if (workType === 'media') {
            if (sort === 'new') {
                if (!newMediaWorks.length) {
                    return <li>No works here</li>
                }
                return newMediaWorks?.map((item) => (
                    <WorkCard key={item.id} data={item} />
                ))
            }

            if (!popularMediaWorks.length) {
                return <li>No works here</li>
            }
            return popularMediaWorks?.map((item) => (
                <WorkCard key={item.id} data={item} />
            ))
        }
        return sort === 'new'
            ? (!newTextWorks.length && <li>No works here</li>) ||
                  newTextWorks?.map((item) => (
                      <WorkCard key={item.id} data={item} />
                  ))
            : (!popularTextWorks.length && <li>No works here</li>) ||
                  popularTextWorks?.map((item) => (
                      <WorkCard key={item.id} data={item} />
                  ))
    }

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

    return (
        <VStack className='participants-works__list-wrapper align__center '>
            <ul
                className={clsx(
                    'participants-works__list',
                    (newTextWorks.length > 4 && `${workType}-works`) ||
                        (popularTextWorks.length > 4 && `${workType}-works`)
                )}>
                {renderList()}

                {(media.nextLoading || text.nextLoading) && (
                    <p>Loading next...</p>
                )}
            </ul>

            {loadMoreCondition() ||
                (sort === 'new' && (
                    <Button variant='secondary' onClick={onLoadMore}>
                        Show more works
                    </Button>
                ))}
        </VStack>
    )
}
