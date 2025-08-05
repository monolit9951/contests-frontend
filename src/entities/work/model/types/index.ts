import { User } from 'entities/user'
import { PageEntityDTO } from 'shared/lib/types'

type WorkType = 'TEXT' | 'IMAGE' | 'VIDEO'

export interface Media {
    id: string
    mediaLink: string
    typeMedia: WorkType | string
    contestId: string
    userId: string
    workId: string
}


export interface Work {
    id: string
    ownerId: string
    description: string
    media: Media[] | null
    likeAmount: number
    dislikeAmount: number
    commentAmount: number
    user: User
    typeWork: WorkType | string
    popularity: number
    workAddingDate: string
    possibleWinner: boolean
    userLike: null | string
}

export interface WorksResponse extends PageEntityDTO {
    content: Work[]
}
