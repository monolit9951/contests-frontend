import { forwardRef, ReactNode } from 'react'
import clsx from 'clsx'
import { useTheme } from 'entities/theme'

import './button.scss'

type VariantTypes = 'primary' | 'secondary' | 'ghost' | 'clickable-div'

type SizeTypes = 'm' | 's'

const variantClasses: Record<VariantTypes, string> = {
    primary: 'primary',
    secondary: 'secondary',
    ghost: 'ghost',
    'clickable-div': 'clickable-div',
}

interface IButton {
    children?: string | ReactNode
    variant: VariantTypes
    title?: string
    size?: SizeTypes
    className?: string
    disabled?: boolean
    onClick?: () => void
}

const Button = forwardRef<HTMLButtonElement, IButton>((props, ref) => {
    const {
        children,
        variant = 'primary',
        title,
        size,
        className,
        disabled = false,
        onClick,
    } = props

    const { theme } = useTheme()

    return (
        <button
            ref={ref}
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
            {children}
        </button>
    )
})

export default Button
