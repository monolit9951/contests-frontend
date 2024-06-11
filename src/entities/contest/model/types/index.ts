import { Prize, PrizePreview } from 'entities/prize'
import { Organizer } from 'entities/user'
import { PageEntityDTO } from 'shared/lib/types'

type Status = 'ACTIVE' | 'INACTIVE' | 'PAUSED' | 'FINISHED' | 'UPCOMING'

export type Category = '' | 'FOR_FUN' | 'FOR_WORK'

type SubCategory = 'SUBCATEGORY1' | 'SUBCATEGORY2' | 'SUBCATEGORY3'

export interface Winners {
    contestId: string
    userId: string
    prizeId: string
    done?: boolean
}

export interface PagedWinners extends PageEntityDTO {
    content: Winners[]
}

export interface Contest {
    id: string
    name: string
    status: Status
    category: Category
    subcategory: SubCategory
    backgroundImage: string
    participantAmount?: number
    maxAllowedParticipantAmount?: number
    dateStart: string
    dateEnd: string
    description: string
    prizes: Prize[]
    exampleMedia?: string[]
    popularity: number
    contestOwner: Organizer
    winners: PagedWinners
}

export interface ContestPreview
    extends Omit<
        Contest,
        | 'backgroundImage'
        | 'description'
        | 'exampleMedia'
        | 'prizeStructure'
        | 'winners'
    > {
    previewImage: string | null
    prizesPreviews: PrizePreview[]
}
