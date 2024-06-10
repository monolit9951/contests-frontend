import { useEffect, useState } from 'react'
import { selectContestComments } from 'pages/contestPage/model/selectors'
import { createContestComment } from 'pages/contestPage/model/services/createContestComment'
import { fetchContestComments } from 'pages/contestPage/model/services/fetchContestComments'
import { useAppDispatch, useAppSelector } from 'shared/lib/store'
import { Button } from 'shared/ui/button'
import { Input } from 'shared/ui/input'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'
import { UserIcon } from 'shared/ui/userIcon'
import { CommentsList } from 'widgets/commentsList'

import './commentsSection.scss'

interface Props {
    ownerId: string
}

const СommentsSection = ({ ownerId }: Props) => {
    const [commentInputFocused, setCommentInputFocused] = useState(false)
    const [inputData, setInputData] = useState('')

    const dispatch = useAppDispatch()

    const commentData = useAppSelector(selectContestComments)

    useEffect(() => {
        dispatch(fetchContestComments(ownerId))
    }, [dispatch])

    const toggleCommentInput = () => {
        setCommentInputFocused(false)
        setInputData('')
    }

    const onSubmit = () => {
        if (!inputData.trim()) {
            return
        }

        dispatch(
            createContestComment({
                parentId: ownerId,
                commentText: inputData.trim(),
                userId: '123456879',
            })
        )

        toggleCommentInput()
    }

    return (
        <section className='participants-comments'>
            <Text
                Tag='h2'
                size='title'
                bold
                className='participants-comments__title'>
                Comments
                <Text Tag='span' size='xl'>
                    ({commentData.totalElements})
                </Text>
            </Text>

            <HStack className='participants-comments__input-wrapper'>
                <UserIcon size={40} className='align__start' />
                <VStack className='participants-comments__input-box'>
                    <Input
                        type='text'
                        placeholder='Add a comment...'
                        wrapperClassName='participants-comments__input'
                        value={inputData}
                        onFocus={() => setCommentInputFocused(true)}
                        onChange={(e) => setInputData(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onSubmit()
                            }
                        }}
                    />
                    {commentInputFocused && (
                        <HStack className='justify__end'>
                            <Button
                                variant='ghost'
                                size='s'
                                onClick={toggleCommentInput}>
                                Cancel
                            </Button>
                            <Button
                                variant='secondary'
                                size='s'
                                onClick={onSubmit}>
                                Reply
                            </Button>
                        </HStack>
                    )}
                </VStack>
            </HStack>

            <CommentsList className='participants-comments__list' />
        </section>
    )
}

export default СommentsSection
