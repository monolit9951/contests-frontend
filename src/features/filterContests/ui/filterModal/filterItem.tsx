import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { selectFilters } from 'features/filterContests/model/selectors'
import { filterActions } from 'features/filterContests/model/slice'
import { useAppDispatch } from 'shared/lib/store'
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

    const dispatch = useAppDispatch()

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
