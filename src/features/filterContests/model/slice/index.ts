import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { FilterSchema } from '../types'

const initialState: FilterSchema = {
    filters: {
        selected: [],
        active: [],
    },
    prizeRange: [0, 100000],
    loading: false,
    error: null,
}

const slice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        addFilter: (state, action: PayloadAction<string>) => {
            state.filters.selected.push(action.payload)
        },
        removeFilter: (state, action: PayloadAction<string>) => {
            state.filters.selected = state.filters.selected.filter(
                (item) => item !== action.payload
            )
        },
        removeActiveFilter: (state, action: PayloadAction<string>) => {
            state.filters.active = state.filters.active.filter(
                (item) => item !== action.payload
            )
            state.filters.selected = state.filters.selected.filter(
                (item) => item !== action.payload
            )
        },
        confirmFilters: (state) => {
            state.filters.active = state.filters.selected
        },
        updatePrizeRange: (state, action: PayloadAction<number[]>) => {
            state.prizeRange = action.payload
        },
        clearFilters: (state) => {
            state.filters = {
                selected: [],
                active: [],
            }
            state.prizeRange = [0, 100000]
        },
    },
})

export const { reducer: filterReducer, actions: filterActions } = slice
