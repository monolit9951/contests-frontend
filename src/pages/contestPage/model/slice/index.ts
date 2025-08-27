import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit'
import { Prize } from 'entities/prize'
import { Work } from 'entities/work'

import {
    fetchMediaWorks,
    fetchNextTextWorks,
    fetchPopularMediaWorks,
    fetchPopularTextWorks,
    fetchTextWorks,
} from '../services'
import { fetchNextMediaWorks } from '../services/fetchMediaWorks'
import { ContestWorksSchema } from '../types'

const initialState: ContestWorksSchema = {
    ownerId: '',

    prizes: [],

    media: {
        new: [],
        popular: [],

        page: 1,

        totalPages: 0,
        totalElements: 0,

        loading: false,
        nextLoading: false,
        error: null,
    },

    text: {
        new: [],
        popular: [],

        page: 1,

        totalPages: 0,
        totalElements: 0,

        loading: false,
        nextLoading: false,
        error: null,
    },
}

const slice = createSlice({
    name: 'contestWorks',
    initialState,
    reducers: {
        setOwnerId: (state, action: PayloadAction<string>) => {
            state.ownerId = action.payload
        },
        setPrizes: (state, action: PayloadAction<Prize[]>) => {
            state.prizes = action.payload
        },
        resetState: (state) => {
            state.prizes = []
            state.media = {
                ...state.media,
                new: [],
                popular: [],
            }
            state.text = {
                ...state.text,
                new: [],
                popular: [],
            }
        },
        updateWorkLike: (state, action: PayloadAction<any>) => {
            const { workId, userLike, likeAmount } = action.payload
            console.log(action.payload)
            // функция для обновления массива
            const updateArray = (arr: Work[]) => {
                const index = arr.findIndex((w) => w.id === workId)
                if (index !== -1) {
                    arr[index] = { ...arr[index], userLike, likeAmount }
                }
            }

            updateArray(state.media.new)
            updateArray(state.media.popular)
            // updateArray(state.text.new)
            // updateArray(state.text.popular)
        },
        updateWorkComments: (state, action: PayloadAction<any>) => {
            const { workId, commentAmount } = action.payload
            console.log(action.payload)

            // функция для обновления массива
            const updateArray = (arr: Work[]) => {
                const index = arr.findIndex((w) => w.id === workId)
                if (index !== -1) {
                    arr[index] = { ...arr[index], commentAmount }
                }
            }

            updateArray(state.media.new)
            updateArray(state.media.popular)
            // updateArray(state.text.new)
            // updateArray(state.text.popular)
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchMediaWorks.fulfilled, (state, { payload }) => {
                state.media.new = payload.content
                state.media.totalPages = payload.totalPages
                state.media.totalElements = payload.totalElements
                state.text.page = 1

                state.media.loading = false
            })
            .addCase(fetchTextWorks.fulfilled, (state, { payload }) => {
                state.text.new = payload.content
                state.text.totalPages = payload.totalPages
                state.text.totalElements = payload.totalElements
                state.text.page = 2

                state.text.loading = false
            })
            .addCase(fetchNextMediaWorks.fulfilled, (state, { payload }) => {
                state.media.new = state.media.new.concat(payload.content)
                state.media.page += 1

                state.media.nextLoading = false
            })
            .addCase(fetchNextTextWorks.fulfilled, (state, { payload }) => {
                state.text.new = state.text.new.concat(payload.content)
                state.text.totalPages = payload.totalPages
                state.text.page += 1

                state.text.nextLoading = false
            })
            .addCase(fetchPopularMediaWorks.fulfilled, (state, { payload }) => {
                state.media.popular = payload.content

                state.media.loading = false
            })
            .addCase(fetchPopularTextWorks.fulfilled, (state, { payload }) => {
                state.text.popular = payload.content

                state.text.loading = false
            })

            .addCase(fetchNextMediaWorks.pending, (state) => {
                state.media.nextLoading = true
                state.media.error = null
            })
            .addCase(fetchNextTextWorks.pending, (state) => {
                state.text.nextLoading = true
                state.text.error = null
            })

            .addCase(fetchNextMediaWorks.rejected, (state, { payload }) => {
                state.media.error = payload as string
                state.media.nextLoading = false
            })
            .addCase(fetchNextTextWorks.rejected, (state, { payload }) => {
                state.text.error = payload as string
                state.text.nextLoading = false
            })

            .addMatcher(
                isAnyOf(
                    fetchMediaWorks.pending,
                    fetchPopularMediaWorks.pending
                ),
                (state) => {
                    state.media.loading = true
                    state.media.error = null
                }
            )
            .addMatcher(
                isAnyOf(fetchTextWorks.pending, fetchPopularTextWorks.pending),
                (state) => {
                    state.text.loading = true
                    state.text.error = null
                }
            )

            .addMatcher(
                isAnyOf(
                    fetchMediaWorks.rejected,
                    fetchPopularMediaWorks.rejected
                ),
                (state, { payload }) => {
                    state.media.error = payload as string
                    state.media.loading = false
                }
            )
            .addMatcher(
                isAnyOf(
                    fetchTextWorks.rejected,
                    fetchPopularTextWorks.rejected
                ),
                (state, { payload }) => {
                    state.text.error = payload as string
                    state.text.loading = false
                }
            ),
})

export const { reducer: contestWorksReducer, actions: contestWorksActions } =
    slice
