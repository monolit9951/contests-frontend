import { ContestsPage } from 'pages/contestsPage/ui/contestsPage'

import {
    fetchContests,
    fetchNextContestsPage,
    fetchPopularContests,
} from './model/services'
import { ContestsPageSchema } from './model/types'

export type { ContestsPageSchema }

export {
    ContestsPage,
    fetchContests,
    fetchNextContestsPage,
    fetchPopularContests,
}
