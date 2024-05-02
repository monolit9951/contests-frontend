import clsx from 'clsx'

import './radio.scss'

interface IRadioBtn {
    label: string
    name: string
    id: string
    value?: string
    disabled?: boolean
    className?: string
}

export default function RadioBtn(props: IRadioBtn) {
    const { label, name, value, id, disabled, className } = props

    return (
        <>
            <input
                type='radio'
                id={id && `${name}-${id}`}
                name={name}
                value={value}
                disabled={disabled}
                className={clsx('radio__btn', className)}
            />
            <label htmlFor={id && `${name}-${id}`}>{label}</label>
        </>
    )
}
