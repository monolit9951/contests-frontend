import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category } from 'entities/contest'

import { FilterPayloadObj, FilterSchema } from '../types'

type FilterPayload = PayloadAction<FilterPayloadObj>

const initialState: FilterSchema = {
    selected: {
        filtersList: [],
        status: '',
        prizeType: '',
        prizeRange: [0, 100000],
        coinRange: [0, 10000],
        creators: '',
    },
    active: {
        filtersList: [],
        status: '',
        prizeType: '',
        prizeRange: [0, 100000],
        coinRange: [0, 10000],
        creators: '',
    },

    category: '',
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
            // console.log(action.payload)
            state.selected.filtersList.push(action.payload)
            state.selected = {
                ...state.selected,
                [action.payload.filterName]: action.payload.name,
            }

            // console.log(initialState.selected.filtersList)
            // state.selected.filtersList = state.selected.filtersList.filter(
            //     (item) =>
            //         item.filterName !== action.payload.filterName ||
            //         (item.filterName === action.payload.filterName &&
            //             item.name === action.payload.name)
            // )
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
        updateCoinRange: (state, action: PayloadAction<number[]>) => {
            state.selected.coinRange = action.payload
        },
        resetPrizeRange: (state) => {
            state.selected.prizeRange = [0, 100000]
            state.active.prizeRange = [0, 100000]
        },
        resetCoinRange: (state) => {
            state.selected.coinRange = [0, 100000]
            state.active.coinRange = [0, 100000]
        },
        clearFilters: (state) => {
            state.selected = {
                filtersList: [],
                status: '',
                prizeType: '',
                prizeRange: [0, 100000],
                coinRange: [0, 10000],
                creators: '',
            }
            state.active = {
                filtersList: [],
                status: '',
                prizeType: '',
                prizeRange: [0, 100000],
                coinRange: [0, 10000],
                creators: '',
            }
            state.error = null
        },
    },
})

export const { reducer: filterReducer, actions: filterActions } = slice
