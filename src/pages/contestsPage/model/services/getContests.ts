import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getContests = createAsyncThunk(
    'contests/getContests',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/contests?page=1&pageSize=8&sortDirection=ASC`
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
