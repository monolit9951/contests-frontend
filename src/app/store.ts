import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { filterReducer } from 'features/filterContests/model/slice'
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

import contestReducer from '../entities/contest/contestCard/model/contestCardSlice'

const rootReducer = combineReducers({
    contest: contestReducer,
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
