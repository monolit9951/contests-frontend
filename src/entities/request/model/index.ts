export interface PagedRequest<T> {
    contest: T
    pageable: any
    last: boolean
    totalElements: number
    totalPages: number
    first: boolean
    size: number
    number: number
    sort?: any
    numberOfElements: number
    empty: boolean
}