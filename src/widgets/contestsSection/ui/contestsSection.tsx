import { FC } from 'react'
import clsx from 'clsx'
import { FilterController } from 'features/filterContests'
import cross from 'shared/assets/icons/X.svg?react'
import avatar from 'shared/assets/img/userIMG.jpg'
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

    const mockData = {
        date: '2024-05-10',
        name: 'John Doe',
        rating: '4.5',
        category: { des: 'Programming', color: '#FF5733' },
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

    const mockArray = [mockData, mockData, mockData, mockData]

    const mockFilters = ['Certificates', 'Verified', '50.1k-100k']

    const onFilterDeleteClick = () => {}

    const onFilterClearClick = () => {}

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

            {section === 'all' && (
                <HStack className='active-filter__block'>
                    <ul className='active-filter__list'>
                        {mockFilters.map((item) => (
                            <li>
                                <Text Tag='span'>{item}</Text>
                                <Icon
                                    Svg={cross}
                                    width={16}
                                    height={16}
                                    clickable
                                    onClick={onFilterDeleteClick}
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
                                (10)
                            </Text>
                        </Text>
                    </Button>
                </HStack>
            )}
            {/* ^^ connect filters to this section to show a component */}

            <ul className='contest-gallery__list'>
                {mockArray.map((item, idx) => (
                    <li key={idx}>
                        <ContestCard {...item} />
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default ContestsSection
