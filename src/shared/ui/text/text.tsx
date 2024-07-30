import { ReactNode } from 'react'
import clsx from 'clsx'

import './text.scss'

type TagTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'

type SizeTypes = 'title' | 'xxl' | 'xl' | 'l' | 'md' | 'sm' | 'xs' | 'xxs'

interface TextProps {
    Tag: TagTypes
    children: string | ReactNode
    size?: SizeTypes
    bold?: boolean
    title?: string
    onClick?: () => void
    className?: string
}

export default function Text(props: TextProps) {
    const { Tag, size, bold, className, title, onClick, children } = props

    return (
        <Tag
            className={clsx(
                'text',
                size && `text__${size}`,
                bold && 'text__bold',
                className
            )}
            title={title}
            onClick={onClick}>
            {children}
        </Tag>
    )
}
