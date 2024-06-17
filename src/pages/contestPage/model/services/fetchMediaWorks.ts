import { createAsyncThunk } from '@reduxjs/toolkit'
import instance from 'shared/api/api'

import { selectContestMedia } from '../selectors'

export const fetchMediaWorks = createAsyncThunk(
    'works/fetchContestMedia',
    async (id: string, thunkApi) => {
        const { rejectWithValue } = thunkApi

        try {
            const response = await instance.get(
                `/works/byOwnerId/${id}?page=0&pageSize=9&sortDirection=ASC&typeOfWork=media&sortBy=new`
            )

            if (!response.data) {
                throw new Error()
            }

            return response.data
        } catch (e) {
            return rejectWithValue(`Request error: ${e as string}`)
        }
    }
)

export const fetchNextMediaWorks = createAsyncThunk(
    'works/fetchNextContestMedia',
    async (id: string, thunkApi) => {
        const { rejectWithValue, getState } = thunkApi

        const { page } = selectContestMedia(getState())

        try {
            const response = await instance.get(
                `/works/byOwnerId/${id}?page=${page}&pageSize=9&sortDirection=ASC&typeOfWork=media&sortBy=new`
            )

            if (!response.data) {
                throw new Error()
            }

            return response.data
        } catch (e) {
            return rejectWithValue(`Request error: ${e as string}`)
        }
    }
)

export const fetchPopularMediaWorks = createAsyncThunk(
    'works/fetchPopularContestMedia',
    async (id: string, thunkApi) => {
        const { rejectWithValue } = thunkApi

        try {
            const response = await instance.get(
                `/works/byOwnerId/${id}?page=0&pageSize=9&sortDirection=ASC&typeOfWork=media&sortBy=popular`
            )

            if (!response.data) {
                throw new Error()
            }

            return response.data
        } catch (e) {
            return rejectWithValue(`Request error: ${e as string}`)
        }
    }
)
