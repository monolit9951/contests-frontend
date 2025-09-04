import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
// import moment from 'moment'
// import Verified from 'shared/assets/icons/SealCheck.svg?react'
// import Star from 'shared/assets/icons/Star.svg?react'
import PrizeIcon from 'shared/assets/icons/trophyF.svg?react'
import { capitalizeStr } from 'shared/helpers'
// import { capitalizeStr } from 'shared/helpers'
// import { Button } from 'shared/ui/button'
import { Flex, VStack } from 'shared/ui/stack'
import { Tag } from 'shared/ui/tag'
import { Text } from 'shared/ui/text'
// import { TopUser } from 'shared/ui/topUser'
// import { UserIcon } from 'shared/ui/userIcon'
import UserProfileData from 'widgets/userProfileData/userProfileData'

import { ContestPreview } from '../model/types'

import './contestCard.scss'

interface Props extends ContestPreview {
    className?: string
}

const ContestCard: React.FC<Props> = (props) => {
    const { className, contestOwner, prizesPreviews, ...rest } = props

    const navigate = useNavigate()

    // const startline = moment.utc(rest.dateStart).local().format('DD.MM.YYYY')

    const tagType = rest.contestType


    const { currency, prizeAmount, prizeType } = prizesPreviews[0]

    const getBgColor = () => {
        if (tagType === 'DARE') {
            return 'var(--purple)'
        }
        if (tagType === 'CONTEST') {
            return 'var(--orange)'
        }
        return 'var(--green)'
    }

    const onDetailsClick = () => {
        navigate(`contests/${rest.id}`)
    }

    // const contestStatus = () => {
    //     switch (rest.status) {
    //         case 'FINISHED':
    //             return 'Completed'
    //         case 'UPCOMING':
    //             return 'Upcoming'
    //         case "ACTIVE":
    //             return 'Active'
    //         case "MODERATOR_SELECTION":
    //             return 'Finished'
    //         case "SELECTION_IN_PROGRESS":
    //             return 'Finished'
    //         case "WINNER_CONFIRMATION":
    //             return 'Finished'
    //         default:
    //             return 'Inactive'
    //     }
    // }

    const user = useSelector((state: RootState) => state.user)

    return (
        <div className={clsx('contest-card-wrapper', className)}>
            <Flex className='justify__between align__center'>
                <Link to={user.userId === contestOwner.id? `/profile` : `/profile/${contestOwner.id}`}><UserProfileData user={contestOwner} /></Link>
 
                <Tag type={rest.status} className='tag' />
            </Flex>

            <div className='contest-card-body'>
                <VStack className='image-box align__center'>
                    {/* eslint-disable-next-line */}
                    <img src={rest.previewImage} alt="contest preview img" role='button' onClick={onDetailsClick} />

                    <div className='prize' style={{ background: getBgColor() }}>
                        <PrizeIcon />
                        <Text Tag='span'>
                            {prizeType === 'COINS'
                                ? `${prizeAmount} Coins`
                                : `${prizeAmount} ${currency}`}
                        </Text>
                    </div>
                </VStack>
            </div>

            <div className='contest-card-title'>
                <Text Tag='h4' bold size='l'>
                    {rest.name} 
                </Text>

                <Flex className='segments align__center contest-card-tags'>
                    {/* <div>{rest.status === 'UPCOMING'? `From ${startline}` : contestStatus()}</div> */}
                    <div>{capitalizeStr(rest.contestType)}</div>
                    {/* <div>{capitalizeStr(rest.subcategory)}</div> */}
                    <div>{rest.participantAmount} participants</div>
                </Flex>
            </div>
            {/* <Flex className='btn-box align__center justify__between'>
                <VStack className='date'>
                    <Text Tag='p' bold size='sm'>
                        Completing the task
                    </Text>
                    <Text Tag="span" size="xs">
                    {
                        (rest.status === "FINISHED" && `End date ${deadline}`) ||
                        (rest.status === "ACTIVE" && `Up to ${deadline}`) ||
                        `To ${deadline}`
                    }
                    </Text>
                </VStack>
                <Button variant='secondary' onClick={onDetailsClick}>
                    See details
                </Button>
            </Flex> */}
        </div>
    )
}

export default ContestCard
