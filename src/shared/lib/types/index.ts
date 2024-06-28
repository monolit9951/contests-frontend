export interface SortObject {
    sorted: boolean
    empty: boolean
    unsorted: boolean
}

export interface PageableObject {
    pageNumber: number
    pageSize: number
    sort: SortObject
    offset: number
    paged: boolean
    unpaged: boolean
}

export interface PageEntityDTO {
    totalElements: number
    totalPages: number
    pageable: PageableObject
    first: boolean
    last: boolean
    size: number
    number: number
    sort: SortObject
    numberOfElements: number
    empty: boolean
}
