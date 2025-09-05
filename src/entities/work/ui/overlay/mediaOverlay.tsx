import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Prize, TopPrize } from 'entities/prize'
import { User } from 'entities/user'
// import cards from 'shared/assets/icons/cards.svg?react'
import action from 'shared/assets/icons/tripleDot.svg?react'
// import video from 'shared/assets/icons/video.svg?react'
import { Icon } from 'shared/ui/icon'
import { VStack } from 'shared/ui/stack'
import { UserIcon } from 'shared/ui/userIcon'

import './mediaOverlay.scss'

interface Props {
    prize?: Prize
    user: User
    handleReportCallback: () => void
}

const MediaOverlay = ({ prize, user, handleReportCallback }: Props) => {
    // const onCardsClick = () => {}

    const [controlModal, setControlModal] = useState<boolean>(false)

    const handleControlModal = () => {
        setControlModal(!controlModal)
    }

    const handleReport = () => {
        setControlModal(false)
        handleReportCallback()
    }
    
    const loginedUser = useSelector((state: RootState) => state.user)

    return (
        <VStack className='media__overlay'>
            {prize && <TopPrize data={prize} className='media__overlay__1' />}
            {/* <Icon
                Svg={imageCards ? cards : video}
                clickable
                onClick={onCardsClick}
                btnClassName='media__overlay__2'
            /> */}
            <Link to={loginedUser.userId === user.id? '/profile' : `/profile/${user.id}`}>
                <UserIcon
                    src={user.profileImage? user.profileImage : ''}
                    size={40}
                    userName={user.name}
                    wrapperClassName='media__overlay__3'
                />
            </Link>
            <div className='media__overlay__4'>
                <button type='button' onClick={handleControlModal} aria-label="Open modal"><Icon Svg={action} /></button>

                {controlModal && <div className="media__overlay__4__control">
                    <button onClick = {handleReport} type='button'>Report</button>
                    {/* <button onClick = {handleWinner} type='button'>Promote to winners</button> */}
                    {/* eslint-disable-next-line */}
                    <div className="media__overlay__4_background" onClick={handleControlModal}/>
                </div>}

            </div>
            
        </VStack>
    )
}

export default MediaOverlay
