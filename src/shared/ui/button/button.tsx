import React from 'react'
import clsx from 'clsx'
import { useTheme } from 'entities/theme'
import { Icon } from 'shared/ui/icon'

import './button.scss'

type VariantTypes = 'primary' | 'secondary' | 'ghost' | 'div'

type SizeTypes = 'm' | 's'

const variantClasses: Record<VariantTypes, string> = {
    primary: 'primary',
    secondary: 'secondary',
    ghost: 'ghost',
    div: 'div',
}

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: string | React.ReactNode
    variant: VariantTypes
    size?: SizeTypes
    className?: string
    onClick?: () => void
    icon?: React.FC<React.SVGProps<SVGSVGElement>> | string
}

const Button = React.forwardRef<HTMLButtonElement, IButton>((props, ref) => {
    const {
        children,
        variant = 'primary',
        size,
        type,
        className,
        onClick,
        icon,
        ...rest
    } = props

    const { theme } = useTheme()

    return (
        <button
            ref={ref}
            {...rest}
            // eslint-disable-next-line react/button-has-type
            type={type ?? 'button'}
            onClick={onClick}
            className={clsx(
                'button',
                theme,
                variantClasses[variant],
                size && `button__${size}`,
                className
            )}>
            {icon && <Icon Svg={icon} className='button__icon' />}
            {children}
        </button>
    )
})

export default Button
