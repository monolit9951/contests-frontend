import { PrizePreview, PrizeStructure } from 'entities/prize'
import { Organizer } from 'entities/user'

type Status = 'ACTIVE' | 'INACTIVE' | 'PAUSED' | 'FINISHED' | 'UPCOMING'

type Category = 'CATEGORY1' | 'CATEGORY2' | 'CATEGORY3'

type SubCategory = 'SUBCATEGORY1' | 'SUBCATEGORY2' | 'SUBCATEGORY3'

export interface Contest {
    id: string
    name: string
    status: Status
    category: Category
    subcategory: SubCategory
    backgroundImage: string
    participantAmount?: number
    maxAllowedParticipantAmount?: number
    dateStart: number[]
    dateEnd: number[]
    description: string
    exampleMedia?: string[]
    prizeStructure: PrizeStructure[]
    contestOwner: Organizer
}

export interface ContestPreview
    extends Omit<
        Contest,
        'backgroundImage' | 'description' | 'exampleMedia' | 'prizeStructure'
    > {
    previewImage: string | null
    prizesPreviews: PrizePreview[]
}
