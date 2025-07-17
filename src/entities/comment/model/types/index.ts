import { User } from 'entities/user'
import { PageEntityDTO } from 'shared/lib/types'

export interface Comment {
    id: string
    parentId: string
    commentText: string
    subCommentsAmount?: number
    // eslint-disable-next-line no-use-before-define
    subComments?: PagedComments | null
    likes: {like: number, userLike: null | "LIKE" | "DISLIKE"}
    commentDate: number[]
    user: User
}

export interface PagedComments extends PageEntityDTO {
    content: Comment[]
}

export interface CommentRequestBody {
    parentId: string
    commentText: string
    userId: string
}
