import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import {
    filterActions,
    FilterObject,
    selectCategory,
    selectSelectedFilters,
} from 'features/filterContests'
import { FilterPayloadObj } from 'features/filterContests/model/types'
import { useAppSelector } from 'shared/lib/store'
import { VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

interface FilterItemProps {
    name: string
    number: number
    filter: FilterObject
    className?: string
    apiKey: string
}

export default function FilterItem(props: FilterItemProps) {
    const { name, number, filter, className, apiKey } = props

    const [itemActive, setItemActive] = useState(false)

    const dispatch = useDispatch()

    const selected = useAppSelector(selectSelectedFilters)
    const category = useAppSelector(selectCategory)

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
            apiKey: ''
        }
        switch (filter.name) {
            case 'Status':
                payload = {
                    filterName: 'status',
                    name,
                    apiKey
                }

                // if (selected.status) {
                    if (selected.filtersList.some((item: FilterPayloadObj) => item.name === name)) {
                        dispatch(filterActions.removeFilter(payload))
                        break
                    }
                    dispatch(filterActions.addFilter(payload))
                    break
                // }
                // dispatch(filterActions.addFilter(payload))
                // break

            case 'Prize type':
                payload = {
                    filterName: 'prizeType',
                    name,
                    apiKey
                }

                if (selected.filtersList.some((item: FilterPayloadObj) => item.name === name)) {
                    dispatch(filterActions.removeFilter(payload))
                    break
                }
                dispatch(filterActions.addFilter(payload))
                break

            case 'creators':
                payload = {
                    filterName: 'creators',
                    name,
                    apiKey
                }

                if (selected.filtersList.some((item: FilterPayloadObj) => item.name === name)) {
                    dispatch(filterActions.removeFilter(payload))
                    break
                }
                dispatch(filterActions.addFilter(payload))
                break

                case 'Contest Type': {
                    let categoryPayload
                    if (category === '') {
                        categoryPayload = apiKey
                    } else if (category === apiKey) {
                        categoryPayload = ''
                    } else {
                        categoryPayload = apiKey
                    }
                    dispatch(filterActions.changeCategory(categoryPayload))
                    break
                }
            default: break
        }
    }


    // по правильному было бы выносить вообще выбор категории в отдельный компонент
    // из-за другой логики
    
    useEffect(() => {
        if(category === apiKey && filter.name === 'Contest Type'){
            setItemActive(true)
        } else {
            setItemActive(false)
        }
    }, [category])

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
                    <VStack>
                        ({number})
                    </VStack>
                </Text>
            </button>
        </li>
    )
}
