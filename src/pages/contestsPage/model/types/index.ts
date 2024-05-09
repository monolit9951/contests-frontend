import { Contest } from 'entities/contest'

export interface ContestsPageSchema {
    contests: {
        popular: Contest[]
        all: Contest[]
    }
    pageSize: number
    sortDirection: 'ASC' | 'DESC'
    loading: boolean
    error: null | string
}
