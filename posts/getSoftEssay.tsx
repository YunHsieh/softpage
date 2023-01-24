import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

const BASE_URL = process.env.HOST || "http://localhost:8000"
const essayReq = axios.create({
    baseURL: BASE_URL,
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ASDFA`,
    },
    timeout: 1000,
});

export const fetchEssays = createAsyncThunk("get/fetchEssays", async () => {
    const response = await essayReq.get("/api/essays")
    return response?.data
})

export const fetchEditedEssays = createAsyncThunk("get/fetchEditedEssays", async (initialParams: any) => {
    const { title } = initialParams;
    const response = await essayReq.get(`/api/essays`, { params: {
        title: title
    }})
    return response?.data
})

export const fetchCommittedEssays = createAsyncThunk("get/fetchCommittedEssays", async (initialParams: any) => {
    const { id } = initialParams;
    const response = await essayReq.get(`/api/essays/${id}/progresses`)
    return response?.data
})

export const createEssay = createAsyncThunk("post/createEssay", async (initialPost: any) => {
    const { title } = initialPost
    try {
        const response = await essayReq.post(`/api/essays`, {
            title: title
        });
        if (response?.status === 201) return response?.data;
        return `${response.status} : ${response.statusText}`;
    } catch (error: any) {
        return error.message
    }
})

export const updateEssay = createAsyncThunk("put/updateEssay", async (initialPost: any) => {
    const { id, title, content, tags } = initialPost
    try {
        const response = await essayReq.put(`/api/essays/${id}`, {
            id: id,
            title: title,
            content: content,
            tags: tags,
        });
        if (response?.status === 200) return response?.data;
        return `${response.status} : ${response.statusText}`;
    } catch (error: any) {
        return error.message
    }
})
