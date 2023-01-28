import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "store";

export interface AlertState {
    isDisplay: boolean;
    title: string;
    content: string;
    level: string;
}

const initialState = {
    isDisplay: false,
    title: '',
    content: '',
    level: '',
}

export const AlertStore = createSlice({
    name: "alert",
    initialState,
    reducers: {
        setUpdateAlertState: (state, action: PayloadAction<any>) => {
            return {...initialState, ...action.payload}
        },
    },
});

export const { setUpdateAlertState } = AlertStore.actions;

export const selectAlertStore = (state: AppState) => state.alert;
