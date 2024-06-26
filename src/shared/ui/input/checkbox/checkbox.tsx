import clsx from 'clsx'

import './checkbox.scss'

interface ICheckbox {
    disabled?: boolean
    className?: string
}

export default function Checkbox(props: ICheckbox) {
    const { disabled, className, ...rest } = props

    return (
        <input
            type='checkbox'
            disabled={disabled}
            className={clsx('checkbox', className)}
            {...rest}
        />
    )
}
