import { FC, useEffect } from 'react'
import clsx from 'clsx'
import { Comment } from 'entities/comment'
import {
    selectContestComments,
    selectContestOwnerId,
} from 'pages/contestPage/model/selectors'
import { fetchNextContestComments } from 'pages/contestPage/model/services/fetchContestComments'
import useOnScreen from 'shared/lib/hooks/useOnScreen'
import { useAppDispatch, useAppSelector } from 'shared/lib/store'

import CommentItem from './commentItem'

import './commentsList.scss'

interface Props {
    className?: string
}

const CommentsList: FC<Props> = (props) => {
    const { className } = props

    const dispatch = useAppDispatch()

    const ownerId = useAppSelector(selectContestOwnerId)
    const comments = useAppSelector(selectContestComments)

    const data = comments.content as Comment[]
    const { loading, nextLoading } = comments

    const { isIntersecting, measureRef, observer } = useOnScreen({
        threshold: 0.8,
    })

    useEffect(() => {
        if (
            loading ||
            nextLoading ||
            comments.totalPages === comments.page ||
            !comments.totalElements
        ) {
            return
        }
        if (isIntersecting && observer) {
            dispatch(fetchNextContestComments(ownerId))
            observer.disconnect()
        }
    }, [isIntersecting])

    return (
        <ul className={clsx(className)}>
            {loading && <p>Loading comments...</p>}

            {data.map((item, idx) => {
                if (idx === data.length - 1) {
                    return (
                        <CommentItem
                            key={item.id}
                            ref={measureRef}
                            data={item}
                        />
                    )
                }
                return <CommentItem key={item.id} data={item} />
            })}

            {nextLoading && <p>Loading next...</p>}
        </ul>
    )
}

export default CommentsList
