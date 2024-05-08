import { FilterData } from './types'

export const mockFilterData: FilterData = {
    status: {
        name: 'Status',
        items: [
            { name: 'Qualifying', number: 201 },
            { name: 'Completing the task', number: 201 },
            { name: 'Winner selection', number: 201 },
            { name: 'Closed', number: 201 },
        ],
    },
    prize: {
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
