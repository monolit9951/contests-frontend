/* eslint-disable no-return-assign */
import { FC, useEffect, useState } from 'react'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import clsx from 'clsx'
import instance from 'shared/api/api'
import Dislike from 'shared/assets/controlledSVG/dislike'
import Like from 'shared/assets/controlledSVG/like'
import { useAlert } from 'shared/lib/hooks/useAlert/useAlert'

import { HStack } from '../stack'
import { Text } from '../text'

import './rateButtons.scss'

interface Props {
    mobile?: boolean
    id?: string
    likes: number
    work?: boolean
    border?: boolean
    userLike: string | null
    handleLikeCallBack?: (action: any) => void
}

const RateButtons: FC<Props> = (props) => {
    const { id, border, likes, work, userLike, handleLikeCallBack, mobile } = props
    const [likesNum, setLikesNum] = useState<number>(likes)
    const [liked, setLiked] = useState<boolean>(userLike === 'LIKE')
    const [disliked, setDisliked] = useState<boolean>(userLike === 'DISLIKE')
    const {showAlert, Alert} = useAlert()
    const token = localStorage.getItem('userToken')

    const onRate = async (action: string): Promise<"SUCCESS" | "ERROR"> => {
        try {
            await instance.patch(`${work ? 'works' : 'comment'}/addLike/${id}?likeType=${action}`, null, {headers: { Authorization: `Bearer ${token}` }})
            return 'SUCCESS'
        } catch (err) {
            showAlert('ОШИБКА ПРИ ДОБАВЛЕНИИ, ЗАМЕНИТЬ ЭТОТ АЛЁРТ')
            return 'ERROR'
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

            // если был дизлайк, а мы нажали лайк
            if (disliked) {
                setDisliked(!disliked)
                setLiked(true)
                setLikesNum((_prev) => (_prev += 1))
            
                if(handleLikeCallBack){
                    handleLikeCallBack({userLike: "LIKE", likeAmount: likesNum + 1})
                }

                onRate('DISLIKE')
                onRate('LIKE')
            }

            // если был лайк и нажали опять сняв его
            if (liked) {
                setLiked(!liked)
                setLikesNum((_prev) => (_prev -= 1))
                
                if(handleLikeCallBack){
                    handleLikeCallBack({userLike: null, likeAmount: likesNum - 1})
                }

                onRate('LIKE')
            
            // если не было реакции 
            } else if (!disliked && !liked) {
                setLiked(!liked)
                setLikesNum((_prev) => (_prev += 1))

                onRate('LIKE')

                if(handleLikeCallBack){
                    handleLikeCallBack({userLike: "LIKE", likeAmount: likesNum + 1})
                }
            }
        }
    }

    const onDislikeClick = async () => {
        if(user.userId === null){
            showAlert("You not authorized")
        } else{

            // если был лайк а мы нажали дизлайк
            if (liked) {
                setLiked(!liked)
                setDisliked(true)
                setLikesNum((_prev) => (_prev -= 1))

                onRate('LIKE')
                onRate('DISLIKE')

                if(handleLikeCallBack){
                    handleLikeCallBack({userLike: "DISLIKE", likeAmount: likesNum - 1})
                }
            }
            // если был дизлайк и мы его опять сняв его
            if (disliked) {
                setDisliked(!disliked)

                onRate('DISLIKE')

                if(handleLikeCallBack){
                    handleLikeCallBack({userLike: null, likeAmount: likesNum})
                }
            
            // если не было реакции
            } else if (!disliked && !liked) {
                setDisliked(!disliked)

                onRate('DISLIKE')

                if(handleLikeCallBack){
                    handleLikeCallBack({userLike: "DISLIKE", likeAmount: likesNum})
                }
            }
        }
    }

    return (
        <HStack
            className={clsx('rate-wrapper', border && 'rate-wrapper__border', mobile && 'mobile')}>
            <button type='button' aria-label='like' onClick={onLikeClick}>
                {/* <Icon Svg={liked ? likeActive : like} width={20} height={20} /> */}
                <Like active = {liked}/>
            </button>
            {likesNum > 0 && (
                <Text Tag='span' size='sm'>
                    {likesNum >= 1000
                        ? `${Number((likesNum / 1000).toFixed(1))}k`
                        : likesNum}
                </Text>
            )}
            <button type='button' aria-label='dislike' onClick={onDislikeClick}>
                {/* <Icon
                    Svg={disliked ? dislikeActive : dislike}
                    width={20}
                    height={20}
                /> */}

                <Dislike active={disliked}/> 
            </button>
            <Alert />
        </HStack>
    )
}

export default RateButtons