import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import clsx from 'clsx'
import { Comment } from 'entities/comment'
import instance from 'shared/api/api'
import useOnScreen from 'shared/lib/hooks/useOnScreen'

import CommentItem from './commentItem'

import './commentsList.scss'

interface Props {
    ownerId: string
    userId: string
    comments: Comment[]
    setComments: Dispatch<SetStateAction<Comment[]>>
    setTotalElements: (num: number) => void
    nextLoading: boolean
    setNextLoading: Dispatch<SetStateAction<boolean>>
    error: Error | null
    setError: Dispatch<SetStateAction<Error | null>>
    className?: string
}

const CommentsList: React.FC<Props> = (props) => {
    const {
        ownerId,
        userId,
        comments,
        setComments,
        setTotalElements,
        nextLoading,
        setNextLoading,
        error,
        setError,
        className,
    } = props

    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const params = `pageSize=8&sortDirection=DESC&parentId=${ownerId}`

    const { isIntersecting, measureRef, observer } = useOnScreen({
        threshold: 0.8,
    })

    useEffect(() => {
        const fetchComments = async () => {
            try {
                setError(null)
                setLoading(true)

                const { data } = await instance.get(`comment?page=0&${params}`)

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

    return (
        <ul className={clsx(className)}>
            {loading && <p>Loading comments...</p>}

            {error && <p>{error.message}</p>}

            {comments.map((item, idx) => {
                if (idx === comments.length - 1) {
                    return (
                        <CommentItem
                            key={item.id}
                            ref={measureRef}
                            userId={userId}
                            data={item}
                        />
                    )
                }
                return <CommentItem key={item.id} userId={userId} data={item} />
            })}

            {nextLoading && <p>Loading next...</p>}
        </ul>
    )
}

export default CommentsList
