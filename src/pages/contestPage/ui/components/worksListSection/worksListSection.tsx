import { useState } from 'react'
import clsx from 'clsx'
import { Work } from 'entities/work'
import {
    selectContestMedia,
    selectContestOwnerId,
    selectContestText,
} from 'pages/contestPage/model/selectors'
import {
    fetchMediaWorks,
    fetchPopularMediaWorks,
    fetchPopularTextWorks,
    fetchTextWorks,
} from 'pages/contestPage/model/services'
import { useAppDispatch, useAppSelector } from 'shared/lib/store'
import { Text } from 'shared/ui/text'

import { WorksList } from './worksList'

import './worksListSection.scss'

type WorkType = 'media' | 'text'
type WorkSort = 'new' | 'popular'

interface Props {
    worksAmount: number
    openModal: (work: Work) => void
}

const WorksListSection = ({ worksAmount, openModal }: Props) => {
    const [workType, setWorkType] = useState<WorkType>('media')
    const [selectedSort, setSelectedSort] = useState<WorkSort>('new')

    const dispatch = useAppDispatch()

    const ownerId = useAppSelector(selectContestOwnerId)
    const media = useAppSelector(selectContestMedia)
    const text = useAppSelector(selectContestText)

    const onFetch = (type: WorkType, sort: WorkSort) => {
        if (sort === 'popular') {
            if (type === 'media' && !media.popular.length) {
                dispatch(fetchPopularMediaWorks(ownerId))
            }
            if (type === 'text' && !text.popular.length) {
                dispatch(fetchPopularTextWorks(ownerId))
            }
        } else {
            if (type === 'media' && !media.new.length) {
                dispatch(fetchMediaWorks(ownerId))
            }
            if (type === 'text' && !text.new.length) {
                dispatch(fetchTextWorks(ownerId))
            }
        }
    }

    const onWorkTypesClick = (type: WorkType) => {
        if (type === workType) {
            return
        }
        setWorkType(type)

        onFetch(type, selectedSort)
    }

    const onSortClick = (sort: WorkSort) => {
        if (sort === selectedSort) {
            return
        }
        setSelectedSort(sort)

        onFetch(workType, sort)
    }

    return (
        <section className='participants-works'>
            <Text
                Tag='h2'
                size='title'
                bold
                className='participants-works__title'>
                Participants&apos; works
                <Text Tag='span' size='xl'>
                    ({worksAmount})
                </Text>
            </Text>

            <ul className='participants-works__types'>
                <li>
                    <button
                        type='button'
                        className={clsx(workType === 'media' && 'active')}
                        onClick={() => onWorkTypesClick('media')}>
                        Media
                    </button>
                </li>
                <li>
                    <button
                        type='button'
                        className={clsx(workType === 'text' && 'active')}
                        onClick={() => onWorkTypesClick('text')}>
                        Text
                    </button>
                </li>
            </ul>

            <ul className='participants-works__sort'>
                <li>
                    <button
                        type='button'
                        className={clsx(selectedSort === 'new' && 'active')}
                        onClick={() => onSortClick('new')}>
                        New (
                        {workType === 'media'
                            ? media.totalElements
                            : text.totalElements}
                        )
                    </button>
                </li>
                <li>
                    <button
                        type='button'
                        className={clsx(selectedSort === 'popular' && 'active')}
                        onClick={() => onSortClick('popular')}>
                        Popular
                    </button>
                </li>
            </ul>

            <WorksList
                workType={workType}
                sort={selectedSort}
                openModal={openModal}
            />
        </section>
    )
}

export default WorksListSection
