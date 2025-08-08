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

export default function FilterItemCategory(props: FilterItemProps) {
    const { name, number, filter, className, apiKey } = props

    const [itemActive, setItemActive] = useState(false)
    const dispatch = useDispatch()
    const category = useAppSelector(selectCategory)

    const onBtnClick = () => {
        let categoryPayload
        if (category === '') {
            categoryPayload = apiKey
        } else if (category === apiKey) {
            categoryPayload = ''
        } else {
            categoryPayload = apiKey
        }
        dispatch(filterActions.changeCategory(categoryPayload))
    }

    // бля назначения актив при любых изменениях категории в фильтрах и в heroSection
    useEffect(() => {
        console.log(1)
        if(category === apiKey && name === 'Contest Type'){
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
