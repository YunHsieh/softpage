import { AppState } from "store";
import { createSlice } from "@reduxjs/toolkit";


interface DataState {
    isCompared: boolean;
    isParsed: boolean;
    isSaved: boolean;
}

const initialState = {
    isCompared: false,
    isParsed: false,
    isSaved: false
}

export const essayGadGetSwtichers = createSlice({
    name: 'essayGadGetSwtichers',
    initialState,
    reducers: {
        setGadgetReset: (_state: DataState, _action) => {
            return initialState
        },
        setGadgetState: (state: DataState, action) => {
            return {...state, ...action.payload}
        }
    },
});

export const { setGadgetState, setGadgetReset } = essayGadGetSwtichers.actions;

export const selectGadGetSwtichers = (state: AppState) => state.essayGadGetSwtichers;
