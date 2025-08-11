import React, { ChangeEvent, forwardRef } from 'react'
import clsx from 'clsx'
import alertIcon from 'shared/assets/icons/alert.svg?react'
import infoIcon from 'shared/assets/icons/info.svg?react'
import { Icon } from 'shared/ui/icon'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './textarea.scss'

type HTMLTextareaProps = Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'name' | 'onChange' | 'onBlur' | 'placeholder' | 'value' | 'className'
>

interface ITextarea extends HTMLTextareaProps {
    label?: string
    error?: string
    info?: string
    name: string
    onBlur?: (event: ChangeEvent<HTMLTextAreaElement>) => void
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
    placeholder?: string
    value?: string
    wrapperClassName?: string
    className?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, ITextarea>((props, ref) => {
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

    const textarea = (
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            placeholder={placeholder}
            className={clsx('input', 'textarea', error && 'error', className)}
            {...rest}
        />
    )

    if (label ?? info ?? error) {
        return (
            <VStack className={clsx('input-wrapper', wrapperClassName)}>
                {/* {label && (
                    <label className='input-wrapper__label' htmlFor={name}>
                        {label}
                    </label>
                )} */}
                {textarea}
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

    return textarea
})

export default Textarea
