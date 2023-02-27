import { createAsyncThunk } from '@reduxjs/toolkit'
import { essayReq } from 'helps/customAxios'

export const fetchEssays = createAsyncThunk("get/fetchEssays", async (_, thunkAPI) => {
    try {
        const response = await essayReq.get(`/api/essays/`)
        return response?.data
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})

export const fetchCurrentEssay = createAsyncThunk("get/fetchCurrentEssays", async (initialParams: any) => {
    const { id } = initialParams;
    const response = await essayReq.get(`/api/essays/${id}`)
    return response?.data
})

export const fetchHistoryEssays = createAsyncThunk("get/fetchHistoryEssays", async (initialParams: any) => {
    const { id } = initialParams;
    const response = await essayReq.get(`/api/essays/${id}/histories`)
    return response?.data
})

export const createHistoryEssays = createAsyncThunk("post/SaveCommittedEssays", async (initialPost: any) => {
    const { id } = initialPost;
    const response = await essayReq.post(`/api/essays/${id}/histories`, {
        ...initialPost
    })
    return response?.data
})

export const createEssay = createAsyncThunk("post/createEssay", async (initialPost: any, thunkAPI) => {
    const { title } = initialPost
    try {
        const response = await essayReq.post(`/api/essays`, {
            title: title
        })
        if (response?.status === 201) return response?.data;
        return `${response.status} : ${response.statusText}`
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})

export const updateEssay = createAsyncThunk("put/updateEssay", async (initialPost: any) => {
    const { id } = initialPost
    try {
        const response = await essayReq.put(`/api/essays/${id}`, {
            ...initialPost,
        });
        if (response?.status === 202) return response?.data;
        return `${response.status} : ${response.statusText}`;
    } catch (error: any) {
        return error.message
    }
})
