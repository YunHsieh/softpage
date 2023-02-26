import { AppState } from "store";
import { 
    fetchEssays, 
    createEssay, 
    updateEssay, 
    fetchEditedEssays, 
    fetchCommittedEssays, 
    fetchCurrentEssay } from "posts/getSoftEssay"
import { createSlice, current } from "@reduxjs/toolkit";
import { PostsStatus } from "enums/posts";
import { HYDRATE } from "next-redux-wrapper";

interface EssayData {
    updatedAt: string;
    createdAt: string;
    content: string;
    tags: Array<string>;
    title: string;
    id: string;
}

interface DataState {
    currentEssay: EssayData;
    comparedEssay: EssayData;
    essay: string;
    data: any[];
    committedData: any[];
    editedData: any[];
    comparedParsed: string[];
    status: PostsStatus;
    error: any;
    tmpDataIndex: number;
}

const initialState: DataState = {
    data: [],
    committedData: [],
    editedData: [],
    comparedParsed: [],
    status: PostsStatus.Idle,
    error: null,
    tmpDataIndex: 0,
    comparedEssay: {
        content: '',
        id: '',
    },
    currentEssay: {
        title: '',
        content: '',
        tags: [],
        id: ''
    },
    AfterComparedEssay: ''
}


const findCurrentEssayIndex = (state: any, id: string) => {
    const data = current(state.data) || []
    let index = state.tmpDataIndex || 0
    if (data[index].id === id) return index;
    index = -1
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
                state.tmpDataIndex = findCurrentEssayIndex(state, state.currentEssay.id)
                state.currentEssay = {...state.data[state.tmpDataIndex]}
            }
        },
        setEssayState: (state: DataState, action) => {
            if (state.status !== PostsStatus.Loading) {
                state.currentEssay = {...initialState.currentEssay, ...action.payload}
                const newIndex = findCurrentEssayIndex(state, action.payload.id)
                // NOTE: Case index = -1, The user is creating the new essay. 
                if (newIndex !== -1) {
                    state.tmpDataIndex = newIndex
                    state.data[newIndex] = state.currentEssay
                }
            }
        },
        setComparedEssay: (state: DataState, action) => {
            state.comparedEssay = action.payload
        },
        setComparedParsed: (state: DataState, action) => {
            state.comparedParsed = action.payload
        },
        resetComparedEssay: (state: DataState, _action) => {
            state.comparedEssay = initialState.comparedEssay
            state.comparedParsed = initialState.comparedParsed
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
                state.data = action.payload
                state.currentEssay = action.payload[0]
            })
            .addCase(fetchEssays.rejected, (state, action) => {
                state.status = PostsStatus.Failed
                state.error = action.error.message
            })
            .addCase(fetchCurrentEssay.fulfilled, (state, action) => {
                state.status = PostsStatus.Succeeded
                state.data = [action.payload]
                state.currentEssay = action.payload
            })
            .addCase(fetchCommittedEssays.fulfilled, (state, action) => {
                state.status = PostsStatus.Succeeded
                state.committedData = action.payload
            })
            .addCase(fetchEditedEssays.fulfilled, (state, action) => {
                state.status = PostsStatus.Succeeded
                state.editedData = [...state.committedData, ...action.payload]
            })
            .addCase(createEssay.fulfilled, (state, action) => {
                state.status = PostsStatus.Succeeded
                state.data = [action.payload, ...state.data];
                state.currentEssay = action.payload;
            })
            .addCase(updateEssay.fulfilled, (state, action) => {
                state.status = PostsStatus.Succeeded
                state.tmpDataIndex = findCurrentEssayIndex(state, action.payload.id)
                state.data[state.tmpDataIndex] = {
                    ...state.data[state.tmpDataIndex],
                    content: action.payload.content,
                }
            })
    }
});

export const { 
    setComparedParsed, 
    setEssayState, 
    resetCurrentEssay, 
    setComparedEssay, 
    resetComparedEssay } = essaySlice.actions;

export const selectEssayState = (state: AppState) => state.essays;
