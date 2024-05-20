export type Category = 'CATEGORY1' | 'CATEGORY2' | 'CATEGORY3'

type StatusFilter =
    | ''
    | 'Active'
    | 'Inactive'
    | 'Paused'
    | 'Finished'
    | 'Upcoming'

type PrizeTypeFilter = '' | 'Money prize' | 'Item prize'

type CreatorsFilter = '' | 'Blogger' | 'Store' | 'Company'

export interface FilterItem {
    name: string
    number: number
}

export interface FilterObject {
    name: string
    items: FilterItem[]
}

export interface FilterPayloadObj {
    filterName: string
    name: string
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
