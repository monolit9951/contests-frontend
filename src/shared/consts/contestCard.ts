import { ContestPreview } from 'entities/contest'

const mockData: ContestPreview[] = [
    {
        id: '66671524e15b363b51c0f605',
        name: 'Acting Talent Search',
        status: 'FINISHED',
        category: 'FOR_FUN',
        subcategory: 'SUBCATEGORY3',
        previewImage:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWSBHNgVvunK8y34PnF5DyhC562sSmNDOGMw&s',
        participantAmount: 2,
        maxAllowedParticipantAmount: 135,
        dateStart: '2024-02-16T13:54',
        dateEnd: '2024-02-29T03:07',
        prizesPreviews: [
            {
                id: '66671514e15b363b51c0f10c',
                prizeType: 'ITEM',
                winnersAmount: 2,
                currency: 'PLN',
                prizeAmount: 59.2,
            },
        ],
        popularity: 321,
        contestOwner: {
            id: '66671512e15b363b51c0ed70',
            name: 'Oliver Martin',
            organizerRating: 3.32,
            verificationStatus: 'STORE',
            profileImage:
                'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1776',
        },
    },
    {
        id: '6667151be15b363b51c0f5b2',
        name: 'Acting Talent Search',
        status: 'UPCOMING',
        category: 'FOR_WORK',
        subcategory: 'SUBCATEGORY2',
        previewImage:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWSBHNgVvunK8y34PnF5DyhC562sSmNDOGMw&s',
        participantAmount: 2,
        maxAllowedParticipantAmount: 200,
        dateStart: '2024-10-22T17:48',
        dateEnd: '2024-10-28T02:52',
        prizesPreviews: [
            {
                id: '66671514e15b363b51c0f001',
                prizeType: 'ITEM',
                winnersAmount: 1,
                currency: 'EUR',
                prizeAmount: 24.55,
            },
            {
                id: '66671514e15b363b51c0f002',
                prizeType: 'MONEY',
                winnersAmount: 1,
                currency: 'PLN',
                prizeAmount: 79.89,
            },
            {
                id: '66671514e15b363b51c0f003',
                prizeType: 'ITEM',
                winnersAmount: 4,
                currency: 'PLN',
                prizeAmount: 4.56,
            },
        ],
        popularity: 871,
        contestOwner: {
            id: '66671513e15b363b51c0eed8',
            name: 'Emma Taylor',
            organizerRating: 6.09,
            verificationStatus: 'BLOGGER',
            profileImage:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
        },
    },
    {
        id: '66671528e15b363b51c0f61b',
        name: 'Acting Talent Search',
        status: 'UPCOMING',
        category: 'FOR_FUN',
        subcategory: 'SUBCATEGORY3',
        previewImage:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJeTaOFQT3RLnt6Isqrh_GZsbG3VBr6wUEn-Csa1wzMpYqH8YxJWPuqtry4-YuS5tt4g0&usqp=CAU',
        participantAmount: 0,
        maxAllowedParticipantAmount: 123,
        dateStart: '2024-09-02T16:42',
        dateEnd: '2024-09-04T06:36',
        prizesPreviews: [
            {
                id: '66671514e15b363b51c0f14f',
                prizeType: 'MONEY',
                winnersAmount: 3,
                currency: 'EUR',
                prizeAmount: 53.05,
            },
        ],
        popularity: 87,
        contestOwner: {
            id: '66671513e15b363b51c0ee02',
            name: 'John Jones',
            organizerRating: 6.48,
            verificationStatus: 'BLOGGER',
            profileImage:
                'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1776',
        },
    },
    {
        id: '66671529e15b363b51c0f63b',
        name: 'Acting Talent Search',
        status: 'UPCOMING',
        category: 'FOR_FUN',
        subcategory: 'SUBCATEGORY2',
        previewImage:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWSBHNgVvunK8y34PnF5DyhC562sSmNDOGMw&s',
        participantAmount: 1,
        maxAllowedParticipantAmount: 147,
        dateStart: '2024-12-04T17:02',
        dateEnd: '2024-12-11T08:13',
        prizesPreviews: [
            {
                id: '66671514e15b363b51c0f1b2',
                prizeType: 'MONEY',
                winnersAmount: 3,
                currency: 'EUR',
                prizeAmount: 73.42,
            },
            {
                id: '66671514e15b363b51c0f1b3',
                prizeType: 'ITEM',
                winnersAmount: 4,
                currency: 'EUR',
                prizeAmount: 48.2,
            },
        ],
        popularity: 277,
        contestOwner: {
            id: '66671513e15b363b51c0ede0',
            name: 'Michael Thompson',
            organizerRating: 5.01,
            verificationStatus: 'BLOGGER',
            profileImage:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
        },
    },
]

export default mockData
