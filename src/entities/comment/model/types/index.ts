import { User } from 'entities/user'

export interface Comment {
    id: string
    parentId: string
    commentText: string
    likeAmount: number
    commentDate: number[]
    user: User
}
