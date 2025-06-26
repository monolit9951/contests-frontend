import { createAsyncThunk } from '@reduxjs/toolkit'
import instance from 'shared/api/api'

import { selectContestMedia } from '../selectors'

// получение всех медиаВорков
export const fetchMediaWorks = createAsyncThunk(
    'works/fetchContestMedia',
    async (id: string, thunkApi) => {
        const { rejectWithValue } = thunkApi

        try {
            const response = await instance.get(
                `/works/byContestId/${id}`
            )
            console.log(response.data)
            if (!response.data) {
                throw new Error()
            }

            return response.data
        } catch (e) {
            return rejectWithValue(`Request error: ${e as string}`)
        }
    }
)

// получение всех медиаВорков
export const fetchNextMediaWorks = createAsyncThunk(
    'works/fetchNextContestMedia',
    async (id: string, thunkApi) => {
        const { rejectWithValue, getState } = thunkApi

        const { page } = selectContestMedia(getState())

        try {
            const response = await instance.get(
                `/works/byContestId/${id}?page=${page}&pageSize=9&sortDirection=ASC&sortBy=new`
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

// получение популярных медиаворков
export const fetchPopularMediaWorks = createAsyncThunk(
    'works/fetchPopularContestMedia',
    async (id: string, thunkApi) => {
        const { rejectWithValue } = thunkApi

        try {
            const response = await instance.get(
                `/works/byContestId/${id}?page=0&pageSize=9&sortDirection=ASC&typeOfWork=media&sortBy=popular`
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
