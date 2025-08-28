import { useState } from 'react'
import clsx from 'clsx'
import { Text } from 'shared/ui/text'

import { WorksList } from './worksList'

import './worksListSection.scss'

type WorkSort = 'new' | 'popular'

const WorksListSection = () => {
    const [selectedSort, setSelectedSort] = useState<WorkSort>('new')

    const onSortClick = (sort: WorkSort) => {
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
                    (100)
                </Text>
            </Text>

            <ul className='participants-works__sort'>
                <li>
                    <button
                        type='button'
                        className={clsx(selectedSort === 'new' && 'active')}
                        onClick={() => onSortClick('new')}>
                        New (100)
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
                sort={selectedSort}
            />
        </section>
    )
}

export default WorksListSection
