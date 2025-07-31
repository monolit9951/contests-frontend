import { FilterData } from 'features/filterContests'

export const mockFilterData: FilterData = {
    status: {
        name: 'Status',
        items: [
            { name: 'Active', number: 0, apiKey: 'Active' },
            // { name: 'Inactive', number: 0 },
            // { name: 'Paused', number: 0 },
            { name: 'Finished', number: 0, apiKey: 'Finished' },
            { name: 'Upcoming', number: 0, apiKey: 'Upcoming'  },
            { name: 'Choise winner', number: 0, apiKey: 'CHOICE_WINNER'  },
        ],
    },
    prizeType: {
        name: 'Prize type',
        items: [
            { name: 'Money prize', number: 0, apiKey: 'MONEY' },
            { name: 'Coins prize', number: 0 , apiKey: 'COINS'},
        ],
    },
    creators: {
        name: 'Creators of contest',
        items: [
            { name: 'Blogger', number: 0, apiKey: 'Blogger' },
            { name: 'Store', number: 0, apiKey: 'Store' },
            { name: 'Company', number: 0, apiKey: 'Company' },
            { name: 'User', number: 0, apiKey: 'User'}
        ],
    },
}
