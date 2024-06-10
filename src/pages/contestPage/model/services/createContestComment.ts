import { createAsyncThunk } from '@reduxjs/toolkit'
import { CommentRequestBody } from 'entities/comment/model/types'
import instance from 'shared/api/api'

export const createContestComment = createAsyncThunk(
    'comments/createContestComment',
    async (body: CommentRequestBody, thunkApi) => {
        const { rejectWithValue } = thunkApi

        try {
            const response = await instance.post('comment', body)

            if (!response.data) {
                throw new Error()
            }

            return response.data
        } catch (e) {
            return rejectWithValue(`Request error: ${e as string}`)
        }
    }
)
