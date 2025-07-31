import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import {
    filterActions,
    FilterObject,
    selectSelectedFilters,
} from 'features/filterContests'
import { FilterPayloadObj } from 'features/filterContests/model/types'
import { useAppSelector } from 'shared/lib/store'
import { Text } from 'shared/ui/text'
import { VStack } from 'shared/ui/stack'

interface FilterItemProps {
    name: string
    number: number
    filter: FilterObject
    className?: string
}

export default function FilterItem(props: FilterItemProps) {
    const { name, number, filter, className } = props

    const [itemActive, setItemActive] = useState(false)

    const dispatch = useDispatch()

    const selected = useAppSelector(selectSelectedFilters)

    useEffect(() => {
        setItemActive(
            !!selected.filtersList?.find(
                (item: FilterPayloadObj) => item.name === name
            )
        )
    }, [selected.filtersList])

    const onBtnClick = () => {
        let payload = {
            filterName: '',
            name: '',
        }
        switch (filter.name) {
            case 'Status':
                payload = {
                    filterName: 'status',
                    name,
                }

                if (selected.status) {
                    if (itemActive) {
                        dispatch(filterActions.removeFilter(payload))
                        break
                    }
                    dispatch(filterActions.addFilter(payload))
                    break
                }
                dispatch(filterActions.addFilter(payload))
                break

            case 'Prize type':
                payload = {
                    filterName: 'prizeType',
                    name,
                }

                if (selected.prizeType) {
                    if (selected.prizeType === name) {
                        dispatch(filterActions.removeFilter(payload))
                        break
                    }
                    dispatch(filterActions.addFilter(payload))
                    break
                }
                dispatch(filterActions.addFilter(payload))
                break

            default:
                payload = {
                    filterName: 'creators',
                    name,
                }

                if (selected.creators) {
                    if (selected.creators === name) {
                        dispatch(filterActions.removeFilter(payload))
                        break
                    }
                    dispatch(filterActions.addFilter(payload))
                    break
                }
                dispatch(filterActions.addFilter(payload))
                break
        }
    }

    return (
        <li>
            <button
                type='button'
                onClick={onBtnClick}
                aria-label={name}
                className={clsx(
                    'filter-item',
                    itemActive && 'active',
                    className
                )}>
                <Text Tag='span'>
                    {name}
                    <VStack Tag='span' size='sm'>
                        ({number})
                    </VStack>
                </Text>
            </button>
        </li>
    )
}
