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
    participants: {
        name: 'Number of participants',
        items: [
            { name: '1-1k', number: 201 },
            { name: '1.1k - 10k', number: 201 },
            { name: '10.1k-50k', number: 201 },
            { name: '50.1k-100k', number: 201 },
            { name: '100.1k+', number: 201 },
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

export const mockFilterDataTemp: FilterData = {
    status: {
        name: 'Status',
        items: [
            { name: 'Qualifying', number: 201 },
            { name: 'Completing the task', number: 201 },
            { name: 'Winner selection', number: 201 },
            { name: 'Closed', number: 201 },
        ],
    },
    prizeType: {
        name: 'Prize type',
        items: [
            { name: 'Money prize', number: 601 },
            { name: 'Item prize', number: 21 },
        ],
    },
    participants: {
        name: 'Number of participants',
        items: [
            { name: '1-1k', number: 201 },
            { name: '1.1k - 10k', number: 201 },
            { name: '10.1k-50k', number: 201 },
            { name: '50.1k-100k', number: 201 },
            { name: '100.1k+', number: 201 },
        ],
    },
    creators: {
        name: 'Creators of contest',
        items: [
            { name: 'Verified', number: 201 },
            { name: 'Unverified', number: 201 },
        ],
    },
}
