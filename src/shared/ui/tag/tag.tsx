import clsx from 'clsx'
import { Status } from 'entities/contest'
import { useTheme } from 'entities/theme'

import { Text } from '../text'

import './tag.scss'

interface TagProps {
    // type: Category
    type: Status
    className?: string
}

export default function Tag(props: TagProps) {
    const { type, className } = props
    const { theme } = useTheme()

    const statusTranslation = (status: Status) => {

        switch (status) {
            case 'FINISHED':
                return 'Finished'
            case 'UPCOMING':
                return 'Upcoming'
            case "ACTIVE":
                return 'Active'
            case "MODERATOR_SELECTION":
                return 'Review'
            case "SELECTION_IN_PROGRESS":
                return 'Review'
            case "WINNER_CONFIRMATION":
                return 'Review'
            default:
                return 'Inactive'
        }
            
    }

    if(statusTranslation(type) === 'Inactive'){
        console.log(type)
    }

    return (
        <Text
            Tag='span'
            bold
            className={clsx('tag', theme, `tag__${statusTranslation(type)}`, className)}>
            {statusTranslation(type)}
        </Text>
    )
}
