import { useState } from 'react'
import clsx from 'clsx'
import dislike from 'shared/assets/icons/dislike.svg?react'
import dislikeF from 'shared/assets/icons/dislikeF.svg?react'
import like from 'shared/assets/icons/like.svg?react'
import likeF from 'shared/assets/icons/likeF.svg?react'

import { Icon } from '../icon'
import { HStack } from '../stack'
import { Text } from '../text'

import './rateButtons.scss'

interface Props {
    border?: boolean
}

const RateButtons = ({ border }: Props) => {
    const [liked, setLiked] = useState(false)
    const [disliked, setDisliked] = useState(false)

    const onLikeClick = () => {
        if (disliked) {
            setDisliked(false)
        }
        setLiked(!liked)
    }

    const onDislikeClick = () => {
        if (liked) {
            setLiked(false)
        }
        setDisliked(!disliked)
    }

    return (
        <HStack
            className={clsx('rate-wrapper', border && 'rate-wrapper__border')}>
            <button type='button' aria-label='like' onClick={onLikeClick}>
                <Icon Svg={liked ? likeF : like} width={20} height={20} />
            </button>
            <Text Tag='span' size='sm'>
                10.3k
            </Text>
            <button type='button' aria-label='dislike' onClick={onDislikeClick}>
                <Icon
                    Svg={disliked ? dislikeF : dislike}
                    width={20}
                    height={20}
                />
            </button>
        </HStack>
    )
}

export default RateButtons
