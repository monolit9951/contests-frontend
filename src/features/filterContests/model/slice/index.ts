import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { FilterPayloadObj, FilterSchema } from '../types'

type FilterPayload = PayloadAction<FilterPayloadObj>

const initialState: FilterSchema = {
    selected: {
        filtersList: [],
        status: '',
        prizeType: '',
        prizeRange: [0, 100000],
        participants: '',
        creators: '',
    },
    active: {
        filtersList: [],
        status: '',
        prizeType: '',
        prizeRange: [0, 100000],
        participants: '',
        creators: '',
    },

    loading: false,
    error: null,
}

const slice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
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
        clearFilters: (state) => {
            state.selected = {
                filtersList: [],
                status: '',
                prizeType: '',
                prizeRange: [0, 100000],
                participants: '',
                creators: '',
            }
            state.active = {
                filtersList: [],
                status: '',
                prizeType: '',
                prizeRange: [0, 100000],
                participants: '',
                creators: '',
            }
            state.error = null
        },
    },
})

export const { reducer: filterReducer, actions: filterActions } = slice
