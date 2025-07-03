import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'
import moment from 'moment'
import instance from 'shared/api/api'
import tripleDot from 'shared/assets/icons/tripleDot.svg?react'
import { Button } from 'shared/ui/button'
import { Icon } from 'shared/ui/icon'
import { Input } from 'shared/ui/input'
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
    handleDeleteMainCommentCallback: (commentId: string) => void
    handleDeleteSubCommentCallback: (commentId: string) => void
    isMain?: boolean
    parentId: string
}

const CommentEl: FC<Props> = (props) => {
    const {
        data,
        userId,
        handleNewSubCommentCallback,
        seepliesShown,
        setRepliesNum,
        setTotalPages,
        setSubComments,
        setNextLoading,
        setError,
        handleDeleteMainCommentCallback,
        isMain,
        handleDeleteSubCommentCallback,
        parentId
    } = props

    // console.log(isMain, parentId)
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
        if (!inputData.trim()) {
            setInputData('')
            return
        }

        try {
            setError(null)
            setNextLoading(true)


            const response = await instance.post('comment', {
                parentId,
                commentText: inputData.trim(),
                commentType: "COMMENT"
            })
        

            // мы не получаем в респонс все комменты, только последний 
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

    // удаление коммента
    const handleDeleteCommentCallback = async () => {
        await instance.delete(`comment/${data.id}`)
        // handleNewSubCommentCallback()
        console.log(data)

        // если у коммента есть воркайди, то он первого уровня, потому удаление другое
        if (isMain){
            handleDeleteMainCommentCallback(data.id)
        } else {
            handleDeleteSubCommentCallback(data.id)
        }
    }

    // РЕДАКТИРОВАНИЕ КОММЕНТАРИЯ
    const [edit, setEdit] = useState<boolean>(false)
    const [newCommentText, setNewCommentText] = useState<string>(commentText)

    // отловить появление редактора
    const handleSetEditCallback = () => {
        setEdit(true)
    }

    // отловить инпут редактирования
    const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewCommentText(event.target.value)
    }

    // редактирование коммента
    const handleEditSubmit = async () => {
        await instance.put(`comment/${data.id}`, {commentText: newCommentText})
        setEdit(false)
    }

    // console.log(data)

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
                        <CommentController onClose={onActionClick} handleDeleteCommentCallback={handleDeleteCommentCallback} handleSetEditCallback={handleSetEditCallback}/>
                    )}
                </HStack>

                {!edit?
                    <Text Tag='p' className='comment-text'>
                        {newCommentText}
                    </Text>
                    :
                    <div className="comment_edit">
                        <Input type='text' value={newCommentText} placeholder='Edit a comment...' onChange={handleCommentChange}/>
                        <Button variant='ghost' size='s' onClick={handleEditSubmit}>
                            Edit
                        </Button>
                    </div>
                }

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
