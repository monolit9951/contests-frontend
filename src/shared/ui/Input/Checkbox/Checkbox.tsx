import clsx from 'clsx'

import './Checkbox.scss'

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
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        />
    )
}
