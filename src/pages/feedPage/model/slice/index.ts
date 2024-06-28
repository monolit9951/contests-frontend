import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Work, WorksResponse } from 'entities/work/model/types';

interface WorksState {
    works: Work[];
    loading: boolean;
    error: string | null;
    page: number;
    hasMore: boolean;
}

const initialState: WorksState = {
    works: [],
    loading: false,
    error: null,
    page: 0,
    hasMore: false,
};

export const fetchWorks = createAsyncThunk(
    'works/fetchWorks',
    async (page: number) => {
        const response = await axios.get<WorksResponse>(
            `http://localhost:8080/api/works?page=${page}&pageSize=3&sortDirection=ASC`
        );
        return response.data;
    }
);

const worksSlice = createSlice({
    name: 'works',
    initialState,
    reducers: {
        incrementPage(state) {
            state.page += 1;
            state.hasMore = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorks.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.hasMore = false
            })
            .addCase(fetchWorks.fulfilled, (state, action) => {
                state.loading = false;
                state.works = [...state.works, ...action.payload.content];
                state.hasMore = action.payload.content.length > 0;
            })
            .addCase(fetchWorks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch works';
            });
    },
});

export const { incrementPage } = worksSlice.actions;

export default worksSlice.reducer;
