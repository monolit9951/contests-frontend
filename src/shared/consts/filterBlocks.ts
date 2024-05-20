import { FilterData } from 'features/filterContests'

export const mockFilterData: FilterData = {
    status: {
        name: 'Status',
        items: [
            { name: 'Active', number: 201 },
            { name: 'Inactive', number: 201 },
            { name: 'Paused', number: 201 },
            { name: 'Finished', number: 201 },
            { name: 'Upcoming', number: 201 },
        ],
    },
    prizeType: {
        name: 'Prize type',
        items: [
            { name: 'Money prize', number: 601 },
            { name: 'Item prize', number: 21 },
        ],
    },
    creators: {
        name: 'Creators of contest',
        items: [
            { name: 'Blogger', number: 201 },
            { name: 'Store', number: 201 },
            { name: 'Company', number: 201 },
        ],
    },
}
