import { Category } from 'entities/contest'

type StatusFilter =
    | ''
    | 'Active'
    | 'Inactive'
    | 'Paused'
    | 'Finished'
    | 'Upcoming'

type PrizeTypeFilter = '' | 'Money prize' | 'Coins prize'

type CreatorsFilter = '' | 'Blogger' | 'Store' | 'Company' | 'User'

export interface FilterItem {
    name: string
    number: number
    apiKey: string
}

export interface FilterObject {
    name: string
    items: FilterItem[]
}

export interface FilterPayloadObj {
    filterName: string
    name: string
    apiKey: string
}

export interface FilterData {
    status: FilterObject
    prizeType: FilterObject
    creators: FilterObject
}

export interface FiltersObj {
    filtersList: FilterPayloadObj[]
    status: StatusFilter
    prizeType: PrizeTypeFilter
    prizeRange: number[]
    creators: CreatorsFilter
}

export interface FilterSchema {
    selected: FiltersObj
    active: FiltersObj

    category: Category
    sortDirection: 'ASC' | 'DESC'

    loading: boolean
    error: string | null
}
