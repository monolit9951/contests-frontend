import { FC, useEffect } from 'react'
import clsx from 'clsx'
import {
    ContestCard,
    ContestCardSkeleton,
    ContestPreview,
} from 'entities/contest'
import {
    filterActions,
    FilterController,
    selectActiveFilters,
} from 'features/filterContests'
import { FilterPayloadObj } from 'features/filterContests/model/types'
import {
    contestsPageActions,
    fetchNextContestsPage,
    selectAll,
    selectNextLoading,
    selectPopular,
} from 'pages/contestsPage'
import { selectSearchString } from 'pages/contestsPage/model/selectors'
import cross from 'shared/assets/icons/X.svg?react'
import useOnScreen from 'shared/lib/hooks/useOnScreen'
import { useAppDispatch, useAppSelector } from 'shared/lib/store'
import { Button } from 'shared/ui/button'
import { Icon } from 'shared/ui/icon'
import { SortButton } from 'shared/ui/sortButton'
import Spinner from 'shared/ui/spinner'
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
    const searchString = useAppSelector(selectSearchString)
    const nextLoading = useAppSelector(selectNextLoading)
    const active = useAppSelector(selectActiveFilters)
    const filters = active.filtersList as FilterPayloadObj[]

    const allContests = all.contests as ContestPreview[]
    const popularContests = popular.contests as ContestPreview[]

    const { isIntersecting, measureRef, observer } = useOnScreen({
        threshold: 0.8,
    })

    useEffect(() => {
        if (
            nextLoading ||
            all.loading ||
            all.totalPages <= all.page ||
            !all.totalElements
        ) {
            return
        }
        if (isIntersecting && observer) {
            dispatch(fetchNextContestsPage())
            observer.disconnect()
        }
    }, [isIntersecting])

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

    const onSeeAllClick = () => {}

    return (
        <section className={clsx('contest-gallery__section', className)}>
            <HStack className='contest-gallery__head'>
                <HStack>
                    <Text Tag='h2' size='title' bold>
                        {section === 'all' ? 'All contests' : 'TOP in popular'}
                    </Text>
                    <Text Tag='span' className='title__span'>
                        {section === 'all' ? `(${all.totalElements})` : '(24)'}
                    </Text>
                </HStack>
                {section === 'all' ? (
                    <HStack className='align__center'>
                        <SortButton />
                        <FilterController />
                    </HStack>
                ) : (
                    <Button
                        variant='secondary'
                        size='s'
                        onClick={onSeeAllClick}>
                        See all
                    </Button>
                )}
            </HStack>

            {section === 'all' &&
                (filters?.length >= 1 ||
                    prizeRangeCondition() ||
                    searchString) && (
                    <HStack className='active-filter__block'>
                        <ul className='active-filter__list'>
                            {searchString && (
                                <li>
                                    <Text Tag='span'>{searchString}</Text>
                                    <Icon
                                        Svg={cross}
                                        width={16}
                                        height={16}
                                        clickable
                                        onClick={() =>
                                            dispatch(
                                                contestsPageActions.resetSearchString()
                                            )
                                        }
                                    />
                                </li>
                            )}
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
                                    {filters.length +
                                        (searchString ? 1 : 0) +
                                        (prizeRangeCondition() ? 1 : 0)}
                                    )
                                </Text>
                            </Text>
                        </Button>
                    </HStack>
                )}

            <ul className='contest-gallery__list'>
                {section === 'popular' &&
                    (popular.loading ? (
                        <>
                            <li>
                                <ContestCardSkeleton />
                            </li>
                            <li>
                                <ContestCardSkeleton />
                            </li>
                            <li>
                                <ContestCardSkeleton />
                            </li>
                            <li>
                                <ContestCardSkeleton />
                            </li>
                        </>
                    ) : (
                        popularContests.map((item, idx) => (
                            <li key={idx}>
                                <ContestCard {...item} />
                            </li>
                        ))
                    ))}

                {section === 'all' && (
                    <>
                        {all.loading ? (
                            <>
                                <li>
                                    <ContestCardSkeleton />
                                </li>
                                <li>
                                    <ContestCardSkeleton />
                                </li>
                                <li>
                                    <ContestCardSkeleton />
                                </li>
                                <li>
                                    <ContestCardSkeleton />
                                </li>
                                <li>
                                    <ContestCardSkeleton />
                                </li>
                                <li>
                                    <ContestCardSkeleton />
                                </li>
                                <li>
                                    <ContestCardSkeleton />
                                </li>
                                <li>
                                    <ContestCardSkeleton />
                                </li>
                            </>
                        ) : (
                            allContests.map((item, idx) => (
                                <li
                                    key={item.id}
                                    ref={
                                        idx === allContests.length - 1
                                            ? measureRef
                                            : null
                                    }>
                                    <ContestCard {...item} />
                                </li>
                            ))
                        )}

                        {nextLoading && <Spinner bottom />}
                    </>
                )}
            </ul>
        </section>
    )
}

export default ContestsSection
