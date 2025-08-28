import { createAsyncThunk } from '@reduxjs/toolkit'
import instance from 'shared/api/api'

import { selectContestMedia } from '../selectors'

// получение всех медиаВорков
export const fetchMediaWorks = createAsyncThunk(
    'works/fetchContestMedia',
    async (id: string, thunkApi) => {
        const { rejectWithValue } = thunkApi

        try {
            const token = localStorage.getItem('userToken')
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            const response = await instance.get(
                `/works/byContestId/${id}`, {headers}
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

// получение всех медиаВорков
export const fetchNextMediaWorks = createAsyncThunk(
    'works/fetchNextContestMedia',
    async (id: string, thunkApi) => {
        const { rejectWithValue, getState } = thunkApi

        const { page } = selectContestMedia(getState())

        try {
            const token = localStorage.getItem('userToken')
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            const response = await instance.get(
                `/works/byContestId/${id}?page=${page}&pageSize=9&sortDirection=ASC&sortBy=new`, {headers}
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

// получение популярных медиаворков
export const fetchPopularMediaWorks = createAsyncThunk(
    'works/fetchPopularContestMedia',
    async (id: string, thunkApi) => {
        const { rejectWithValue } = thunkApi

        try {

            const token = localStorage.getItem('userToken')
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            const response = await instance.get(
                `/works/popular/${id}?page=0&pageSize=9`, {headers}
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

export const fetchNewWorks = async (contestId: string, pageParam: number) => {
    const token = localStorage.getItem('userToken');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await instance.get(`/works/byContestId/${contestId}?page=${pageParam}&pageSize=9&sortDirection=ASC&sortBy=new`, { headers });

    if (!response.data) throw new Error('No data');

    return response.data;
};




export const fetchPopularWorks = async(id: string, pageParam: number) => {
    try{
        const token = localStorage.getItem('userToken')
        const headers = token ? { Authorization: `Bearer ${token}` } : {};


        const response = await instance.get(`/works/byContestId/${id}?page=${pageParam}&pageSize=9&sortDirection=ASC&sortBy=popular`, {headers})

        if (!response.data) {
            throw new Error()
        }

        return response.data

    } catch (error){    
        return error
    }
}