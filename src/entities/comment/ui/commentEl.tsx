import { Dispatch, FC, SetStateAction, useState } from 'react'
import moment from 'moment'
import instance from 'shared/api/api'
import tripleDot from 'shared/assets/icons/tripleDot.svg?react'
import { Button } from 'shared/ui/button'
import { Icon } from 'shared/ui/icon'
import { RateButtons } from 'shared/ui/rateButtons'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'
import { UserIcon } from 'shared/ui/userIcon'

import { Comment } from '../model/types'

import CommentController from './commentController'
import CommentInput from './commentInput'

import './commentEl.scss'

interface Props {
    data: Comment
    userId: string
    setRepliesShown: (bool: boolean) => void
    setRepliesNum: Dispatch<SetStateAction<number>>
    setTotalPages: (num: number) => void
    setSubComments: Dispatch<SetStateAction<Comment[]>>
    setNextLoading: (bool: boolean) => void
    setError: (err: Error | null) => void
    handleNewSubCommentCallback: () => void
}

const CommentEl: FC<Props> = (props) => {
    const {
        data,
        userId,
        handleNewSubCommentCallback,
        setRepliesShown,
        setRepliesNum,
        setTotalPages,
        setSubComments,
        setNextLoading,
        setError,
    } = props

    const [actionsShown, setActionsShown] = useState(false)
    const [replyInputShown, setReplyInputShown] = useState(false)
    const [inputData, setInputData] = useState('')

    const { user, commentDate, commentText, id, likeAmount } = data

    const timeAgo = moment(commentDate).fromNow()

    const onActionClick = () => {
        setActionsShown(!actionsShown)
    }

    const toggleReplyInput = () => {
        setReplyInputShown(!replyInputShown)
        setInputData('')
    }

    const onSubmit = async () => {
        console.log("SUBMIT")
        if (!inputData.trim()) {
            setInputData('')
            return
        }

        try {
            setError(null)
            setNextLoading(true)
            console.log(data.id)
            const response = await instance.post('comment/subComment', {
                parentCommentId: data.id,
                commentText: inputData.trim(),
            })
            // мы не получаем в респонс все комменты, только последний 
            console.log(response.data)
            handleNewSubCommentCallback()
            // const subCommentsObj = response.data.subComments
            // const subCommentsArr = subCommentsObj.content
            // const newSubComment = subCommentsArr[subCommentsArr.length - 1]

            // eslint-disable-next-line no-return-assign
            // setRepliesNum((prev) => (prev += 1))
            // setTotalPages(subCommentsObj.totalPages)
            // setRepliesShown(true)
            // setSubComments((prev) => [...prev, newSubComment])
        } catch (err) {
            setError(err as Error)
        } finally {
            setNextLoading(false)
            toggleReplyInput()
        }
    }

    return (
        <HStack className='comment__wrapper'>
            <UserIcon src={user.profileImage} size={40} />
            <VStack className='comment__body'>
                <HStack className='comment-info'>
                    <Text Tag='p' bold>
                        {user.name}
                        <Text Tag='span' size='sm'>
                            {timeAgo}
                        </Text>
                    </Text>
                    <Icon Svg={tripleDot} clickable onClick={onActionClick} />
                    {actionsShown && (
                        <CommentController onClose={onActionClick} />
                    )}
                </HStack>

                <Text Tag='p' className='comment-text'>
                    {commentText}
                </Text>

                <HStack className='comment-feedback'>
                    <RateButtons id={id} likes={likeAmount} />
                    <Button variant='ghost' size='s' onClick={toggleReplyInput}>
                        Reply
                    </Button>
                </HStack>
                {replyInputShown && (
                    <CommentInput
                        inputData={inputData}
                        setInputData={setInputData}
                        onSubmit={onSubmit}
                        onClose={toggleReplyInput}
                    />
                )}
            </VStack>
        </HStack>
    )
}

export default CommentEl
