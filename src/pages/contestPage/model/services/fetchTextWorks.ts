import { createAsyncThunk } from '@reduxjs/toolkit'
import instance from 'shared/api/api'

import { selectContestText } from '../selectors'

export const fetchTextWorks = createAsyncThunk(
    'works/fetchContestText',
    async (id: string, thunkApi) => {
        const { rejectWithValue } = thunkApi

        try {
            const response = await instance.get(
                `/works/byOwnerId/${id}?page=0&pageSize=24&sortDirection=ASC&typeOfWork=text&sortBy=new`
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

export const fetchNextTextWorks = createAsyncThunk(
    'works/fetchNextContestText',
    async (id: string, thunkApi) => {
        const { rejectWithValue, getState } = thunkApi

        const { page } = selectContestText(getState())

        try {
            const response = await instance.get(
                `/works/byOwnerId/${id}?page=${page}&pageSize=12&sortDirection=ASC&typeOfWork=text&sortBy=new`
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

export const fetchPopularTextWorks = createAsyncThunk(
    'works/fetchPopularContestText',
    async (id: string, thunkApi) => {
        const { rejectWithValue } = thunkApi

        try {
            const response = await instance.get(
                `/works/byOwnerId/${id}?page=0&pageSize=24&sortDirection=ASC&typeOfWork=text&sortBy=popular`
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
