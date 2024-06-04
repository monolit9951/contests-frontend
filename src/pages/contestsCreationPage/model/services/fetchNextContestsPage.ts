import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    selectActiveFilters,
    selectCategory,
    selectSortDirection,
} from 'features/filterContests'
import { getQueryString } from 'features/filterContests/model/helpers'
import instance from 'shared/api/api'

import { selectPage } from '../selectors'

export const fetchNextContestsPage = createAsyncThunk(
    'contests/fetchNextContestsPage',
    async (_, thunkApi) => {
        const { rejectWithValue, getState } = thunkApi

        const page = selectPage(getState())
        const category = selectCategory(getState())
        const direction = selectSortDirection(getState())
        const activeFilters = selectActiveFilters(getState())

        try {
            const response = await instance.get(
                `/contests?page=${page}&pageSize=8&sortDirection=${direction}&val=category=${category}&${getQueryString(
                    activeFilters
                )}`
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
