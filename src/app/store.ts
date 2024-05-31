import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { filterReducer } from 'features/filterContests'
import { contestsCreationPageReducer } from 'pages/contestsCreationPage/model/slice'
import { contestsPageReducer } from 'pages/contestsPage/model/slice'
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

export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store)
export default store
