import { Category, Status, SubCategory } from 'entities/contest'
import { Currency, Prize, PrizeType } from 'entities/prize'

export interface PrizeData extends Omit<Prize, 'prizeType' | 'currency'> {
    prizeType: '' | PrizeType
    currency: Currency
}

export interface ContestCreationRequestBody {
    name: string
    status: Status
    category: Category
    subcategory: SubCategory | ''
    backgroundImage: string
    previewImage: string
    selectionType: 'RANDOM' | 'VIEWER_VOTING' | 'CREATOR_DECISION'
    maxAllowedParticipantAmount: number
    dateStart: string
    dateEnd: string
    description: string
    exampleMedia: string[]
    prizes: PrizeData[]
    contestOpen: boolean
    contestOwnerId: string
}

export type ContestCreationFormData = Omit<
    ContestCreationRequestBody,
    'contestOwnerId'
>
