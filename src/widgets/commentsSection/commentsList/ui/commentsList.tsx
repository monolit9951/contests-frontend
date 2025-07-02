import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import clsx from 'clsx'
import { Comment } from 'entities/comment'
import instance from 'shared/api/api'
import useOnScreen from 'shared/lib/hooks/useOnScreen'
import Spinner from 'shared/ui/spinner'
import { Text } from 'shared/ui/text'

import CommentItem from './commentItem'

import './commentsList.scss'

interface Props {
    workId: string
    userId: string
    comments: Comment[]
    setComments: Dispatch<SetStateAction<Comment[]>>
    setTotalElements: (num: number) => void
    nextLoading: boolean
    setNextLoading: Dispatch<SetStateAction<boolean>>
    error: Error | null
    setError: Dispatch<SetStateAction<Error | null>>
    className?: string
    handleCommentsDecreaseCallback: () => void
}

const CommentsList: React.FC<Props> = (props) => {
    const {
        workId,
        userId,
        comments,
        setComments,
        setTotalElements,
        nextLoading,
        setNextLoading,
        error,
        setError,
        className,
        handleCommentsDecreaseCallback
    } = props

    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const params = `pageSize=8&sortDirection=DESC&parentId=${workId}`

    const { isIntersecting, measureRef, observer } = useOnScreen({
        threshold: 0.8,
    })

    useEffect(() => {
        const fetchComments = async () => {
            try {
                setError(null)
                setLoading(true)
                // const { data } = await instance.get(`comment?page=0&${params}`)
                const { data } = await instance.get(`/comment?parentId=${workId}`)

                setComments(data.content)
                setTotalElements(data.totalElements)
                setTotalPages(data.totalPages)
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false)
            }
        }

        fetchComments()
        
    }, [])

    useEffect(() => {
        if (loading || nextLoading || totalPages <= page) {
            return
        }

        const fetchNextComments = async () => {
            try {
                setError(null)
                setNextLoading(true)

                const { data } = await instance.get(
                    `comment?page=${page}&${params}`
                )

                setComments((prev) => [...prev, ...data.content])
                // eslint-disable-next-line no-return-assign
                setPage((prev) => (prev += 1))
            } catch (err) {
                setError(err as Error)
            } finally {
                setNextLoading(false)
            }
        }

        if (isIntersecting && observer) {
            fetchNextComments()
            observer.disconnect()
        }
    }, [isIntersecting])

    if (loading) {
        return <Spinner />
    }

    if (error) {
        return (
            <Text Tag='p' bold size='xl'>
                Request error{`: ${error?.message}`}
            </Text>
        )
    }

    // вместо обновления всех комментов, мы будем дуалять его из общего массива по его айди
    const handleDeleteMainCommentCallback = (commentId: string) =>{
        setComments(prev => prev.filter(comment => comment.id !== commentId));
        handleCommentsDecreaseCallback()
    }


    return (
        <ul className={clsx(className)}>
            {loading && <Spinner center />}

            {comments.map((item, idx) => (
                <CommentItem
                    key={item.id}
                    ref={idx === comments.length - 1 ? measureRef : null}
                    userId={userId}
                    data={item}
                    handleDeleteMainCommentCallback = {handleDeleteMainCommentCallback}
                    isMain
                    parentId = {workId}
                />
            ))}

            {!loading && comments.length < 1 && (
                <Text
                    Tag='p'
                    bold
                    size='xl'
                    className='comments__error-message'>
                    No comments yet.
                </Text>
            )}

            {nextLoading && <Spinner />}
        </ul>
    )
}

export default CommentsList
