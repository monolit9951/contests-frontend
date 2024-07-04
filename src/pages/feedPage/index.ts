import {
    selectError,
    selectHasMore,
    selectLoading,
    selectPage,
    selectWorks,
} from './model/selectors'
import { fetchWorks } from './model/services/fetchWorks'
import worksReducer, { incrementPage } from './model/slice'
import { FeedPage } from './ui/feedPage'

export {
    FeedPage,
    fetchWorks,
    incrementPage,
    selectError,
    selectHasMore,
    selectLoading,
    selectPage,
    selectWorks,
    worksReducer,
}
