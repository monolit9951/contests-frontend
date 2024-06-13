import clsx from 'clsx'
import { Category } from 'entities/contest'
import { useTheme } from 'entities/theme'

import { Text } from '../text'

import './tag.scss'

interface TagProps {
    type: Category
    className?: string
}

export default function Tag(props: TagProps) {
    const { type, className } = props
    const { theme } = useTheme()

    const currentType = type === 'FOR_FUN' ? 'fun' : 'work'

    return (
        <Text
            Tag='span'
            bold
            className={clsx('tag', theme, `tag__${currentType}`, className)}>
            For {currentType}
        </Text>
    )
}
