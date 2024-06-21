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
                id: '66719562a4c747380eecc655',
                prizeType: 'ITEM',
                winnersAmount: 4,
                currency: null,
                prizeText: 'Playstation 5',
                prizeAmount: 1,
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
                id: '66719562a4c747380eecc659',
                prizeType: 'MONEY',
                winnersAmount: 2,
                currency: 'USD',
                prizeText: 'Win your money! Good luck!',
                prizeAmount: 1500,
            },
            {
                id: '66719562a4c747380eecc65a',
                prizeType: 'ITEM',
                winnersAmount: 1,
                currency: null,
                prizeText: 'Monitor Gigabyte 34',
                prizeAmount: 1,
            },
            {
                id: '66719562a4c747380eecc657',
                prizeType: 'ITEM',
                winnersAmount: 2,
                currency: null,
                prizeText: 'Xiaomi TV full HD',
                prizeAmount: 1,
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
                id: '66719562a4c747380eecc608',
                prizeType: 'MONEY',
                winnersAmount: 4,
                currency: 'USD',
                prizeText: 'Win your money! Good luck!',
                prizeAmount: 1500,
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
                id: '66719562a4c747380eecc709',
                prizeType: 'MONEY',
                winnersAmount: 4,
                currency: 'USD',
                prizeText: 'Win your money! Good luck!',
                prizeAmount: 1500,
            },
            {
                id: '66719562a4c747380eecc609',
                prizeType: 'MONEY',
                winnersAmount: 4,
                currency: 'USD',
                prizeText: 'Win your money! Good luck!',
                prizeAmount: 800,
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
