import { FC, useCallback, useEffect } from 'react'
import clsx from 'clsx'
import { ContestCard, ContestPreview } from 'entities/contest'
import {
    filterActions,
    FilterController,
    selectActiveFilters,
} from 'features/filterContests'
import { FilterPayloadObj } from 'features/filterContests/model/types'
import {
    fetchNextContestsPage,
    selectAll,
    selectNextLoading,
    selectPopular,
} from 'pages/contestsPage'
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

    const popular = useAppSelector(selectPopular)
    const all = useAppSelector(selectAll)
    const nextLoading = useAppSelector(selectNextLoading)
    const allContests = useAppSelector(selectAll).contests as ContestPreview[]
    const active = useAppSelector(selectActiveFilters)
    const filters = active.filtersList as FilterPayloadObj[]

    const onScroll = useCallback(() => {
        if (nextLoading || all.loading || all.totalPages === all.page) {
            return
        }
        const { scrollTop, clientHeight, scrollHeight } =
            document.documentElement

        if (clientHeight + scrollTop >= scrollHeight - 30) {
            dispatch(fetchNextContestsPage())
        }
    }, [dispatch, nextLoading, all.loading, all.page])

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [onScroll])

    const prizeRangeCondition = () => {
        return active.prizeRange[0] !== 0 || active.prizeRange[1] !== 100000
    }

    const onFilterDeleteClick = (filter?: FilterPayloadObj) => {
        if (filter) {
            dispatch(filterActions.removeActiveFilter(filter))
        } else {
            dispatch(filterActions.resetPrizeRange())
        }
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

            {section === 'all' &&
                (filters?.length >= 1 || prizeRangeCondition()) && (
                    <HStack className='active-filter__block'>
                        <ul className='active-filter__list'>
                            {filters?.map((filter) => (
                                <li key={filter.name}>
                                    <Text Tag='span'>{filter.name}</Text>
                                    <Icon
                                        Svg={cross}
                                        width={16}
                                        height={16}
                                        clickable
                                        onClick={() =>
                                            onFilterDeleteClick(filter)
                                        }
                                    />
                                </li>
                            ))}
                            {prizeRangeCondition() && (
                                <li>
                                    <Text Tag='span'>Prize Range</Text>
                                    <Icon
                                        Svg={cross}
                                        width={16}
                                        height={16}
                                        clickable
                                        onClick={() => onFilterDeleteClick()}
                                    />
                                </li>
                            )}
                        </ul>
                        <Button
                            variant='ghost'
                            size='s'
                            onClick={onFilterClearClick}
                            className='active-filter__clear-btn'>
                            <Text Tag='span'>
                                Clear filters{' '}
                                <Text Tag='span' size='sm'>
                                    (
                                    {prizeRangeCondition()
                                        ? filters.length + 1
                                        : filters.length}
                                    )
                                </Text>
                            </Text>
                        </Button>
                    </HStack>
                )}

            <ul className='contest-gallery__list'>
                {section === 'popular' &&
                    (popular.loading ? (
                        <p>Loading...</p>
                    ) : (
                        mockContestData.map((item, idx) => (
                            <li key={idx}>
                                <ContestCard {...item} />
                            </li>
                        ))
                    ))}

                {section === 'all' && (
                    <>
                        {all.loading ? (
                            <p>Loading...</p>
                        ) : (
                            allContests.map((item) => (
                                <li key={item.id}>
                                    <ContestCard {...item} />
                                </li>
                            ))
                        )}

                        {nextLoading && <p>Loading next...</p>}
                    </>
                )}
            </ul>
        </section>
    )
}

export default ContestsSection
