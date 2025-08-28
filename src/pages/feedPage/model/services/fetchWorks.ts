import { createAsyncThunk } from '@reduxjs/toolkit'
import { WorksResponse } from 'entities/work/model/types'
import instance from 'shared/api/api'

export const fetchWorks = createAsyncThunk(
    'works/fetchWorks',
    async (page: number, { rejectWithValue }) => {
        try {
            const response = await instance.get<WorksResponse>(
                `works?page=${page}&pageSize=3&sortDirection=ASC`
            )

            if (!response.data) {
                throw new Error('No data')
            }

            return response.data
        } catch (e) {
            return rejectWithValue(`Request error: ${e as string}`)
        }
    }
)

export const fetchFeedWorks = async ({ pageParam = 1 }) => {
  try {
    const token = localStorage.getItem('userToken');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await instance.get(
      `works?page=${pageParam}&pageSize=3&sortDirection=ASC`, 
      { headers }
    );

    if (!response.data) {
      throw new Error('No data');
    }

    return response.data;
  } catch (error) {
    throw new Error('No data');
  }
};