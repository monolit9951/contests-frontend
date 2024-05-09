import { FC } from 'react'
import clsx from 'clsx'
import {
    filterActions,
    FilterController,
    selectFilters,
} from 'features/filterContests'
import cross from 'shared/assets/icons/X.svg?react'
import avatar from 'shared/assets/img/userIMG.jpg'
import { useAppDispatch, useAppSelector } from 'shared/lib/store'
import { Button } from 'shared/ui/button'
import { Icon } from 'shared/ui/icon'
import { HStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'
import { ContestCard } from 'widgets/contestCard'

import './contestsSection.scss'

type SectionType = 'popular' | 'all'

interface Props {
    section: SectionType
    className?: string
}

const ContestsSection: FC<Props> = (props) => {
    const { section, className } = props

    const dispatch = useAppDispatch()
    const filters = useAppSelector(selectFilters)

    const mockData = {
        date: '2024-05-10',
        name: 'John Doe',
        rating: '4.5',
        category: { des: 'fun', color: '#FF5733' },
        prize: {
            img: avatar,
            description: 'Win $1000 and a trophy',
            background: 'var(--green)',
        },
        title: 'Coding Challenge',
        tags: ['React', 'JavaScript', 'Web Development'],
        user: {
            name: 'John Doe',
            avatar,
            isVerified: true,
            isTop: 'Top 3',
            rate: '4.5',
        },
    }

    const mockArray = [mockData, mockData, mockData, mockData, mockData]

    const onFilterDeleteClick = (filter: string) => {
        dispatch(filterActions.removeActiveFilter(filter))
    }

    const onFilterClearClick = () => {
        dispatch(filterActions.clearFilters())
    }

    return (
        <section className={clsx('contest-gallery__section', className)}>
            <HStack className='contest-gallery__head'>
                <HStack>
                    <Text Tag='h2' size='title' bold>
                        {section === 'all' ? 'All contests' : 'TOP in popular'}
                    </Text>
                    <Text Tag='span' className='title__span'>
                        {section === 'all' ? '(2063)' : '(104)'}
                    </Text>
                </HStack>
                {section === 'all' ? (
                    <FilterController />
                ) : (
                    <Button variant='secondary' size='s'>
                        See all
                    </Button>
                )}
            </HStack>

            {section === 'all' && filters.active?.length >= 1 && (
                <HStack className='active-filter__block'>
                    <ul className='active-filter__list'>
                        {filters.active?.map((filter: string) => (
                            <li key={filter}>
                                <Text Tag='span'>{filter}</Text>
                                <Icon
                                    Svg={cross}
                                    width={16}
                                    height={16}
                                    clickable
                                    onClick={() => onFilterDeleteClick(filter)}
                                />
                            </li>
                        ))}
                    </ul>
                    <Button
                        variant='ghost'
                        size='s'
                        onClick={onFilterClearClick}
                        className='active-filter__clear-btn'>
                        <Text Tag='span'>
                            Clear filters{' '}
                            <Text Tag='span' size='xs'>
                                ({filters.active.length})
                            </Text>
                        </Text>
                    </Button>
                </HStack>
            )}

            {section === 'popular' ? (
                <ul className='contest-gallery__list'>
                    {mockArray.map((item, idx) => (
                        <li key={idx}>
                            <ContestCard {...item} />
                        </li>
                    ))}
                </ul>
            ) : (
                <ul className='contest-gallery__list'>
                    {mockArray.map((item, idx) => (
                        <li key={idx}>
                            <ContestCard {...item} />
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}

export default ContestsSection
