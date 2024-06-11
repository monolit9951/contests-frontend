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
