import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit'

import {
    fetchMediaWorks,
    fetchNextTextWorks,
    fetchPopularMediaWorks,
    fetchPopularTextWorks,
    fetchTextWorks,
} from '../services'
import { createContestComment } from '../services/createContestComment'
import {
    fetchContestComments,
    fetchNextContestComments,
} from '../services/fetchContestComments'
import { fetchNextMediaWorks } from '../services/fetchMediaWorks'
import { ContestWorksSchema } from '../types'

const initialState: ContestWorksSchema = {
    ownerId: '',

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

        page: 2,

        totalPages: 0,
        totalElements: 0,

        loading: false,
        nextLoading: false,
        error: null,
    },

    comments: {
        content: [],

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
        resetState: (state) => {
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
            state.comments = {
                ...state.comments,
                content: [],
            }
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
            .addCase(fetchContestComments.fulfilled, (state, { payload }) => {
                state.comments.content = payload.content
                state.comments.totalPages = payload.totalPages
                state.comments.totalElements = payload.totalElements
                state.comments.page = 1

                state.comments.loading = false
            })
            .addCase(
                fetchNextContestComments.fulfilled,
                (state, { payload }) => {
                    state.comments.content = state.comments.content.concat(
                        payload.content
                    )
                    state.comments.page += 1

                    state.comments.nextLoading = false
                }
            )
            .addCase(createContestComment.fulfilled, (state, { payload }) => {
                state.comments.content = [
                    payload.content,
                    ...state.comments.content,
                ]

                state.comments.nextLoading = false
            })

            .addCase(fetchNextMediaWorks.pending, (state) => {
                state.media.nextLoading = true
                state.media.error = null
            })
            .addCase(fetchNextTextWorks.pending, (state) => {
                state.text.nextLoading = true
                state.text.error = null
            })
            .addCase(fetchContestComments.pending, (state) => {
                state.comments.loading = true
                state.comments.error = null
            })

            .addCase(fetchNextMediaWorks.rejected, (state, { payload }) => {
                state.media.error = payload as string
                state.media.nextLoading = false
            })
            .addCase(fetchNextTextWorks.rejected, (state, { payload }) => {
                state.text.error = payload as string
                state.text.nextLoading = false
            })
            .addCase(fetchContestComments.rejected, (state, { payload }) => {
                state.comments.error = payload as string

                state.comments.loading = false
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
                    fetchNextContestComments.pending,
                    createContestComment.pending
                ),
                (state) => {
                    state.comments.nextLoading = true
                    state.comments.error = null
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
            )
            .addMatcher(
                isAnyOf(
                    fetchNextContestComments.rejected,
                    createContestComment.rejected
                ),
                (state, { payload }) => {
                    state.comments.error = payload as string

                    state.comments.nextLoading = false
                }
            ),
})

export const { reducer: contestWorksReducer, actions: contestWorksActions } =
    slice
