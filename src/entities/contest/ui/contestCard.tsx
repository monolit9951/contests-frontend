import React from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { useTheme } from 'entities/theme'
import moment from 'moment'
import Verified from 'shared/assets/icons/SealCheck.svg?react'
import Star from 'shared/assets/icons/Star.svg?react'
import PrizeIcon from 'shared/assets/icons/trophyF.svg?react'
import contestImg from 'shared/assets/img/contestBG.png'
import { Button } from 'shared/ui/button'
import { Image } from 'shared/ui/image'
import { Flex, HStack, VStack } from 'shared/ui/stack'
import { Tag } from 'shared/ui/tag'
import { Text } from 'shared/ui/text'
import { TopUser } from 'shared/ui/topUser'
import { UserIcon } from 'shared/ui/userIcon'

import { ContestPreview } from '../model/types'

import './contestCard.scss'

interface Props extends ContestPreview {
    className?: string
}

export const ContestCard: React.FC<Props> = (props) => {
    const { className, dateEnd, ...rest } = props

    const navigate = useNavigate()
    const { theme } = useTheme()

    const deadline = moment(dateEnd).format('DD.MM.YYYY')

    const tagType = rest.category

    const getBgColor = () => {
        if (tagType === 'FOR_FUN') {
            return 'var(--purple)'
        }
        if (tagType === 'FOR_WORK') {
            return 'var(--green)'
        }
        return 'var(--orange)'
    }

    const onDetailsClick = () => {
        navigate(`./${rest.id}`)
    }

    return (
        <div className={clsx('contest-card-wrapper', theme, className)}>
            <Flex className='justify__between align__center'>
                <Flex className='align__center'>
                    <UserIcon
                        src={rest.contestOwner.profileImage}
                        alt='Creator`s profile'
                        className='user-avatar'
                    />
                    <VStack className='user-des'>
                        <Flex className='align__center'>
                            <Text Tag='span' bold size='sm'>
                                {rest.contestOwner?.name}
                            </Text>
                            {rest.contestOwner.verificationStatus && (
                                <Verified />
                            )}
                        </Flex>
                        <Flex className='align__center'>
                            <TopUser topRate={3} />
                            {rest.contestOwner.organizerRating && (
                                <HStack className='align__center'>
                                    <Text Tag='span' bold size='xs'>
                                        {rest.contestOwner.organizerRating.toFixed(
                                            1
                                        )}
                                    </Text>
                                    <Star />
                                </HStack>
                            )}
                        </Flex>
                    </VStack>
                </Flex>
                <Tag type={tagType} className='tag' />
            </Flex>
            <div className='contest-card-body'>
                <VStack className='image-box align__center'>
                    <Image
                        alt='Contest preview image'
                        src={rest.previewImage ?? contestImg}
                        width={377}
                        height={212}
                        onError={(e) => {
                            e.currentTarget.src = contestImg
                            e.currentTarget.onerror = null
                        }}
                    />
                    <div className='prize' style={{ background: getBgColor() }}>
                        <PrizeIcon />
                        <Text Tag='span'>
                            {rest.prizesPreviews[0]?.prizeType}
                        </Text>
                    </div>
                </VStack>
            </div>
            <div className='contest-card-title'>
                <Text Tag='h4' bold size='l'>
                    {rest.name}
                </Text>
                <Flex className='segments align__center'>
                    <div className={`${theme}`}>{rest.status}</div>
                    <div className={`${theme}`}>{rest.subcategory}</div>
                    <div className={`${theme}`}>
                        {rest.maxAllowedParticipantAmount} participants
                    </div>
                </Flex>
            </div>
            <Flex className='btn-box align__center justify__between'>
                <VStack className='date'>
                    <Text Tag='p' bold size='sm'>
                        Completing the task
                    </Text>
                    <Text Tag='span' size='xs'>
                        until {deadline}
                        {/* {dateEnd[2]}.
                        {dateEnd[1] < 10 ? `0${dateEnd[1]}` : dateEnd[1]}.
                        {dateEnd[0]} */}
                    </Text>
                </VStack>
                <Button variant='secondary' onClick={onDetailsClick}>
                    See details
                </Button>
            </Flex>
        </div>
    )
}
