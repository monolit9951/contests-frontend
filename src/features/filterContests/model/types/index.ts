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
