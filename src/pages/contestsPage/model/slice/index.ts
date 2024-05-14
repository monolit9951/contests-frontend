import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit'

import {
    fetchContests,
    fetchNextContestsPage,
    fetchPopularContests,
} from '../services'
import { ContestsPageSchema } from '../types'

const initialState: ContestsPageSchema = {
    contests: {
        popular: [],
        all: [],
    },

    page: 0,
    pageSize: 16,
    sortDirection: 'ASC',

    totalPages: 0,
    totalElements: 0,

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
            .addCase(fetchContests.fulfilled, (state, { payload }) => {
                state.contests.all = payload.content
                state.totalPages = payload.totalPages
                state.totalElements = payload.totalElements
            })
            .addCase(fetchPopularContests.fulfilled, (state, action) => {
                state.contests.popular = action.payload.content
            })
            .addCase(fetchNextContestsPage.fulfilled, (state, action) => {
                state.contests.all = state.contests.all.concat(
                    action.payload.content
                )
            })
            .addMatcher(
                isAnyOf(
                    fetchContests.pending,
                    fetchPopularContests.pending,
                    fetchNextContestsPage.pending
                ),
                (state) => {
                    state.loading = true
                }
            )
            .addMatcher(
                isAnyOf(
                    fetchContests.rejected,
                    fetchPopularContests.rejected,
                    fetchNextContestsPage.rejected
                ),
                (state, action) => {
                    state.error = action.payload as string
                }
            ),
})

export const { reducer: contestsPageReducer, actions: contestsPageActions } =
    slice
