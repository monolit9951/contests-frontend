import clsx from 'clsx'

import './Radio.scss'

interface IRadioBtn {
    name: string
    value?: string
    id?: string
    disabled?: boolean
    className?: string
}

export default function RadioBtn(props: IRadioBtn) {
    const { name, value, id, disabled, className } = props

    return (
        <input
            type='radio'
            id={id && `${name}-${id}`}
            name={name}
            value={value}
            disabled={disabled}
            className={clsx('radio__btn', className)}
        />
    )
}
