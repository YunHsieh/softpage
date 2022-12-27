// src/features/posts/postsSlice

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

export const fetchEssays = createAsyncThunk("posts/fetchEssays", async () => {
    const response = await essayReq.get("/api/essays")
    return response?.data
})

export const createEssay = createAsyncThunk("post/createEssay", async (initialPost: any) => {
    const { id } = initialPost
    try {
        const response = await essayReq.post(`/api/essays`);
        if (response?.status === 201) return initialPost;
        return `${response.status} : ${response.statusText}`;
    } catch (error: any) {
        return error.message
    }
})
