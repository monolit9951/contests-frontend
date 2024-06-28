import { Work } from 'entities/work'

export interface WorksState {
    works: Work[]
    loading: boolean
    error: string | null
    page: number
    hasMore: boolean
}
