import { FC, ReactNode } from 'react'
import DatePicker from 'react-datepicker'
import { Noop } from 'react-hook-form'
import clsx from 'clsx'

import 'react-datepicker/dist/react-datepicker.css'
import '../customDatePicker.scss'

interface Props {
    value: Date
    onChange: (date: Date | null) => void
    onBlur: Noop
    placeholder?: string
    className?: string
    children?: ReactNode
}

const CustomTimePicker: FC<Props> = (props) => {
    const {
        value,
        onChange,
        onBlur,
        placeholder = '12 : 00',
        children,
        className,
    } = props

    return (
        <DatePicker
            selected={value}
            onChange={onChange}
            onBlur={onBlur}
            showTimeSelect
            showTimeSelectOnly
            showPopperArrow={false}
            timeFormat='HH:mm'
            dateFormat='HH : mm'
            placeholderText={placeholder}
            className={clsx(className)}>
            {children}
        </DatePicker>
    )
}

export default CustomTimePicker
