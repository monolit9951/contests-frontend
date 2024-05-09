import { PrizeStructure } from 'entities/prize'
import { User } from 'entities/user'

type Status = 'ACTIVE' | 'INACTIVE' | 'PAUSED'

type Category = 'CATEGORY1' | 'CATEGORY2' | 'CATEGORY3'

type SubCategory = 'SUBCATEGORY1' | 'SUBCATEGORY2' | 'SUBCATEGORY3'

// delete mock
export interface ContestData {
    date?: string
    name?: string
    isVerified?: boolean
    rating?: string
    category: string | null
    prize?: {
        img: string
        description: string
    } | null
    title?: string
    tags?: string
}

export interface Contest {
    id: string
    name: string
    status: Status
    category: Category
    subcategory: SubCategory
    backgroundImage: string
    participantAmount: number
    maxAllowedParticipantAmount: number
    dateStart: string
    dateEnd: string
    description: string
    exampleMedia?: string[]
    prizeStructure: PrizeStructure
    contestOwner: User
}

export interface ContestState {
    data: ContestData[] | null
    loading: boolean
    error: null | string
}
