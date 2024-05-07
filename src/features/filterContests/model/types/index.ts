export interface FilterItem {
    name: string
    number: number
}

export interface FilterObject {
    name: string
    items: FilterItem[]
}

export interface FilterData {
    status: FilterObject
    prize: FilterObject
    participants: FilterObject
    creators: FilterObject
}

export interface FiltersObj {
    selected: string[]
    active: string[]
}

export interface FilterSchema {
    filters: FiltersObj
    prizeRange: number[]
    loading: boolean
    error: string | null
}
