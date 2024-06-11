import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    selectActiveFilters,
    selectCategory,
    selectSortDirection,
} from 'features/filterContests'
import { getQueryString } from 'features/filterContests/model/helpers'
import instance from 'shared/api/api'

import { selectPageSize } from '../selectors'

export const fetchContests = createAsyncThunk(
    'contests/fetchContests',
    async (_, thunkApi) => {
        const { rejectWithValue, getState } = thunkApi

        const pageSize = selectPageSize(getState())
        const category = selectCategory(getState())
        const direction = selectSortDirection(getState())
        const activeFilters = selectActiveFilters(getState())

        try {
            const response = await instance.get(
                `/contests?page=0&pageSize=${pageSize}&sortDirection=${direction}&val=${
                    category && `category=${category}`
                }&${getQueryString(activeFilters)}`
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
