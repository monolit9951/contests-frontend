import { FC, forwardRef, ReactNode, SVGProps } from 'react'
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

interface IButton {
    children?: string | ReactNode
    variant: VariantTypes
    title?: string
    size?: SizeTypes
    className?: string
    disabled?: boolean
    onClick: () => void
    icon?: FC<SVGProps<SVGSVGElement>> | string
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
        icon,
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
            {icon && <Icon Svg={icon} className='button__icon' />}
            {children}
        </button>
    )
})

export default Button
