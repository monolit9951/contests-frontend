import { FilterData } from 'features/filterContests'

export const mockFilterData: FilterData = {
    status: {
        name: 'Status',
        items: [
            { name: 'Active', number: 0 },
            { name: 'Inactive', number: 0 },
            { name: 'Paused', number: 0 },
            { name: 'Finished', number: 0 },
            { name: 'Upcoming', number: 0 },
        ],
    },
    prizeType: {
        name: 'Prize type',
        items: [
            { name: 'Money prize', number: 0 },
            { name: 'Item prize', number: 0 },
        ],
    },
    creators: {
        name: 'Creators of contest',
        items: [
            { name: 'Blogger', number: 0 },
            { name: 'Store', number: 0 },
            { name: 'Company', number: 0 },
        ],
    },
}
