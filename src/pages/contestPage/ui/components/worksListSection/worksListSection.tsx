import { FC, useState } from 'react'
import clsx from 'clsx'
import { Text } from 'shared/ui/text'

import { MediaWorksList } from './worksListTypes/mediaList'
import { TextWorksList } from './worksListTypes/textList'

import './worksListSection.scss'

interface Props {
    ownerId: string
}

const WorksListSection: FC<Props> = ({ ownerId }) => {
    const [workType, setWorkType] = useState('media')
    const [selectedSort, setSelectedSort] = useState('new')

    const onWorkTypesClick = (type: string) => {
        if (type === workType) {
            return
        }
        setWorkType(type)
    }

    const onSortClick = (sort: string) => {
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
                    (works.length)
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

            {workType === 'media' ? (
                <MediaWorksList ownerId={ownerId} />
            ) : (
                <TextWorksList ownerId={ownerId} />
            )}
        </section>
    )
}

export default WorksListSection
