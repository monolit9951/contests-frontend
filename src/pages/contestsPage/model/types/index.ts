import { Contest } from 'entities/contest'

export interface ContestsPageSchema {
    contests: {
        popular: Contest[]
        all: Contest[]
    }
    page: number
    pageSize: number
    sortDirection: 'ASC' | 'DESC'

    totalPages: number
    totalElements: number

    loading: boolean
    error: null | string
}
