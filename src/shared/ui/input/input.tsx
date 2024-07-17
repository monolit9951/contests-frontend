import React, { ChangeEvent, forwardRef } from 'react'
import clsx from 'clsx'
import alertIcon from 'shared/assets/icons/alert.svg?react'
import infoIcon from 'shared/assets/icons/info.svg?react'

import { Icon } from '../icon'
import { HStack, VStack } from '../stack'
import { Text } from '../text'

import './input.scss'

type HTMLInputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'onBlur' | 'placeholder' | 'type' | 'value' | 'className'
>

type InputTypes =
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'

interface IInput extends HTMLInputProps {
    onBlur?: (event: ChangeEvent<HTMLInputElement>) => void
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    value?: string
    type: InputTypes
    label?: string
    error?: string
    info?: string
    wrapperClassName?: string
    className?: string
}

const Input = forwardRef<HTMLInputElement, IInput>((props, ref) => {
    const {
        type,
        name,
        label,
        error,
        info,
        value,
        placeholder,
        onChange,
        onBlur,
        wrapperClassName,
        className,
        ...rest
    } = props

    const input = (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            placeholder={placeholder}
            className={clsx('input', error && 'error', className)}
            {...rest}
        />
    )

    if (label ?? info ?? error) {
        return (
            <VStack className={clsx('input-wrapper', wrapperClassName)}>
                {label && (
                    <label className='input-wrapper__label' htmlFor={name}>
                        {label}
                    </label>
                )}
                {input}
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

    return input
})
export default Input
