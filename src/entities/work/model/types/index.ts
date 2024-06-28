import { User } from 'entities/user'
import { PageEntityDTO } from 'shared/lib/types'

export interface Media {
    id: string
    ownerId: string
    mediaLink: string
}

type WorkType = 'TEXT' | 'IMAGE' | 'VIDEO'

export interface Work {
    id: string
    ownerId: string
    description: string
    media: Media[] | null
    likeAmount: number
    commentAmount: number
    user: User
    typeWork: WorkType | string
    popularity: number
    workAddingDate: string
}

export interface WorksResponse extends PageEntityDTO {
    content: Work[]
}
