import { FC } from 'react'
import clsx from 'clsx'
import { ContestCard, ContestPreview } from 'entities/contest'
import {
    filterActions,
    FilterController,
    selectFilters,
} from 'features/filterContests'
import { selectContests } from 'pages/contestsPage/model/selectors'
import cross from 'shared/assets/icons/X.svg?react'
import { mockContestData } from 'shared/consts'
import { useAppDispatch, useAppSelector } from 'shared/lib/store'
import { Button } from 'shared/ui/button'
import { Icon } from 'shared/ui/icon'
import { HStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './contestsSection.scss'

type SectionType = 'popular' | 'all'

interface Props {
    section: SectionType
    className?: string
}

const ContestsSection: FC<Props> = (props) => {
    const { section, className } = props

    const dispatch = useAppDispatch()

    const contests = useAppSelector(selectContests).all as ContestPreview[]
    const filters = useAppSelector(selectFilters)

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
                            <Text Tag='span' size='sm'>
                                ({filters.active.length})
                            </Text>
                        </Text>
                    </Button>
                </HStack>
            )}

            <ul className='contest-gallery__list'>
                {section === 'popular' &&
                    mockContestData.map((item, idx) => (
                        <li key={idx}>
                            <ContestCard {...item} />
                        </li>
                    ))}

                {section === 'all' &&
                    contests.map((item) => (
                        <li key={item.id}>
                            <ContestCard {...item} />
                        </li>
                    ))}
            </ul>
        </section>
    )
}

export default ContestsSection
