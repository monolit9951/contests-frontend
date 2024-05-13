import React from 'react'
import { useTheme } from 'entities/theme'
import Verified from 'shared/assets/icons/SealCheck.svg?react'
import Star from 'shared/assets/icons/Star.svg?react'
import PrizeIcon from 'shared/assets/icons/trophyF.svg?react'
import contestImg from 'shared/assets/img/contestBG.png'
import { Button } from 'shared/ui/button'
import { Image } from 'shared/ui/image'
import { Flex, VStack } from 'shared/ui/stack'
import { Tag } from 'shared/ui/tag'
import { Text } from 'shared/ui/text'
import { TopUser } from 'shared/ui/topUser'

import './contestCard.scss'

interface ContestCardProps {
    date?: string
    prize?: {
        img: string
        description: string
    } | null
    category: { des: any }
    title?: string
    tags?: string[]
    user: {
        name: string
        avatar: string
        isVerified: boolean
        isTop?: string
        rate?: string
    }
}

export const ContestCard: React.FC<ContestCardProps> = ({ date, ...rest }) => {
    const { theme } = useTheme()

    const tagType = rest?.category?.des
    const getBgColor = () => {
        if (tagType === 'fun') {
            return '#A65CEF'
        }
        return '#0BA486'
    }
    return (
        <div className={`contest-card-wrapper ${theme}`}>
            <Flex className='justify__between align__center'>
                <Flex className='align__center'>
                    <Image
                        alt=''
                        src={rest.user?.avatar}
                        className='user-avatar'
                    />
                    <VStack className='user-des'>
                        <Flex className='align__center'>
                            <Text Tag='span'>{rest.user?.name}</Text>
                            {rest.user.isVerified && <Verified />}
                        </Flex>
                        <Flex className='justify__between align__center'>
                            <TopUser topRate={3} />
                            {rest.user.rate && (
                                <Flex className='align__center'>
                                    <span>{rest.user?.rate}</span>
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
                    <Image alt='' src={contestImg} />
                    <div className='prize' style={{ background: getBgColor() }}>
                        <PrizeIcon />
                        <Text Tag='span'>{rest.prize?.description}</Text>
                    </div>
                </VStack>
            </div>
            <div className='contest-card-title'>
                <Text Tag='h4' bold size='l'>
                    {rest.title}
                </Text>
                <Flex className='segments align__center'>
                    {rest.tags?.map((tag, index) => (
                        <div key={index} className={`${theme}`}>
                            {tag}
                        </div>
                    ))}
                </Flex>
            </div>
            <Flex className='btn-box align__center justify__between'>
                <VStack className='date'>
                    <Text Tag='p' bold>
                        Completing the task
                    </Text>
                    <Text Tag='span' size='small'>
                        until {date}
                    </Text>
                </VStack>
                <Button variant='secondary'>See details</Button>
            </Flex>
        </div>
    )
}
