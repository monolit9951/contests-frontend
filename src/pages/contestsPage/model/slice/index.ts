import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit'

import { getContests, getPopularContests } from '../services'
import { ContestsPageSchema } from '../types'

const initialState: ContestsPageSchema = {
    contests: {
        popular: [],
        all: [],
    },

    pageSize: 8,
    sortDirection: 'ASC',

    loading: false,
    error: null,
}

const slice = createSlice({
    name: 'contestsPage',
    initialState,
    reducers: {
        setSortDirection: (state, action: PayloadAction<'ASC' | 'DESC'>) => {
            state.sortDirection = action.payload
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(getContests.fulfilled, (state, action) => {
                state.contests.all = action.payload
            })
            .addCase(getPopularContests.fulfilled, (state, action) => {
                state.contests.popular = action.payload
            })
            .addMatcher(
                isAnyOf(getContests.pending, getContests.pending),
                (state) => {
                    state.loading = true
                }
            )
            .addMatcher(
                isAnyOf(getContests.rejected, getContests.rejected),
                (state, action) => {
                    state.error = action.payload as string
                }
            ),
})

export const { reducer: contestsPageReducer, actions: contestsPageActions } =
    slice
