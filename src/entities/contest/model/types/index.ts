import { Prize, PrizePreview } from 'entities/prize'
import { Organizer } from 'entities/user'
import { Work } from 'entities/work'
import { PageEntityDTO } from 'shared/lib/types'

export type Status = 'ACTIVE' | 'FINISHED' | 'UPCOMING' | 'SELECTION_IN_PROGRESS' | 'WINNER_CONFIRMATION' | 'MODERATOR_SELECTION'

export type Category = '' | 'DARE' | 'CONTEST'

export type SubCategory = 'SUBCATEGORY1' | 'SUBCATEGORY2' | 'SUBCATEGORY3'

export type SelectionType = 'RANDOM' | 'CREATOR_DECISION' | 'VIEWER_VOTING'

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

export interface ContestWinners {
    contestId: string,
    userId: string,
    workId: string,
    prizeid: string
}

export interface Contest {
    id: string
    name: string
    status: Status
    contestType: Category
    subcategory: SubCategory
    backgroundImage: string
    participantAmount: number
    maxAllowedParticipantAmount: number
    dateStart: string
    selectionType: SelectionType
    dateEnd: string
    description: string
    prizes: Prize[]
    exampleMedia?: string[]
    popularity: number
    contestOwner: Organizer
    // topWinners: TopWinners[] | null
    winners: ContestWinners[]
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
