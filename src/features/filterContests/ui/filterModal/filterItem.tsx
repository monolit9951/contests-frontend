import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import { filterActions, selectFilters } from 'features/filterContests'
import { Text } from 'shared/ui/text'

interface FilterItemProps {
    name: string
    number: number
    className?: string
}

export default function FilterItem(props: FilterItemProps) {
    const [itemActive, setItemActive] = useState(false)

    const filters = useSelector(selectFilters)

    const { name, number, className } = props

    const dispatch = useDispatch()

    useEffect(() => {
        setItemActive(filters.selected.includes(name))
    }, [filters])

    const onBtnClick = (filter: string) => {
        setItemActive(!itemActive)

        if (itemActive) {
            dispatch(filterActions.removeFilter(filter))
        } else {
            dispatch(filterActions.addFilter(filter))
        }
    }

    return (
        <li>
            <button
                type='button'
                onClick={() => onBtnClick(name)}
                aria-label={name}
                className={clsx(
                    'filter-item',
                    itemActive && 'active',
                    className
                )}>
                <Text Tag='span'>
                    {name}
                    <Text Tag='span' size='xs'>
                        ({number})
                    </Text>
                </Text>
            </button>
        </li>
    )
}
