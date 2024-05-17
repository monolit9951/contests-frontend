import React from 'react'
import clsx from 'clsx'
import { useTheme } from 'entities/theme'
import Verified from 'shared/assets/icons/SealCheck.svg?react'
import Star from 'shared/assets/icons/Star.svg?react'
import PrizeIcon from 'shared/assets/icons/trophyF.svg?react'
import contestImg from 'shared/assets/img/contestBG.png'
import avatar from 'shared/assets/img/userIMG.jpg'
import { Button } from 'shared/ui/button'
import { Image } from 'shared/ui/image'
import { Flex, VStack } from 'shared/ui/stack'
import { Tag } from 'shared/ui/tag'
import { Text } from 'shared/ui/text'
import { TopUser } from 'shared/ui/topUser'

import { ContestPreview } from '../model/types'

import './contestCard.scss'

interface Props extends ContestPreview {
    className?: string
}

export const ContestCard: React.FC<Props> = (props) => {
    const { className, dateEnd, ...rest } = props

    const { theme } = useTheme()

    const tagType = rest.category
    const getBgColor = () => {
        if (tagType === 'CATEGORY1') {
            return 'var(--purple)'
        }
        if (tagType === 'CATEGORY2') {
            return 'var(--green)'
        }
        return 'var(--orange)'
    }

    return (
        <div className={clsx('contest-card-wrapper', theme, className)}>
            <Flex className='justify__between align__center'>
                <Flex className='align__center'>
                    <Image
                        alt='Creator`s profile'
                        src={rest.contestOwner.profileImage}
                        className='user-avatar'
                        onError={(e) => {
                            e.currentTarget.src = avatar
                            e.currentTarget.onerror = null
                        }}
                    />
                    <VStack className='user-des'>
                        <Flex className='align__center'>
                            <Text Tag='span'>{rest.contestOwner?.name}</Text>
                            {rest.contestOwner.verificationStatus && (
                                <Verified />
                            )}
                        </Flex>
                        <Flex className=' align__center'>
                            <TopUser topRate={3} />
                            {rest.contestOwner.organizerRating && (
                                <Flex className='align__center'>
                                    <span>
                                        {rest.contestOwner.organizerRating.toFixed(
                                            1
                                        )}
                                    </span>
                                    <Star />
                                </Flex>
                            )}
                        </Flex>
                    </VStack>
                </Flex>
                <Tag type={tagType} className='tag' />
            </Flex>
            <div className='contest-card-body'>
                <VStack className='image-box align__center'>
                    <Image
                        alt=''
                        src={rest.previewImage ?? contestImg}
                        onError={(e) => {
                            e.currentTarget.src = contestImg
                            e.currentTarget.onerror = null
                        }}
                    />
                    <div className='prize' style={{ background: getBgColor() }}>
                        <PrizeIcon />
                        <Text Tag='span'>
                            {rest.prizesPreviews[0]?.prizeText}
                        </Text>
                    </div>
                </VStack>
            </div>
            <div className='contest-card-title'>
                <Text Tag='h4' bold size='l'>
                    {rest.name}
                </Text>
                <Flex className='segments align__center'>
                    <div className={`${theme}`}>{rest.subcategory}</div>
                </Flex>
            </div>
            <Flex className='btn-box align__center justify__between'>
                <VStack className='date'>
                    <Text Tag='p' bold size='sm'>
                        Completing the task
                    </Text>
                    <Text Tag='span' size='xs'>
                        until {dateEnd[2]}.
                        {dateEnd[1] < 10 ? `0${dateEnd[1]}` : dateEnd[1]}.
                        {dateEnd[0]}
                    </Text>
                </VStack>
                <Button variant='secondary'>See details</Button>
            </Flex>
        </div>
    )
}