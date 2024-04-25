import React, { FC } from 'react'
import clsx from 'clsx'

import './button.scss'

interface IButton {
    readonly children: string
    readonly Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    readonly theme?: 'blue' | 'transparent-grey' | 'transparent-blue'
    readonly disabled?: boolean
    readonly className?: string
    readonly onClick?: () => void
}

export const Button: FC<IButton> = (props) => {
    const {
        children,
        Icon,
        theme = 'blue',
        disabled = false,
        className,
        onClick,
    } = props

    return (
        <button
            type='button'
            onClick={onClick}
            className={clsx(
                'button',
                `button_theme_${theme}`,
                disabled && 'button_disabled',
                className
            )}>
            {Icon && <Icon />}
            {children}
        </button>
    )
}