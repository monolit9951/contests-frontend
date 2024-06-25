import {
    selectAll,
    selectNextLoading,
    selectPage,
    selectPopular,
} from './model/selectors'
import {
    fetchContests,
    fetchNextContestsPage,
    fetchPopularContests,
} from './model/services'
import { contestsPageActions, contestsPageReducer } from './model/slice'
import { ContestsPageSchema } from './model/types'
import { ContestsPage } from './ui/contestsPage'

export type { ContestsPageSchema }

export {
    ContestsPage,
    contestsPageActions,
    contestsPageReducer,
    fetchContests,
    fetchNextContestsPage,
    fetchPopularContests,
    selectAll,
    selectNextLoading,
    selectPage,
    selectPopular,
}
