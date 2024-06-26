import { Media } from 'entities/media'
import { User } from 'entities/user'

type WorkType = 'TEXT' | 'IMAGE' | 'VIDEO'

export interface Work {
    id: string
    ownerId: string
    description: string
    media: Media[] | null
    likeAmount: number
    commentAmount: number
    user: User
    typeWork: WorkType
    popularity: number
    workAddingDate: string
}
