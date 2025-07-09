import { useState } from 'react'
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

    const [controlModal, setControlModal] = useState<boolean>(false)

    const handleControlModal = () => {
        setControlModal(!controlModal)
    }

    const handleReport = () => {
        console.log('REPORT NOT WORK YET')
    }
    
    const handleWinner = () => {

    }

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
            <div className='media__overlay__4'>
                <button type='button' onClick={handleControlModal}><Icon Svg={action} /></button>

                {controlModal && <div className="media__overlay__4__control">
                    <button onClick = {handleReport} type='button'>Report</button>
                    <button onClick = {handleWinner} type='button'>Promote to winners</button>
                </div>}
            </div>
        </VStack>
    )
}

export default MediaOverlay
