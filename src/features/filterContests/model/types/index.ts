type StatusFilter =
    | ''
    | 'Active'
    | 'Inactive'
    | 'Paused'
    | 'Finished'
    | 'Upcoming'

type PrizeTypeFilter = '' | 'Money prize' | 'Item prize'

export type ParticipantsFilter =
    | ''
    | '1-1k'
    | '1.1k-10k'
    | '10.1k-50k'
    | '50.1k-100k'
    | '100.1k+'

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
    participants: FilterObject
    creators: FilterObject
}

export interface FiltersObj {
    filtersList: FilterPayloadObj[]
    status: StatusFilter
    prizeType: PrizeTypeFilter
    prizeRange: number[]
    participants: ParticipantsFilter
    creators: CreatorsFilter
}

export interface FilterSchema {
    selected: FiltersObj
    active: FiltersObj

    sortDirection: 'ASC' | 'DESC'

    loading: boolean
    error: string | null
}
