import { Prize, TopPrize } from 'entities/prize'
import { User } from 'entities/user'
import cards from 'shared/assets/icons/cards.svg?react'
import action from 'shared/assets/icons/tripleDot.svg?react'
import video from 'shared/assets/icons/video.svg?react'
import { Icon } from 'shared/ui/icon'
import { VStack } from 'shared/ui/stack'
import { UserIcon } from 'shared/ui/userIcon'

import './mediaOverlay.scss'

interface Props {
    prize?: Prize
    user: User
    imageCards?: boolean
}

const MediaOverlay = ({ prize, user, imageCards }: Props) => {
    const onCardsClick = () => {}

    const onAction = () => {}

    return (
        <VStack className='media__overlay'>
            {prize && <TopPrize data={prize} className='media__overlay__1' />}
            <Icon
                Svg={imageCards ? cards : video}
                clickable
                onClick={onCardsClick}
                btnClassName='media__overlay__2'
            />
            <UserIcon
                src={user.profileImage}
                size={40}
                userName={user.name}
                wrapperClassName='media__overlay__3'
            />
            <Icon
                Svg={action}
                clickable
                onClick={onAction}
                btnClassName='media__overlay__4'
            />
        </VStack>
    )
}

export default MediaOverlay
