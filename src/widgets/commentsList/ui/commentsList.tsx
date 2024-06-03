import { FC } from 'react'
import clsx from 'clsx'
import { Comment } from 'entities/comment'

import CommentItem from './commentItem'

import './commentsList.scss'

interface Props {
    data?: Comment[]
    className?: string
}

const CommentsList: FC<Props> = (props) => {
    const { data, className } = props

    return (
        <ul className={clsx(className)}>
            {data?.map((item) => <CommentItem data={item} />)}
            <CommentItem />
            <CommentItem />
        </ul>
    )
}

export default CommentsList
