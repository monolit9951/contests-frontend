import { useState } from 'react'
import clsx from 'clsx'
import { Text } from 'shared/ui/text'

interface FilterItemProps {
    name: string
    number: number
    className?: string
}

export default function FilterItem(props: FilterItemProps) {
    const { name, number, className } = props

    const [itemActive, setItemActive] = useState(false)

    const onBtnClick = () => {
        if (itemActive) {
            setItemActive(false)
        } else {
            setItemActive(true)
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
                    <Text Tag='span' size='xs'>
                        ({number})
                    </Text>
                </Text>
            </button>
        </li>
    )
}
