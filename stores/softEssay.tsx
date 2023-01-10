import { AppState } from "store";
import { fetchEssays, createEssay, updateEssay } from "posts/getSoftEssay"
import { createSlice } from "@reduxjs/toolkit";
import { PostsStatus } from "enums/posts";
import { HYDRATE } from "next-redux-wrapper";

interface EssayData {
    content: string;
    tags: Array<string>;
    title: string;
    id: string;
}

interface DataState {
    currentEssay: EssayData;
    essay: string;
    data: any[];
    status: PostsStatus;
    error: any;
    tmpDataIndex: number;
}

const initialState: DataState = {
    data: [],
    status: PostsStatus.Idle,
    error: null,
    tmpDataIndex: 0,
    currentEssay: {
        title: 'untitled',
        content: '',
        tags: [],
        id: ''
    },
    essay: ''
}

export const essaySlice = createSlice({
    name: 'essays',
    initialState,
    reducers: {
        setEssayState: (state: DataState, action) => {
            if (state.status !== PostsStatus.Loading) {
                state.currentEssay = action.payload
            }
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
            .addCase(createEssay.fulfilled, (state, action) => {
                state.status = PostsStatus.Succeeded
                state.data = [action.payload, ...state.data];
                state.currentEssay = action.payload;
            })
            .addCase(updateEssay.fulfilled, (state, action) => {
                state.status = PostsStatus.Succeeded
                if (state.data[state.tmpDataIndex].id !== action.payload.id) {
                    state.data.map((v: any, k: number) => {
                        if (v.id === action.payload.id) {
                            state.tmpDataIndex = k
                        }
                    }) 
                }
                state.data[state.tmpDataIndex] = {
                    ...state.data[state.tmpDataIndex],
                    ...action.payload,
                }
            })
    }
});

export const { setEssayState } = essaySlice.actions;

export const selectEssayState = (state: AppState) => state.essays;
