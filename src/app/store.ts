import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { filterReducer } from 'features/filterContests'
import { contestWorksReducer } from 'pages/contestPage'
import { contestsPageReducer } from 'pages/contestsPage'
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
import userReducer from "widgets/registrationModal/model/slice/userSlice"

const rootReducer = combineReducers({
    contestsPage: contestsPageReducer,
    filter: filterReducer,
    contestWorks: contestWorksReducer,
    user: userReducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
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
