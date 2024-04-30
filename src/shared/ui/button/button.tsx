import { ReactNode } from 'react'
import clsx from 'clsx'
import { useTheme } from 'entities/theme'

import './Button.scss'
import {Text} from "shared/ui/Text";

type VariantTypes = 'primary' | 'secondary' | 'ghost'

type SizeTypes = 'm' | 's'

const variantClasses: Record<VariantTypes, string> = {
    primary: 'primary',
    secondary: 'secondary',
    ghost: 'ghost',
}

interface IButton {
    children: string | ReactNode
    variant: VariantTypes
    title?: string
    size?: SizeTypes
    className?: string
    disabled?: boolean
    onClick?: () => void
}

export default function Button(props: IButton) {
    const {
        children,
        variant,
        title,
        size,
        className,
        disabled = false,
        onClick,
    } = props

    const { theme } = useTheme()

    return (
        <button
            type='button'
            title={title}
            disabled={disabled}
            onClick={onClick}
            className={clsx(
                'button',
                theme,
                variantClasses[variant],
                size && `button__${size}`,
                className
            )}>
            <Text Tag="span" bold>{children}</Text>
        </button>
    )
}
