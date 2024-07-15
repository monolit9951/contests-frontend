import { Prize, PrizePreview } from 'entities/prize'
import { Organizer } from 'entities/user'
import { Work } from 'entities/work'
import { PageEntityDTO } from 'shared/lib/types'

export type Status = 'ACTIVE' | 'INACTIVE' | 'PAUSED' | 'FINISHED' | 'UPCOMING'

export type Category = '' | 'FOR_FUN' | 'FOR_WORK'

export type SubCategory = 'SUBCATEGORY1' | 'SUBCATEGORY2' | 'SUBCATEGORY3'

export interface WinnersRequest {
    contestId: string
    userId: string
    prizeId: string
    done: boolean
}

export interface PagedWinners extends PageEntityDTO {
    content: WinnersRequest[]
}

export interface TopWinners {
    work: Work
    prizeId: string
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
    prizes: Prize[]
    exampleMedia?: string[]
    popularity: number
    contestOwner: Organizer
    topWinners: TopWinners[] | null
    contestOpen: boolean
}

export interface ContestPreview
    extends Omit<
        Contest,
        | 'backgroundImage'
        | 'description'
        | 'exampleMedia'
        | 'prizes'
        | 'topWinners'
        | 'contestOpen'
    > {
    previewImage: string | null
    prizesPreviews: PrizePreview[]
}
