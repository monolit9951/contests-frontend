import { FC, SVGProps } from 'react'
import clsx from 'clsx'

import './icon.scss'

type SvgProps = Omit<SVGProps<SVGSVGElement>, 'onClick'>

interface IIcon extends SvgProps {
    Svg: FC<SVGProps<SVGSVGElement>> | string
    width?: number
    height?: number
    clickable?: boolean
    onClick?: () => void
    className?: string
}

export default function Icon(props: IIcon) {
    const {
        Svg,
        width = 24,
        height = 24,
        clickable,
        className,
        onClick,
        ...rest
    } = props

    const icon = (
        <Svg
            width={width}
            height={height}
            className={clsx('icon', className)}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        />
    )

    if (clickable) {
        return (
            <button
                type='button'
                className={clsx('icon-btn', className)}
                onClick={onClick}
                style={{ height, width }}>
                {icon}
            </button>
        )
    }

    return icon
}
