import { createAsyncThunk } from '@reduxjs/toolkit'
import instance from 'shared/api/api'

// TODO: edit after popular contests controller is done
// `/contests/popular`

export const fetchPopularContests = createAsyncThunk(
    'contests/fetchPopularContests',
    async (_, { rejectWithValue }) => {
        try {
            const response = await instance.get(
                `/contests?page=0&pageSize=4&sortDirection=ASC`
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
