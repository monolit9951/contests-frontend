import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ContestData, ContestState } from './types'

const initialState: ContestState = {
    data: null,
    loading: false,
    error: null,
}

const contestSlice = createSlice({
    name: 'contest',
    initialState,
    reducers: {
        fetchContestsStart(state) {
            state.loading = true
            state.error = null
        },
        fetchContestsSuccess(state, action: PayloadAction<ContestData[]>) {
            state.loading = false
            state.data = action.payload
        },
        fetchContestsFailure(state, action: PayloadAction<string>) {
            state.loading = false
            state.error = action.payload
        },
    },
})

export const {
    fetchContestsStart,
    fetchContestsSuccess,
    fetchContestsFailure,
} = contestSlice.actions

export const selectContestData = (state: RootState) => state.contest.data
export const selectContestLoading = (state: RootState) => state.contest.loading
export const selectContestError = (state: RootState) => state.contest.error

export default contestSlice.reducer
