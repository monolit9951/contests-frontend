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
import { ContestsPageSchema } from './model/types'
import { ContestsPage } from './ui/contestsPage'

export type { ContestsPageSchema }

export {
    ContestsPage,
    fetchContests,
    fetchNextContestsPage,
    fetchPopularContests,
    selectAll,
    selectNextLoading,
    selectPage,
    selectPopular,
}
