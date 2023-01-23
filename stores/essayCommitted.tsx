import { AppState } from "store";
import { createSlice } from "@reduxjs/toolkit";


interface DataState {
    comment: string;
    description: string;
}

const initialState = {
    comment: '',
    description: '',
}

export const essayCommitted = createSlice({
    name: 'committed',
    initialState,
    reducers: {
        resetCommitted: (state: DataState, action) => {
            return initialState
        },
        setCommitted: (state: DataState, action) => {
            return {...state, ...action.payload}
        }
    },
});

export const { resetCommitted, setCommitted } = essayCommitted.actions;

export const selectGadGetSwtichers = (state: AppState) => state.committed;
