import { ReactNode } from 'react'
import clsx from 'clsx'

import './Text.scss'

type TagTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'

type SizeTypes = 'title' | 'xs' | 'l' | 'xl' | 'xxl' | 'xxs' | 'small'

interface TextProps {
    Tag: TagTypes
    children: string | ReactNode
    size?: SizeTypes
    bold?: boolean
    className?: string
}

export default function Text(props: TextProps) {
    const { Tag, size, bold, className, children } = props

    return (
        <Tag
            className={clsx(
                'text',
                size && `text__${size}`,
                bold && 'text__bold',
                className
            )}>
            {children}
        </Tag>
    )
}
