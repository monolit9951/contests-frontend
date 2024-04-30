import { ImgHTMLAttributes } from 'react'
import clsx from 'clsx'

import './Image.scss'

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string
    alt: string
    width?: string
    height?: string
    className?: string
}

export default function Image(props: ImageProps) {
    const { src, alt, width, height, className, ...rest } = props

    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={clsx(className)}
            {...rest}
        />
    )
}
