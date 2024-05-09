import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getPopularContests = createAsyncThunk(
    'contests/getContests',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/contests/popular`
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
