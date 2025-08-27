import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Work } from 'entities/work'

import { fetchWorks } from '../services/fetchWorks'
import { WorksState } from '../types'

const initialState: WorksState = {
    works: [],
    loading: false,
    error: null,
    page: 0,
    hasMore: false,
}

const worksSlice = createSlice({
    name: 'works',
    initialState,
    reducers: {
        incrementPage(state) {
            state.page += 1
            state.hasMore = false
        },
        updateFeedWorkLike: (state, action: PayloadAction<any>) => {
            const { workId, userLike, likeAmount } = action.payload

            // функция для обновления массива
            const updateArray = (arr: Work[]) => {
                const index = arr.findIndex((w) => w.id === workId)
                if (index !== -1) {
                    arr[index] = { ...arr[index], userLike, likeAmount }
                }
            }

            updateArray(state.works)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorks.pending, (state) => {
                state.loading = true
                state.error = null
                state.hasMore = false
            })
            .addCase(fetchWorks.fulfilled, (state, action) => {
                state.loading = false
                state.works = [...state.works, ...action.payload.content]
                state.hasMore = action.payload.content.length > 0
            })
            .addCase(fetchWorks.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message ?? 'Failed to fetch works'
            })
    },
})

export const { incrementPage, updateFeedWorkLike} = worksSlice.actions

export default worksSlice.reducer
