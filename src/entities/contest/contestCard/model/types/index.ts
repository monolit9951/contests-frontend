export interface ContestData {
    date?: string
    name?: string
    isVerified?: boolean
    rating?: string
    category: string | null
    prize?: {
        img: string
        description: string
    } | null
    title?: string
    tags?: string
}

export interface ContestState {
    data: ContestData[] | null
    loading: boolean
    error: string | null
}
