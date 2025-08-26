import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import filter from 'shared/assets/icons/filter.svg?react'
import filterF from 'shared/assets/icons/filterF.svg?react'
import { useAppSelector } from 'shared/lib/store'
import { Button } from 'shared/ui/button'
import { Icon } from 'shared/ui/icon'
import { Text } from 'shared/ui/text'

import { selectActiveFilters } from '../model/selectors'

import FilterModal from './filterModal/filterModal'

import './filterController.scss'

interface IFilterController {
    className?: string
}

const FilterController = (props: IFilterController) => {
    const { className } = props

    const [showFilter, setShowFilter] = useState(false)

    const filters = useAppSelector(selectActiveFilters).filtersList as string[]

    const filterRef = useRef<HTMLDivElement | null>(null)
    const filterBtnRef = useRef<HTMLButtonElement | null>(null)

const onFilterToggle = () => {
    const newState = !showFilter
    setShowFilter(newState)

    // блкировка скролла на телефоне
    if (window.innerWidth < 1000) {
        if (newState) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    }
}


    useEffect(() => {
        const onClickOutside = (event: MouseEvent) => {
            const targetNode = event.target as Node

            if (
                filterRef.current &&
                filterBtnRef.current &&
                !filterRef.current.contains(targetNode) &&
                !filterBtnRef.current.contains(targetNode)
            ) {
                setShowFilter(false)
            }
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setShowFilter(false)
            }
        }

        if (showFilter) {
            document.addEventListener('keydown', onKeyDown)
            document.addEventListener('mousedown', onClickOutside)
        }

        return () => {
            document.removeEventListener('keydown', onKeyDown)
            document.removeEventListener('mousedown', onClickOutside)
        }
    }, [showFilter])

    return (
        <div className={clsx('filter-controller', className)}>
            <Button
                ref={filterBtnRef}
                variant='secondary'
                size='s'
                onClick={onFilterToggle}>
                <Icon
                    Svg={filters?.length >= 1 ? filterF : filter}
                    width={20}
                    height={20}
                />
                <Text Tag='span'>
                    Filter{' '}
                    {filters?.length >= 1 && (
                        <Text Tag='span' size='sm'>
                            ({filters?.length})
                        </Text>
                    )}
                </Text>
            </Button>
            
            {showFilter && <FilterModal
                ref={filterRef}
                onClose={onFilterToggle}
                className={clsx(!showFilter && 'filter-hidden')}
            />}
        </div>
    )
}

export default FilterController
