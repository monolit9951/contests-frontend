import { FC, useCallback, useEffect, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import {
    ContestCard,
    ContestPreview,
} from 'entities/contest'
import {
    filterActions,
    FilterController,
    selectActiveFilters,
    selectCategory,
    selectSortDirection
} from 'features/filterContests'
import { FilterPayloadObj } from 'features/filterContests/model/types'
import {
    contestsPageActions,
    selectAll,
} from 'pages/contestsPage'
import { selectSearchString } from 'pages/contestsPage/model/selectors'
import { fetchContestsCache } from 'pages/contestsPage/model/services/fetchContests'
import cross from 'shared/assets/icons/X.svg?react'
import { capitalizeStr } from 'shared/helpers'
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

    const all = useAppSelector(selectAll)
    const searchString = useAppSelector(selectSearchString)
    const active = useAppSelector(selectActiveFilters)
    const filters = active.filtersList as FilterPayloadObj[]
    const loaderRef = useRef<HTMLDivElement | null>(null)
    const allContests = all.contests as ContestPreview[]

    // кеширование
    const direction = useAppSelector(selectSortDirection)
    const searchStr = useAppSelector(selectSearchString)
    const category = useAppSelector(selectCategory)
    const activeFilters = useAppSelector(selectActiveFilters)

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
    queryKey: ['contests'],
    queryFn: ({ pageParam = 0 }) =>
        fetchContestsCache({
        direction,
        searchStr,
        category,
        activeFilters,
        pageParam,
        }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length;
        return nextPage < lastPage.totalPages ? nextPage : undefined;
    }})


    // проверка, если в рендж денег не базовые значения - отображаем его в фильтрах
    const prizeRangeCondition = () => {
        return active.prizeRange[0] !== 0 || active.prizeRange[1] !== 100000
    }

    // проверка, если в рендж коинов не базовые значения - отображаем его в фильтрах
    const coinRangeCondition = () => {
        return active.coinRange[0] !== 0 || active.coinRange[1] !== 100000
    }

    // очищение фильтров
    const onFilterDeleteClick = (filter?: FilterPayloadObj) => {
        if (filter) {
            dispatch(filterActions.removeActiveFilter(filter))
        }
    }

    // очищение инпут рендж
    const onRangeDeleteClick = (filteRange: 'MONEY' | 'COINS') => {
        if(filteRange === 'MONEY'){
            dispatch(filterActions.resetPrizeRange())
        } else {
            dispatch(filterActions.resetCoinRange())
        }
    }

    // очищение категории
    const handleCategoryDelete = () => {
        dispatch(filterActions.changeCategory(''))
    }
    
    // очищение всех фильтров
    const onFilterClearClick = () => {
        dispatch(filterActions.clearFilters())
        dispatch(contestsPageActions.resetSearchString())
        handleCategoryDelete()
    }
    
    // наблюдатель для подгрузки новых страниц
    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const target = entries[0]
            if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage()
            }
        },
        [hasNextPage, isFetchingNextPage, fetchNextPage]
    )

    // наблюдатель
    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: '20px',
            threshold: 0
        });
        if (loaderRef.current) observer.observe(loaderRef.current)
        return () => observer.disconnect() // безопаснее
    }, [handleObserver])

    // скелеты 
    const renderAll = () => {
        if (allContests.length === 0) {
            return (
                <li>
                    <Text
                        Tag='p'
                        size='xl'
                        className='contests-gallery__message'>
                        No contests yet.
                    </Text>
                </li>
            )
        }
        return data?.pages.map((page) => 
            page.content.map((item: any, itemIndex: number) => (
                <li key={itemIndex}>
                    <ContestCard {...item} />
                </li>  
            ))
        )
    }

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
                        size='s'>
                        See all
                    </Button>
                )}
            </HStack>

            {section === 'all' &&
                (filters?.length >= 1 ||
                    prizeRangeCondition() ||
                    coinRangeCondition() ||
                    category ||
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
                                    <Text Tag='span'>Money Range</Text>
                                    <Icon
                                        Svg={cross}
                                        width={16}
                                        height={16}
                                        clickable
                                        onClick={() => onRangeDeleteClick('MONEY')}
                                    />
                                </li>
                            )}
                            {coinRangeCondition() && (
                                <li>
                                    <Text Tag='span'>Coin Range</Text>
                                    <Icon
                                        Svg={cross}
                                        width={16}
                                        height={16}
                                        clickable
                                        onClick={() => onRangeDeleteClick('COINS')}
                                    />
                                </li>
                            )}
                            { category &&
                                <li>
                                    <Text Tag='span'>{capitalizeStr(category)}</Text>
                                    <Icon
                                        Svg={cross}
                                        width={16}
                                        height={16}
                                        clickable
                                        onClick={handleCategoryDelete}
                                    />
                                </li>
                            }

                            <li>
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
                                                (prizeRangeCondition() ? 1 : 0) + 
                                                (coinRangeCondition() ? 1 : 0) +
                                                (category? 1: 0)
                                                }
                                            )
                                        </Text>
                                    </Text>
                                </Button>
                            </li>
                        </ul>
                    </HStack>
                )}

            <ul className='contest-gallery__list'>

                {section === 'all' && (
                    <>
                        {renderAll()}
                        <div ref={loaderRef} style={{ height: 100, background: 'transparent' }} />
                        {isFetchingNextPage && <Spinner bottom />}
                    </>
                )}
            </ul>
        </section>
    )
}

export default ContestsSection
