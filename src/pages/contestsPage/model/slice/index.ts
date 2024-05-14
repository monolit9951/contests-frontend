import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit'

import {
    fetchContests,
    fetchNextContestsPage,
    fetchPopularContests,
} from '../services'
import { ContestsPageSchema } from '../types'

const initialState: ContestsPageSchema = {
    popular: {
        contests: [],

        loading: false,
        error: null,
    },

    all: {
        contests: [],

        page: 0,
        pageSize: 16,
        sortDirection: 'ASC',

        totalPages: 0,
        totalElements: 0,

        loading: false,
        nextLoading: false,
        error: null,
    },
}

const slice = createSlice({
    name: 'contestsPage',
    initialState,
    reducers: {
        setSortDirection: (state, action: PayloadAction<'ASC' | 'DESC'>) => {
            state.all.sortDirection = action.payload
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchContests.fulfilled, (state, { payload }) => {
                state.all.contests = payload.content
                state.all.totalPages = payload.totalPages
                state.all.totalElements = payload.totalElements

                state.all.loading = false
            })
            .addCase(fetchPopularContests.fulfilled, (state, { payload }) => {
                state.popular.contests = payload.content

                state.popular.loading = false
            })
            .addCase(fetchNextContestsPage.fulfilled, (state, { payload }) => {
                state.all.contests = state.all.contests.concat(payload.content)
                state.all.page = +1

                state.all.nextLoading = false
            })

            .addCase(fetchContests.pending, (state) => {
                state.all.loading = true
            })
            .addCase(fetchPopularContests.pending, (state) => {
                state.popular.loading = true
            })

            .addCase(fetchPopularContests.rejected, (state, { payload }) => {
                state.popular.error = payload as string
            })
            .addMatcher(
                isAnyOf(fetchContests.rejected, fetchNextContestsPage.rejected),
                (state, { payload }) => {
                    state.all.error = payload as string
                }
            ),
})

export const { reducer: contestsPageReducer, actions: contestsPageActions } =
    slice
