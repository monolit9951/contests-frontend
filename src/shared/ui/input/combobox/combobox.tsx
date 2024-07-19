import { SelectHTMLAttributes } from 'react'
import clsx from 'clsx'
import alertIcon from 'shared/assets/icons/alert.svg?react'
import infoIcon from 'shared/assets/icons/info.svg?react'
import { Icon } from 'shared/ui/icon'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './combobox.scss'

interface ICombobox extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    error?: string
    info?: string
    options: { value: string; label: string }[]
    wrapperClassName?: string
    className?: string
    width?: string | number
}

export default function Combobox(props: ICombobox) {
    const {
        name,
        label,
        error,
        info,
        value,
        options,
        placeholder,
        onChange,
        onBlur,
        wrapperClassName,
        className,
        width,
        ...rest
    } = props

    return (
        <VStack className={clsx('input-wrapper', wrapperClassName)}>
            {label && (
                <label className='input-wrapper__label' htmlFor={name}>
                    {label}
                </label>
            )}
            <select
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={clsx('combobox', error && 'error', className)}
                style={{ width }}
                {...rest}>
                {placeholder && (
                    <option value='' disabled className='placeholder-option'>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {info && (
                <HStack className='input-wrapper__info'>
                    <Icon Svg={infoIcon} />
                    <Text Tag='span'>{info}</Text>
                </HStack>
            )}
            {error && (
                <HStack className='input-wrapper__error'>
                    <Icon Svg={alertIcon} />
                    <Text Tag='span'>{error}</Text>
                </HStack>
            )}
        </VStack>
    )
}
