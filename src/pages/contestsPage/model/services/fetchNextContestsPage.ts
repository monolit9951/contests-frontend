import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { selectPage, selectSortDirection } from '../selectors'

export const fetchNextContestsPage = createAsyncThunk(
    'contests/fetchNextContestsPage',
    async (_, thunkApi) => {
        const { rejectWithValue, getState } = thunkApi

        const page = selectPage(getState())
        const direction = selectSortDirection(getState())

        const nextPage = page + 2

        try {
            const response = await axios.get(
                `http://localhost:8080/api/contests?page=${nextPage}&pageSize=8&sortDirection=${direction}`
            )

            if (!response.data) {
                throw new Error()
            }

            return response.data
        } catch (err) {
            return rejectWithValue('error')
        }
    }
)
