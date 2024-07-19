import { FC, SVGProps } from 'react'
import clsx from 'clsx'
import { useTheme } from 'entities/theme'

import './icon.scss'

type SvgProps = Omit<SVGProps<SVGSVGElement>, 'onClick'>

interface IIcon extends SvgProps {
    Svg: FC<SVGProps<SVGSVGElement>> | string
    width?: number
    height?: number
    unique?: boolean
    clickable?: boolean
    onClick?: () => void
    className?: string
    btnClassName?: string
}

export default function Icon(props: IIcon) {
    const { theme } = useTheme()
    const {
        Svg,
        width = 24,
        height = 24,
        unique,
        clickable,
        onClick,
        className,
        btnClassName,
        ...rest
    } = props

    const icon = (
        <Svg
            width={width}
            height={height}
            className={clsx(!unique && 'icon', className, theme)}
            {...rest}
        />
    )

    if (clickable) {
        return (
            <button
                type='button'
                className={clsx('icon-btn', btnClassName, theme)}
                onClick={onClick}
                style={{ height, width }}>
                {icon}
            </button>
        )
    }

    return icon
}
