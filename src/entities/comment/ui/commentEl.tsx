import { ChangeEvent, FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import instance from 'shared/api/api'
import tripleDot from 'shared/assets/icons/tripleDot.svg?react'
import { useAlert } from 'shared/lib/hooks/useAlert/useAlert'
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
    setNextLoading: (bool: boolean) => void
    setError: (err: Error | null) => void
    handleNewSubCommentCallback: () => void
    handleDeleteMainCommentCallback?: (commentId: string) => void
    handleDeleteSubCommentCallback?: (commentId: string) => void
    isMain?: boolean
    parentId: string
}

const CommentEl: FC<Props> = (props) => {
    const {
        data,
        handleNewSubCommentCallback,
        setNextLoading,
        setError,
        handleDeleteMainCommentCallback,
        isMain,
        handleDeleteSubCommentCallback,
        parentId
    } = props

    

    const [actionsShown, setActionsShown] = useState(false)
    const [replyInputShown, setReplyInputShown] = useState(false)
    const [inputData, setInputData] = useState('')
    const token = localStorage.getItem('userToken')
    const { user, commentDate, commentText, id } = data
    const loginedUser = useSelector((state: RootState) => state.user)
    const formatted = moment(commentDate).format("YYYY/MM/DD HH:mm");


    const onActionClick = () => {
        setActionsShown(!actionsShown)
    }

    const toggleReplyInput = () => {
        setReplyInputShown(!replyInputShown)
        setInputData('')
    }

  const userAuth = useSelector((state: RootState) => state.user)

    const {showAlert, Alert} = useAlert()

    const onSubmit = async () => {
        if (!inputData.trim()) {
            setInputData('')
            return
        }

        if(userAuth.userId === null){
            showAlert("You not authorized")
            setInputData('')
            toggleReplyInput()
            return
        }

        try {
            setError(null)
            setNextLoading(true)
            await instance.post('comment', {
                parentId,
                commentText: inputData.trim(),
                commentType: "COMMENT"
            },{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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
            // setError(err as Error)
            showAlert('ERROR', 'CHANGE THAT ERROR')
        } finally {
            setNextLoading(false)
            toggleReplyInput()
        }
    }

    // удаление коммента
    const handleDeleteCommentCallback = async () => {
        await instance.delete(`comment/${data.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        // handleNewSubCommentCallback()

        // если у коммента есть воркайди, то он первого уровня, потому удаление другое
        if (isMain){
            handleDeleteMainCommentCallback?.(data.id)
        } else {
            handleDeleteSubCommentCallback?.(data.id)
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
        await instance.put(`comment/${data.id}`, {commentText: newCommentText}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        setEdit(false)
    }

    return (
        <HStack className='comment__wrapper'>

            <Link to={loginedUser.userId === user.id? '/profile' : `/profile/${user.id}`}><UserIcon src={user.profileImage} size={40} /></Link>
            <VStack className='comment__body'>
                <HStack className='comment-info'>
                    <Link to={`/profile/${user.id}`}>
                        <Text Tag='p' bold>
                            {user.name}
                            <Text Tag='span' size='sm'>
                                {formatted}
                            </Text>
                        </Text>
                    </Link>
                    <Icon Svg={tripleDot} clickable onClick={onActionClick} />
                    {actionsShown && (
                        <CommentController onControllerClose={onActionClick} handleDeleteCommentCallback={handleDeleteCommentCallback} handleSetEditCallback={handleSetEditCallback} commentId={data.id}/>
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
                            Save
                        </Button>
                    </div>
                }

                <HStack className='comment-feedback'>
                    <RateButtons id={id} likes={data.likes.like} userLike={data.likes.userLike}/>
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
            <Alert />
        </HStack>
    )
}

export default CommentEl
