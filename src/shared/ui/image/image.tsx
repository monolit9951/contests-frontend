import { ImgHTMLAttributes } from 'react'
import clsx from 'clsx'

import './image.scss'

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string | undefined
    alt: string
    width?: number
    height?: number
    round?: boolean
    className?: string
}

export default function Image(props: ImageProps) {
    const { src, alt, width, height, className, round, ...rest } = props

    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={clsx(round && 'image__round', className)}
            {...rest}
        />
    )
}
