import { FC, useState } from 'react'
import clsx from 'clsx'
import { selectContestMedia } from 'pages/contestPage/model/selectors'
import { useAppSelector } from 'shared/lib/store'
import { Text } from 'shared/ui/text'

import { WorksList } from './worksList'

import './worksListSection.scss'

interface Props {
    ownerId: string
}

const WorksListSection: FC<Props> = ({ ownerId }) => {
    const [workType, setWorkType] = useState<'media' | 'text'>('media')
    const [selectedSort, setSelectedSort] = useState<'new' | 'popular'>('new')

    const media = useAppSelector(selectContestMedia)

    const onWorkTypesClick = (type: 'media' | 'text') => {
        if (type === workType) {
            return
        }
        setWorkType(type)
    }

    const onSortClick = (sort: 'new' | 'popular') => {
        if (sort === selectedSort) {
            return
        }
        setSelectedSort(sort)
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
                    ({media.totalElements})
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
                        New
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
                ownerId={ownerId}
                workType={workType}
                sort={selectedSort}
            />
        </section>
    )
}

export default WorksListSection
