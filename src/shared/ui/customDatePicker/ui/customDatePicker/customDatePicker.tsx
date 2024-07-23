import { FC, ReactNode } from 'react'
import DatePicker from 'react-datepicker'
import { Noop } from 'react-hook-form'
import clsx from 'clsx'

import { CustomHeader } from './customHeader'

import 'react-datepicker/dist/react-datepicker.css'
import '../customDatePicker.scss'

interface Props {
    value: Date
    onChange: (date: Date | null) => void
    onBlur: Noop
    min?: Date
    max?: Date
    placeholder?: string
    className?: string
    children?: ReactNode
}

const CustomDatePicker: FC<Props> = (props) => {
    const {
        value,
        onChange,
        onBlur,
        min,
        max,
        placeholder = 'Select date',
        children,
        className,
    } = props

    return (
        <DatePicker
            selected={value}
            onChange={onChange}
            onBlur={onBlur}
            minDate={min}
            maxDate={max}
            renderCustomHeader={({
                monthDate,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
            }) => (
                <CustomHeader
                    monthDate={monthDate}
                    decreaseMonth={decreaseMonth}
                    increaseMonth={increaseMonth}
                    prevMonthButtonDisabled={prevMonthButtonDisabled}
                    nextMonthButtonDisabled={nextMonthButtonDisabled}
                />
            )}
            popperPlacement='bottom-start'
            showPopperArrow={false}
            dateFormat='EEEE, d MMMM'
            placeholderText={placeholder}
            className={clsx(className)}>
            {children}
        </DatePicker>
    )
}

export default CustomDatePicker
