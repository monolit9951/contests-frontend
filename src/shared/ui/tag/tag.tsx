import clsx from 'clsx'
import {useTheme} from "entities/theme";

import { Text } from '../text'

import './tag.scss'

interface TagProps {
    type: 'fun' | 'work'
    className?: string
}

export default function Tag(props: TagProps) {
    const { type, className } = props
    const { theme } = useTheme()

    return (
        <Text
            Tag='span'
            bold
            className={clsx('tag', theme, `tag__${type}`, className)}>
            For {type}
        </Text>
    )
}
