import { Dispatch, FC, SetStateAction, useState } from 'react'
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
    setSubComments: Dispatch<SetStateAction<Comment[]>>
    setNextLoading: (bool: boolean) => void
    setError: (err: Error) => void
}

const CommentEl: FC<Props> = (props) => {
    const { data, setSubComments, setNextLoading, setError } = props

    const [actionsShown, setActionsShown] = useState(false)
    const [replyInputShown, setReplyInputShown] = useState(false)
    const [inputData, setInputData] = useState('')

    const { user, commentDate, commentText, id, likeAmount } = data

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
            setNextLoading(true)

            const response = await instance.post('comment/subComment', {
                parentId: data.id,
                commentText: inputData,
                userId: '66671513e15b363b51c0eef1',
            })

            setSubComments((prev) => [...prev, response.data])
        } catch (err) {
            setError(err as Error)
        } finally {
            setNextLoading(false)
            toggleReplyInput()
        }
    }

    return (
        <HStack className='comment__wrapper'>
            <UserIcon size={40} />
            <VStack className='comment__body'>
                <HStack className='comment-info'>
                    <Text Tag='p' bold>
                        {user.name ?? 'Deborah Kertzmann'}
                        <Text Tag='span' size='sm'>
                            {/*  TODO reformat date and implement time-ago component */}
                            {'1 d' ?? commentDate}
                        </Text>
                    </Text>
                    <Icon Svg={tripleDot} clickable onClick={onActionClick} />
                    {actionsShown && (
                        <CommentController onClose={onActionClick} />
                    )}
                </HStack>

                <Text Tag='p' className='comment-text'>
                    {commentText ??
                        'Welcome to the uproarious arena of the Tickle Olympics, where humor and athleticism collide in a whirlwind of laughter and lighthearted competition! Picture this: athletes from around the globe, each armed with a tickling strategy, vying for the coveted gold medal in the art of inducing laughter.'}
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
