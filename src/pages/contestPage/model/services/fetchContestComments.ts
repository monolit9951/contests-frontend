import { createAsyncThunk } from '@reduxjs/toolkit'
import { selectContestComments } from 'pages/contestPage/model/selectors'
import instance from 'shared/api/api'

export const fetchContestComments = createAsyncThunk(
    'comments/fetchContestComments',
    async (id: string, thunkApi) => {
        const { rejectWithValue } = thunkApi

        try {
            const response = await instance.get(
                `comment?page=0&pageSize=8&sortDirection=DESC&parentId=${id}`
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

export const fetchNextContestComments = createAsyncThunk(
    'comments/fetchNextContestComments',
    async (id: string, thunkApi) => {
        const { rejectWithValue, getState } = thunkApi

        const { page } = selectContestComments(getState())

        try {
            const response = await instance.get(
                `comment?page=${page}&pageSize=8&sortDirection=DESC&parentId=${id}`
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
