import { useEffect, useState } from 'react'
import { Comment } from 'entities/comment'
import instance from 'shared/api/api'
import { Button } from 'shared/ui/button'
import { Input } from 'shared/ui/input'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'
import { UserIcon } from 'shared/ui/userIcon'

import { CommentsList } from './commentsList'

import './commentsSection.scss'

interface Props {
    workId: string
    work?: boolean
}

const СommentsSection = ({ workId, work }: Props) => {
    const [commentInputFocused, setCommentInputFocused] = useState(false)
    const [inputData, setInputData] = useState('')

    const [userId, setUserId] = useState('')

    const [comments, setComments] = useState<Comment[]>([])
    const [totalElements, setTotalElements] = useState(0)
    const [nextLoading, setNextLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)



    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await instance.get(
                    'users?page=0&pageSize=1&sortDirection=ASC'
                )

                setUserId(data.content[0].id)
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error(err)
            }
        }

        fetchUser()
    }, [])

    const toggleCommentInput = () => {
        setCommentInputFocused(false)
        setInputData('')
    }

    const onSubmit = async () => {
        if (!inputData.trim()) {
            return
        }

        try {
            setError(null)
            setNextLoading(true)

                        console.log({                parentId: workId,
                workId: workId,
                commentText: inputData.trim(),
                userId,})

            
            const { data } = await instance.post('comment', {
                parentId: workId,
                workId: workId,
                commentText: inputData.trim(),
                userId,
            })

            // eslint-disable-next-line no-return-assign
            setTotalElements((prev) => (prev += 1))
            setComments((prev) => [data, ...prev])
            console.log(comments)
        } catch (err) {
            setError(err as Error)
        } finally {
            setNextLoading(false)
        }

        toggleCommentInput()
    }

    return (
        <section className='comments'>
            <Text
                Tag='h2'
                size={work ? 'l' : 'title'}
                bold
                className='comments__title'>
                Comments
                <Text Tag='span' size={work ? 'md' : 'xl'}>
                    ({totalElements})
                </Text>
            </Text>

            {!work && (
                <HStack className='comments__input-wrapper-contest'>
                    <UserIcon size={40} wrapperClassName='align__start' />
                    <VStack className='comments__input-box'>
                        <Input
                            name='comment'
                            type='text'
                            value={inputData}
                            autoComplete='off'
                            onFocus={() => setCommentInputFocused(true)}
                            onChange={(e) => setInputData(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    onSubmit()
                                }
                            }}
                            placeholder='Add a comment...'
                            className='comments__input'
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
                                    disabled={!inputData.trim()}
                                    onClick={onSubmit}>
                                    Reply
                                </Button>
                            </HStack>
                        )}
                    </VStack>
                </HStack>
            )}

            {work && (
                <HStack className='comments__input-wrapper-work align__center'>
                    <UserIcon size={40} />
                    <Input
                        name='comment'
                        type='text'
                        value={inputData}
                        autoComplete='off'
                        onFocus={() => setCommentInputFocused(true)}
                        onChange={(e) => setInputData(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onSubmit()
                            }
                        }}
                        placeholder='Add a comment...'
                        className='comments__input'
                    />
                    <Button
                        variant='ghost'
                        size='m'
                        disabled={!inputData.trim()}
                        onClick={onSubmit}>
                        Reply
                    </Button>
                </HStack>
            )}

            <CommentsList
                workId={workId}
                userId={userId} // TODO delete upon integrating login feature
                comments={comments}
                setComments={setComments}
                setTotalElements={setTotalElements}
                nextLoading={nextLoading}
                setNextLoading={setNextLoading}
                error={error}
                setError={setError}
                className='comments__list'
            />
        </section>
    )
}

export default СommentsSection
