import { Work } from 'entities/work'

export interface ContestWorksSchema {
    ownerId: string
    media: {
        new: Work[]
        popular: Work[]

        page: number

        totalPages: number
        totalElements: number

        loading: boolean
        nextLoading: boolean
        error: string | null
    }
    text: {
        new: Work[]
        popular: Work[]

        page: number

        totalPages: number
        totalElements: number

        loading: boolean
        nextLoading: boolean
        error: string | null
    }
}
