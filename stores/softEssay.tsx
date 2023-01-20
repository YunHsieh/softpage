import { AppState } from "store";
import { fetchEssays, createEssay, updateEssay } from "posts/getSoftEssay"
import { createSlice } from "@reduxjs/toolkit";
import { PostsStatus } from "enums/posts";
import { HYDRATE } from "next-redux-wrapper";
import { any } from "prop-types";

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
        title: '',
        content: '',
        tags: [],
        id: ''
    },
    essay: ''
}

const findCurrentEssayIndex = (id: string, data: Array<any>) => {
    let index = 0;
    data.map((v: any, i: number) => {
        if (v.id == id) index = i;
    })
    return index;
}

export const essaySlice = createSlice({
    name: 'essays',
    initialState,
    reducers: {
        resetCurrentEssay: (state: DataState, _action) => {
            if (state.status !== PostsStatus.Loading && state.currentEssay.id) {
                state.tmpDataIndex = findCurrentEssayIndex(state.currentEssay.id, state.data)
                state.currentEssay = {...state.data[state.tmpDataIndex]}
            }
        },
        setEssayState: (state: DataState, action) => {
            if (state.status !== PostsStatus.Loading) {
                state.currentEssay = {...initialState.currentEssay, ...action.payload}
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
                    state.tmpDataIndex = findCurrentEssayIndex(action.payload.id, state.data)
                }
                state.data[state.tmpDataIndex] = {
                    ...state.data[state.tmpDataIndex],
                    ...action.payload,
                }
            })
    }
});

export const { setEssayState, resetCurrentEssay } = essaySlice.actions;

export const selectEssayState = (state: AppState) => state.essays;
