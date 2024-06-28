import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { filterReducer } from 'features/filterContests'
import { contestWorksReducer } from 'pages/contestPage/model/slice'
import { contestsCreationPageReducer } from 'pages/contestsCreationPage/model/slice'
import { contestsPageReducer } from 'pages/contestsPage'
import workReducer from 'pages/feedPage/model/slice'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    contestsPage: contestsPageReducer,
    contestsCreationPage: contestsCreationPageReducer,
    filter: filterReducer,
    works: workReducer,
    contestWorks: contestWorksReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
})

export const persistor = persistStore(store)
export default store