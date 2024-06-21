import { Comment } from 'entities/comment'
import { Prize } from 'entities/prize'
import { Work } from 'entities/work'

interface ContestWorksObj {
    new: Work[]
    popular: Work[]

    page: number

    totalPages: number
    totalElements: number

    loading: boolean
    nextLoading: boolean
    error: string | null
}

export interface ContestWorksSchema {
    ownerId: string
    userId: string

    prizes: Prize[]

    media: ContestWorksObj
    text: ContestWorksObj

    comments: {
        content: Comment[]

        page: number

        totalPages: number
        totalElements: number

        loading: boolean
        nextLoading: boolean
        error: string | null
    }
}
