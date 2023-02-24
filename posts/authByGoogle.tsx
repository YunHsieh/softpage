import { createAsyncThunk } from '@reduxjs/toolkit'
import { essayReq } from 'helps/customAxios'

export const googleAuth = createAsyncThunk("posts/google/login", async () => {
    const response = await essayReq.get("/api/google/authorize")
    window.open(response?.data.redirect_url)
    return response?.data
})
