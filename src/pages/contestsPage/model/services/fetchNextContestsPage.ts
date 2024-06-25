import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    selectActiveFilters,
    selectCategory,
    selectSortDirection,
} from 'features/filterContests'
import { getQueryString } from 'features/filterContests/model/helpers'
import instance from 'shared/api/api'

import { selectPage, selectSearchString } from '../selectors'

export const fetchNextContestsPage = createAsyncThunk(
    'contests/fetchNextContestsPage',
    async (_, thunkApi) => {
        const { rejectWithValue, getState } = thunkApi

        const page = selectPage(getState())
        const direction = selectSortDirection(getState())
        const searchStr = selectSearchString(getState())
        const category = selectCategory(getState())
        const activeFilters = selectActiveFilters(getState())

        try {
            const response = await instance.get(
                `/contests?page=${page}&pageSize=8&sortDirection=${direction}${
                    searchStr && `&val=searchString=${searchStr}`
                }${category && `&val=category=${category}`}&${getQueryString(
                    activeFilters
                )}`
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
