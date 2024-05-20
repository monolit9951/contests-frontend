import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Category, FilterPayloadObj, FilterSchema } from '../types'

type FilterPayload = PayloadAction<FilterPayloadObj>

const initialState: FilterSchema = {
    selected: {
        filtersList: [],
        status: '',
        prizeType: '',
        prizeRange: [0, 100000],
        creators: '',
    },
    active: {
        filtersList: [],
        status: '',
        prizeType: '',
        prizeRange: [0, 100000],
        creators: '',
    },

    category: 'Category1',
    sortDirection: 'ASC',

    loading: false,
    error: null,
}

const slice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        changeCategory: (state, action: PayloadAction<Category>) => {
            state.category = action.payload
        },
        changeSortDirection: (state) => {
            if (state.sortDirection === 'ASC') {
                state.sortDirection = 'DESC'
            } else {
                state.sortDirection = 'ASC'
            }
        },
        addFilter: (state, action: FilterPayload) => {
            state.selected.filtersList.push(action.payload)
            state.selected = {
                ...state.selected,
                [action.payload.filterName]: action.payload.name,
            }
            state.selected.filtersList = state.selected.filtersList.filter(
                (item) =>
                    item.filterName !== action.payload.filterName ||
                    (item.filterName === action.payload.filterName &&
                        item.name === action.payload.name)
            )
        },
        removeFilter: (state, action: FilterPayload) => {
            state.selected = {
                ...state.selected,
                [action.payload.filterName]: '',
            }
            state.selected.filtersList = state.selected.filtersList.filter(
                (item) =>
                    item.filterName !== action.payload.filterName ||
                    (item.filterName === action.payload.filterName &&
                        item.name !== action.payload.name)
            )
        },
        removeActiveFilter: (state, action: FilterPayload) => {
            state.active = {
                ...state.active,
                [action.payload.filterName]: '',
            }
            state.selected = {
                ...state.selected,
                [action.payload.filterName]: '',
            }
            state.active.filtersList = state.active.filtersList.filter(
                (item) =>
                    item.filterName !== action.payload.filterName ||
                    (item.filterName === action.payload.filterName &&
                        item.name !== action.payload.name)
            )
            state.selected.filtersList = state.selected.filtersList.filter(
                (item) =>
                    item.filterName !== action.payload.filterName ||
                    (item.filterName === action.payload.filterName &&
                        item.name !== action.payload.name)
            )
        },
        confirmFilters: (state) => {
            state.active = state.selected
        },
        updatePrizeRange: (state, action: PayloadAction<number[]>) => {
            state.selected.prizeRange = action.payload
        },
        resetPrizeRange: (state) => {
            state.selected.prizeRange = [0, 100000]
            state.active.prizeRange = [0, 100000]
        },
        clearFilters: (state) => {
            state.selected = {
                filtersList: [],
                status: '',
                prizeType: '',
                prizeRange: [0, 100000],
                creators: '',
            }
            state.active = {
                filtersList: [],
                status: '',
                prizeType: '',
                prizeRange: [0, 100000],
                creators: '',
            }
            state.error = null
        },
    },
})

export const { reducer: filterReducer, actions: filterActions } = slice
