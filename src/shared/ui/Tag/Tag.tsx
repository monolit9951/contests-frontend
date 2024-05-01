import clsx from 'clsx'

import { Text } from '../text'

import './Tag.scss'

interface TagProps {
    type: 'fun' | 'work'
    className?: string
}

export default function Tag(props: TagProps) {
    const { type, className } = props

    return (
        <Text
            Tag='span'
            bold
            className={clsx('tag', `tag__${type}`, className)}>
            For {type}
        </Text>
    )
}
