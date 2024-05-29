import { TopPrize } from 'entities/prize'
import cards from 'shared/assets/icons/cards.svg?react'
import action from 'shared/assets/icons/tripleDot.svg?react'
import { Icon } from 'shared/ui/icon'
import { VStack } from 'shared/ui/stack'
import { UserIcon } from 'shared/ui/userIcon'

import './mediaOverlay.scss'

interface Props {
    place?: '1st' | '2nd' | '3rd'
}

const MediaOverlay = ({ place }: Props) => {
    const onCardsClick = () => {}

    const onAction = () => {}

    return (
        <VStack className='media__overlay'>
            {place && <TopPrize place={place} className='media__overlay__1' />}
            <Icon
                Svg={cards}
                clickable
                onClick={onCardsClick}
                btnClassName='media__overlay__2'
            />
            <UserIcon
                size={40}
                userName='Devin Reynolds'
                className='media__overlay__3'
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
