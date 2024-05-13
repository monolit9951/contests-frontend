import { ContestsPage } from 'pages/contestsPage/ui/contestsPage'

import { fetchContests } from './model/services/fetchContests'
import { fetchNextContestsPage } from './model/services/fetchNextContestsPage'
import { fetchPopularContests } from './model/services/fetchPopularContests'
import { ContestsPageSchema } from './model/types'

export type { ContestsPageSchema }

export {
    ContestsPage,
    fetchContests,
    fetchNextContestsPage,
    fetchPopularContests,
}
