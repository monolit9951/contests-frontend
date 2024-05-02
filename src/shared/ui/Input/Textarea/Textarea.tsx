import { ChangeEvent, TextareaHTMLAttributes, useState } from 'react'
import clsx from 'clsx'
import alertIcon from 'shared/assets/icons/alert.svg?react'
import infoIcon from 'shared/assets/icons/info.svg?react'

import { Icon } from '../../Icon'
import { HStack, VStack } from '../../Stack'
import { Text } from '../../Text'

import './Textarea.scss'

interface ITextarea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    error?: string
    info?: string
    wrapperClassName?: string
    className?: string
}

export default function Textarea(props: ITextarea) {
    const {
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
    const [textareaData, setTextareaData] = useState<string>('')

    const onChangeTextareaData = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTextareaData(e.target.value)
    }

    return (
        <VStack className={clsx('input-wrapper', wrapperClassName)}>
            {label && <label htmlFor={name}>{label}</label>}
            <textarea
                name={name}
                value={value ?? textareaData}
                onChange={onChange ?? onChangeTextareaData}
                onBlur={onBlur}
                placeholder={placeholder}
                className={clsx(
                    'input',
                    'textarea',
                    error && 'error',
                    className
                )}
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
