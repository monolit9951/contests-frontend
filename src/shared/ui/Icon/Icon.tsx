import { FC, SVGProps } from 'react'
import clsx from 'clsx'

type SvgProps = Omit<SVGProps<SVGSVGElement>, 'onClick'>

interface IIcon extends SvgProps {
    Svg: FC<SVGProps<SVGSVGElement>> | string
    width?: number
    height?: number
    className?: string
}

export default function Icon(props: IIcon) {
    const { Svg, width = 24, height = 24, className, ...rest } = props

    return (
        <Svg
            width={width}
            height={height}
            className={clsx(className)}
            {...rest}
        />
    )
}
