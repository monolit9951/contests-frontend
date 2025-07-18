import { FC, useState } from 'react'
import clsx from 'clsx'
import bubble from 'shared/assets/icons/chat.svg?react'
import share from 'shared/assets/icons/share.svg?react'

import { Button } from '../button'
import { Icon } from '../icon'
import { RateButtons } from '../rateButtons'
import { HStack } from '../stack'
import { Text } from '../text'

import './mediaFeedback.scss'

interface Props {
    id: string
    likes: number
    comments?: number
    onCommentsClick?: () => void
    className?: string
    liked: null | string
}

const MediaFeedback: FC<Props> = (props) => {
    const { id, likes, comments, onCommentsClick, className, liked } = props


    const onShare = () => {}

    return (
        <HStack className={clsx('feedback__wrapper', className)}>
            
            <HStack>
                <RateButtons id={id} likes={likes} work border userLike = {liked}/>
                {onCommentsClick && (
                    <Button
                        variant='secondary'
                        size='s'
                        aria-label='comment'
                        onClick={onCommentsClick}
                        className='feedback__button'>
                        <Icon Svg={bubble} width={20} height={20} />
                        <Text Tag='span' size='sm'>
                            {comments}
                        </Text>
                    </Button>
                )}
            </HStack>
            <Button
                variant='secondary'
                size='s'
                icon={share}
                onClick={onShare}
                className='feedback__button'>
                <Text Tag='p' size='sm' bold>
                    Share
                </Text>
            </Button>

        </HStack>
    )
}

export default MediaFeedback
