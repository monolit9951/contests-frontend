import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Comment } from 'entities/comment'
import instance from 'shared/api/api'
import { useAlert } from 'shared/lib/hooks/useAlert/useAlert'
import { Button } from 'shared/ui/button'
import { Input } from 'shared/ui/input'
import { HStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

// import { UserIcon } from 'shared/ui/userIcon'
import { CommentsList } from './commentsList'

import './commentsSection.scss'

interface Props {
    workId: string
    work?: boolean
    contest?: boolean
}

const СommentsSection = ({ workId, work, contest }: Props) => {
    const [commentInputFocused, setCommentInputFocused] = useState(false)
    const [inputData, setInputData] = useState('')

    const [userId, setUserId] = useState('')

    const [comments, setComments] = useState<Comment[]>([])
    const [totalElements, setTotalElements] = useState(0)
    const [nextLoading, setNextLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    const token = localStorage.getItem('userToken')
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const {showAlert, Alert} = useAlert()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await instance.get(
                    'users?page=0&pageSize=1&sortDirection=ASC',
                    {headers}
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

  const user = useSelector((state: RootState) => state.user)

    const onSubmit = async () => {
        if (!inputData.trim()) {
            showAlert('Comment empty')
            return
        }

        // авторизация?
        if(user.userId === null){
            showAlert('You not authorized')
            setInputData('')
            toggleCommentInput()
            return
        }

        try {
            setError(null)
            setNextLoading(true)

            const { data } = await instance.post(
                'comment',
                {
                    parentId: workId,
                    commentType: contest ? "CONTEST" : "WORK",
                    commentText: inputData.trim(),
                    userId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // eslint-disable-next-line no-return-assign
            setTotalElements((prev) => (prev += 1))
            setComments((prev) => [data, ...prev])
        } catch (err) {
            // setError(err as Error)
            showAlert('ERROR', 'CHANGE THAT ERROR')
        } finally {
            setNextLoading(false)
        }

        toggleCommentInput()
    }

    // коллбек на изменение всех комментов при исключении одного из общего массива
    const handleCommentsDecreaseCallback = () => {
        setTotalElements(totalElements - 1)
    }
    
    return (
        <section className={`comments ${contest && 'conestComments'}`}>
            <Text
                Tag='h2'
                size={work ? 'l' : 'title'}
                bold
                className='comments__title'>
                Comments
                <Text Tag='span' size={work ? 'md' : 'xl'}> ({totalElements})</Text>
            </Text>

            {!work && (
                <HStack className='comments__input-wrapper-contest align__center'>
                    {/* <UserIcon size={40} wrapperClassName='align__start' src = {user.userProfileImg}/> */}
                    <HStack className='comments__input-box'>
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
                    </HStack>
                </HStack>
            )}

            <CommentsList workId={workId}
                // userId={userId}
                comments={comments}
                setComments={setComments}
                setTotalElements={setTotalElements}
                nextLoading={nextLoading}
                setNextLoading={setNextLoading}
                error={error}
                setError={setError}
                className='comments__list'
                handleCommentsDecreaseCallback = {handleCommentsDecreaseCallback}
            />

            {work && (
                <HStack className='comments__input-wrapper-work align__center'>
                    {/* <UserIcon size={40} src={user.userProfileImg}/> */}
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

            <Alert />
        </section>
    )
}

export default СommentsSection
