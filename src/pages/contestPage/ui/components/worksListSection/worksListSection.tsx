import { useState } from 'react'
import clsx from 'clsx'
import { Text } from 'shared/ui/text'

import { WorksList } from './worksList'

import './worksListSection.scss'

type WorkSort = 'new' | 'popular'

const WorksListSection = () => {
    const [selectedSort, setSelectedSort] = useState<WorkSort>('new')
    const [worksNum, setWorksNum] = useState<undefined | number>(0)

    const onSortClick = (sort: WorkSort) => {
        if (sort === selectedSort) {
            return
        }
        setSelectedSort(sort)
    }

    // передавать количество ворков из даты контеста нельзя, так как
    // при создании ворка, мы делаем инвалидейт кеша всех ворков контеста
    // если в базу данных другие пользователи заносили ворки за время после 
    // создания кеша, у нас отобразится неверное число ворков
    const handleActualWorksNum = (worksAmount: number) =>{
        setWorksNum(worksAmount)
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
                    ({worksNum})
                </Text>
            </Text>

            <ul className='participants-works__sort'>
                <li>
                    <button
                        type='button'
                        className={clsx(selectedSort === 'new' && 'active')}
                        onClick={() => onSortClick('new')}>
                        New ({worksNum})
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
                handleActualWorksNum = {handleActualWorksNum}
            />
        </section>
    )
}

export default WorksListSection
