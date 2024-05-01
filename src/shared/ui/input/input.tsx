import { ChangeEvent, InputHTMLAttributes, useState } from 'react'
import clsx from 'clsx'
import alertIcon from 'shared/assets/icons/alert.svg?react'
import infoIcon from 'shared/assets/icons/info.svg?react'

import { Icon } from '../icon'
import { HStack, VStack } from '../stack'
import { Text } from '../text'

import './input.scss'

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

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    type: InputTypes
    label?: string
    error?: string
    info?: string
    wrapperClassName?: string
    className?: string
}

export default function Input(props: IInput) {
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
    const [inputData, setInputData] = useState<string>('')

    const onChangeInputData = (e: ChangeEvent<HTMLInputElement>) => {
        setInputData(e.target.value)
    }

    return (
        <VStack className={clsx('input-wrapper', wrapperClassName)}>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                type={type}
                name={name}
                value={value ?? inputData}
                onChange={onChange ?? onChangeInputData}
                onBlur={onBlur}
                placeholder={placeholder}
                className={clsx('input', error && 'error', className)}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...rest}
            />
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
