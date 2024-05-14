import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { selectPageSize, selectSortDirection } from '../selectors'

export const fetchContests = createAsyncThunk(
    'contests/fetchContests',
    async (_, thunkApi) => {
        const { rejectWithValue, getState } = thunkApi

        const pageSize = selectPageSize(getState())
        const direction = selectSortDirection(getState())

        try {
            const response = await axios.get(
                `http://localhost:8080/api/contests?page=0&pageSize=${pageSize}&sortDirection=${direction}`
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
