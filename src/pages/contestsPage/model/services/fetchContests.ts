import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    selectActiveFilters,
    selectCategory,
    selectSortDirection,
} from 'features/filterContests'
import { getQueryString } from 'features/filterContests/model/helpers'
import instance from 'shared/api/api'

import { selectPageSize, selectSearchString } from '../selectors'

import 'app/store'

interface FetchContestsArgs {
  pageParam?: number
  direction: string
  searchStr?: string
  category?: string
  activeFilters: any
}

export const fetchContests = createAsyncThunk(
    'contests/fetchContests',
    async (_, thunkApi) => {
        const { rejectWithValue, getState } = thunkApi

        const pageSize = selectPageSize(getState())
        const direction = selectSortDirection(getState())
        const searchStr = selectSearchString(getState())
        const category = selectCategory(getState())
        const activeFilters = selectActiveFilters(getState())
        

        try {
            const response = await instance.get(
                `/contests?page=0&pageSize=${pageSize}&sortDirection=${direction}${
                    searchStr && `&search=${searchStr}`
                }${category && `&contestType=${category}`}&${getQueryString(
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

export const fetchContestsCache = async ({
    pageParam = 0,
    direction,
    searchStr,
    category,
    activeFilters,
}: FetchContestsArgs) => {
    const response = await instance.get(
        `/contests?page=${pageParam}&pageSize=16&sortDirection=${direction}${
        searchStr ? `&search=${searchStr}` : ''
        }${category ? `&contestType=${category}` : ''}&${getQueryString(
        activeFilters
        )}`
    )

    return response.data
}