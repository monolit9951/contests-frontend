import { ContestPreview } from 'entities/contest'

export interface ContestsPageSchema {
    searchString: string

    popular: {
        contests: ContestPreview[]

        loading: boolean
        error: null | string
    }

    all: {
        contests: ContestPreview[]

        page: number
        pageSize: number

        totalPages: number
        totalElements: number

        loading: boolean
        nextLoading: boolean
        error: null | string
    }
}
