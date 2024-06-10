import { useState } from 'react'
import clsx from 'clsx'
import instance from 'shared/api/api'
import dislike from 'shared/assets/icons/dislike.svg?react'
import dislikeF from 'shared/assets/icons/dislikeF.svg?react'
import like from 'shared/assets/icons/like.svg?react'
import likeF from 'shared/assets/icons/likeF.svg?react'

import { Icon } from '../icon'
import { HStack } from '../stack'
import { Text } from '../text'

import './rateButtons.scss'

interface Props {
    id: string
    likes: number
    border?: boolean
}

const RateButtons = (props: Props) => {
    const { id, border, likes } = props

    const [likesNum, setLikesNum] = useState(likes)
    const [liked, setLiked] = useState(false)
    const [disliked, setDisliked] = useState(false)

    const onLike = async () => {
        try {
            const response = await instance.patch(
                `comment/addLike/${id}?likeOrDislike=like`
            )

            setLikesNum(response.data)
            setLiked(true)
        } catch (err) {
            console.error(err)
            setLiked(false)
        }
    }

    const onDislike = async () => {
        try {
            const response = await instance.patch(
                `comment/addLike/${id}?likeOrDislike=dislike`
            )

            setLikesNum(response.data)
            setDisliked(true)
        } catch (err) {
            console.error(err)
            setDisliked(false)
        }
    }

    const onLikeClick = () => {
        if (disliked) {
            setDisliked(false)
            onLike()
        }
        if (liked) {
            onDislike()
        } else {
            onLike()
        }
    }

    const onDislikeClick = () => {
        if (liked) {
            setLiked(false)
            onDislike()
        }
        if (disliked) {
            onLike()
        } else {
            onDislike()
        }
    }

    return (
        <HStack
            className={clsx('rate-wrapper', border && 'rate-wrapper__border')}>
            <button type='button' aria-label='like' onClick={onLikeClick}>
                <Icon Svg={liked ? likeF : like} width={20} height={20} />
            </button>
            {likesNum > 0 && (
                <Text Tag='span' size='sm'>
                    {likesNum >= 1000
                        ? `${Number((likesNum / 1000).toFixed(1))}k`
                        : likesNum}
                </Text>
            )}
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
