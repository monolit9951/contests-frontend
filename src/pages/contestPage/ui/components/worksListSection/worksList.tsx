import { FC } from 'react'
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
            return sort === 'new'
                ? newMediaWorks?.map((item) => (
                      <WorkCard key={item.id} data={item} />
                  ))
                : popularMediaWorks?.map((item) => (
                      <WorkCard key={item.id} data={item} />
                  ))
        }
        return sort === 'new'
            ? newTextWorks?.map((item) => (
                  <WorkCard key={item.id} data={item} isText />
              ))
            : popularTextWorks?.map((item) => (
                  <WorkCard key={item.id} data={item} isText />
              ))
    }

    const loadMoreCondition = () => {
        if (
            text.nextLoading ||
            text.loading ||
            text.totalPages >= text.page ||
            !text.totalElements ||
            media.nextLoading ||
            media.loading ||
            media.totalPages >= media.page ||
            !media.totalElements
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
            <ul className='participants-works__list'>{renderList()}</ul>

            {loadMoreCondition() ||
                (sort === 'new' && (
                    <Button variant='secondary' onClick={onLoadMore}>
                        See more works
                    </Button>
                ))}
        </VStack>
    )
}
