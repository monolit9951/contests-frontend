import React from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import moment from 'moment'
import Verified from 'shared/assets/icons/SealCheck.svg?react'
import Star from 'shared/assets/icons/Star.svg?react'
import PrizeIcon from 'shared/assets/icons/trophyF.svg?react'
import { capitalizeStr } from 'shared/helpers'
import { Button } from 'shared/ui/button'
import { Flex, HStack, VStack } from 'shared/ui/stack'
import { Tag } from 'shared/ui/tag'
import { Text } from 'shared/ui/text'
import { TopUser } from 'shared/ui/topUser'
import { UserIcon } from 'shared/ui/userIcon'

import testImage from '../../../shared/assets/testImages/contestPreviewSample.png'
import { ContestPreview } from '../model/types'

import './contestCard.scss'

interface Props extends ContestPreview {
    className?: string
}

const ContestCard: React.FC<Props> = (props) => {
    const { className, contestOwner, prizesPreviews, dateEnd, ...rest } = props

    const navigate = useNavigate()

    const deadline = moment(dateEnd).format('DD.MM.YYYY')

    const tagType = rest.category

    const { currency, prizeAmount, prizeText, prizeType } = prizesPreviews[0]

    const getBgColor = () => {
        if (tagType === 'FOR_FUN') {
            return 'var(--purple)'
        }
        if (tagType === 'FOR_WORK') {
            return 'var(--orange)'
        }
        return 'var(--green)'
    }

    const onDetailsClick = () => {
        navigate(`./${rest.id}`)
    }

    return (
        <div className={clsx('contest-card-wrapper', className)}>
            <Flex className='justify__between align__center'>
                <Flex className='align__center'>
                    <UserIcon
                        src={contestOwner.profileImage}
                        alt='Creator`s profile'
                        className='user-avatar'
                    />
                    <VStack className='user-des'>
                        <Flex className='align__center'>
                            <Text Tag='span' bold size='sm'>
                                {contestOwner?.name}
                            </Text>
                            {contestOwner.verificationStatus && <Verified />}
                        </Flex>
                        <Flex className='align__center'>
                            <TopUser topRate={3} />
                            {contestOwner.organizerRating && (
                                <HStack className='align__center'>
                                    <Text Tag='span' bold size='xs'>
                                        {contestOwner.organizerRating.toFixed(
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
                    {/* <Image
                        alt='Contest preview image'
                        // src={rest.previewImage ?? contestImg}
                        src={testImage}
                        width={377}
                        height={212}
                        onClick={onDetailsClick}
                        onError={(e) => {
                            e.currentTarget.src = contestImg
                            e.currentTarget.onerror = null
                        }}
                    /> */}

                    {/* СДЕЛАТЬ ПУСТОЙ БАТТОН */}
                    <img src={testImage} alt="contest preview img" onClick={onDetailsClick} />
                    {/* <img src={rest.previewImage ?? contestImg} alt="contest preview img" /> */}

                    <div className='prize' style={{ background: getBgColor() }}>
                        <PrizeIcon />
                        <Text Tag='span'>
                            {prizeType === 'ITEM'
                                ? prizeText
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
                    <div>{capitalizeStr(rest.status)}</div>
                    <div>{capitalizeStr(rest.subcategory)}</div>
                    <div>{rest.maxAllowedParticipantAmount} participants</div>
                </Flex>
            </div>
            <Flex className='btn-box align__center justify__between'>
                <VStack className='date'>
                    <Text Tag='p' bold size='sm'>
                        Completing the task
                    </Text>
                    <Text Tag='span' size='xs'>
                        until {deadline}
                    </Text>
                </VStack>
                <Button variant='secondary' onClick={onDetailsClick}>
                    See details
                </Button>
            </Flex>
        </div>
    )
}

export default ContestCard
