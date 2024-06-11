import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {Work, WorksResponse} from "entities/work/model/types";

interface WorksState {
    works: Work[];
    loading: boolean;
    error: string | null;
}

const initialState: WorksState = {
    works: [],
    loading: false,
    error: null,
};

export const fetchWorks = createAsyncThunk(
    'works/fetchWorks',
    async (page: number) => {
        const response = await axios.get<WorksResponse>(
            `http://localhost:8080/api/works?page=${page}&pageSize=1&sortDirection=ASC`
        );
        return response.data;
    }
);

const worksSlice = createSlice({
    name: 'works',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWorks.fulfilled, (state, action) => {
                state.loading = false;
                state.works = action.payload.content;
            })
            .addCase(fetchWorks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch works';
            });
    },
});

export default worksSlice.reducer;
