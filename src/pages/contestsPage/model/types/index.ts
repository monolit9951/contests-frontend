import { ContestPreview } from 'entities/contest'

export interface ContestsPageSchema {
    popular: {
        contests: ContestPreview[]

        loading: boolean
        error: null | string
    }

    all: {
        contests: ContestPreview[]

        page: number
        pageSize: number
        sortDirection: 'ASC' | 'DESC'

        totalPages: number
        totalElements: number

        loading: boolean
        nextLoading: boolean
        error: null | string
    }
}
