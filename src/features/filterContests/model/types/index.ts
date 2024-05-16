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
    status: string
    prizeType: string
    prizeRange: number[]
    participants: string
    creators: string
}
export interface FiltersObjt {
    selected: string[]
    active: string[]
}

export interface FilterSchema {
    selected: FiltersObj
    active: FiltersObj

    loading: boolean
    error: string | null
}
export interface FilterSchemat {
    filters: FiltersObjt
    prizeRange: number[]

    loading: boolean
    error: string | null
}
