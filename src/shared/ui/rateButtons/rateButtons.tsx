/* eslint-disable no-return-assign */
import { useEffect, useState } from 'react'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import clsx from 'clsx'
import instance from 'shared/api/api'
import dislike from 'shared/assets/icons/dislike.svg?react'
import dislikeActive from 'shared/assets/icons/dislikeF.svg?react'
import like from 'shared/assets/icons/like.svg?react'
import likeActive from 'shared/assets/icons/likeF.svg?react'
import { useAlert } from 'shared/lib/hooks/useAlert/useAlert'

import { Icon } from '../icon'
import { HStack } from '../stack'
import { Text } from '../text'

import './rateButtons.scss'

interface Props {
    id?: string
    likes: number
    work?: boolean
    border?: boolean
    userLike: string | null
}

const RateButtons = (props: Props) => {
    const { id, border, likes, work, userLike } = props

    const [likesNum, setLikesNum] = useState<number>(likes)
    const [liked, setLiked] = useState<boolean>(userLike === 'LIKE')
    const [disliked, setDisliked] = useState<boolean>(userLike === 'DISLIKE')
    const {showAlert, Alert} = useAlert()
    const token = localStorage.getItem('userToken')

    const onRate = async (action: string) => {
        try {
            await instance.patch(`${work ? 'works' : 'comment'}/addLike/${id}?likeType=${action}`, null, {headers: { Authorization: `Bearer ${token}` }})
        } catch (err) {
            showAlert('ОШИБКА ПРИ ДОБАВЛЕНИИ, ЗАМЕНИТЬ ЭТОТ АЛЁРТ')
        }
    }

    const useTypeSelector: TypedUseSelectorHook <RootState> = useSelector
    const user = useTypeSelector((state) => state.user)
    
    useEffect(() => {
        setLikesNum(likes)
    }, [likes])

    useEffect(() => {
        setLiked(userLike === 'LIKE')
        setDisliked(userLike === 'DISLIKE')
    }, [userLike])


    const onLikeClick = async () => {
        if(user.userId === null){
            showAlert("You not authorized")
        } else{
            if (disliked) {
                setDisliked(!disliked)
                setLiked(true)
                setLikesNum((_prev) => (_prev += 1))

                await onRate('DISLIKE')
                onRate('LIKE')
            }
            if (liked) {
                setLiked(!liked)
                setLikesNum((_prev) => (_prev -= 1))

                onRate('LIKE')
            } else if (!disliked && !liked) {
                setLiked(!liked)
                setLikesNum((_prev) => (_prev += 1))

                onRate('LIKE')
            }
        }
    }

    const onDislikeClick = async () => {
        if(user.userId === null){
            showAlert("You not authorized")
        } else{
            if (liked) {
                setLiked(!liked)
                setDisliked(true)
                setLikesNum((_prev) => (_prev -= 1))

                await onRate('LIKE')
                onRate('DISLIKE')
            }
            if (disliked) {
                setDisliked(!disliked)
                // setLikesNum((_prev) => (_prev += 1))

                onRate('DISLIKE')
            } else if (!disliked && !liked) {
                setDisliked(!disliked)
                // setLikesNum((_prev) => (_prev -= 1))

                onRate('DISLIKE')
            }
        }
    }

    return (
        <HStack
            className={clsx('rate-wrapper', border && 'rate-wrapper__border')}>
            <button type='button' aria-label='like' onClick={onLikeClick}>
                <Icon Svg={liked ? likeActive : like} width={20} height={20} />
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
                    Svg={disliked ? dislikeActive : dislike}
                    width={20}
                    height={20}
                />
            </button>

            <Alert />
        </HStack>
    )
}

export default RateButtons