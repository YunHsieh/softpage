import { AppState } from "store";
import { fetchEssays } from "posts/getSoftEssay"
import { createSlice } from "@reduxjs/toolkit";
import { PostsStatus } from "enums/posts";
import { HYDRATE } from "next-redux-wrapper";

interface DataState {
    currentEssay: any;
    essay: string;
    data: any[];
    status: PostsStatus;
    error: any;
}

const initialState: DataState = {
    data: [],
    status: PostsStatus.Idle,
    error: null,
    currentEssay: undefined,
    essay: ""
}

export const essaySlice = createSlice({
    name: 'essays',
    initialState,
    reducers: {
        setEssayState: (state: DataState, action) => {
            state.currentEssay = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(HYDRATE, (state, action: any) => {
                return {
                    ...action.payload.essays
                }
            })
            .addCase(fetchEssays.pending, (state, _action) => {
                state.status = PostsStatus.Loading
            })
            .addCase(fetchEssays.fulfilled, (state, action) => {
                state.status = PostsStatus.Succeeded
                state.data = action.payload;
                state.currentEssay = action.payload[0];
            })
            .addCase(fetchEssays.rejected, (state, action) => {
                state.status = PostsStatus.Failed
                state.error = action.error.message
            })
    }
});

export const { setEssayState } = essaySlice.actions;

export const selectEssayState = (state: AppState) => state.essays;
