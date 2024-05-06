import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import filterF from 'shared/assets/icons/filterF.svg?react'
import { Button } from 'shared/ui/button'
import { Icon } from 'shared/ui/icon'
import { Text } from 'shared/ui/text'

import FilterModal from './filterModal/filterModal'

import './filterController.scss'

interface IFilterController {
    className?: string
}

const FilterController = (props: IFilterController) => {
    const { className } = props

    const [showFilter, setShowFilter] = useState(false)

    const filterRef = useRef<HTMLDivElement | null>(null)
    const filterBtnRef = useRef<HTMLButtonElement | null>(null)

    const onFilterToggle = () => {
        setShowFilter(!showFilter)
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
                <Icon Svg={filterF} width={20} height={20} />
                <Text Tag='span'>
                    Filter{' '}
                    <Text Tag='span' size='xs'>
                        (10)
                    </Text>
                </Text>
            </Button>
            <FilterModal
                ref={filterRef}
                onClose={onFilterToggle}
                className={clsx(!showFilter && 'filter-hidden')}
            />
        </div>
    )
}

export default FilterController
