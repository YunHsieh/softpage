import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "store";

export interface AuthState {
    loginRequired: boolean;
    token: string;
}

const initialState = {
    loginRequired: false,
    token: '',
}

export const AuthAction = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserLoginRequired: (state, action: PayloadAction<any>) => {
            const { loginRequired } = action.payload
            state.loginRequired = loginRequired
        },
        setUserLoginToken: (state, action: PayloadAction<any>) => {
            const { access_token } = action.payload
            state.token = access_token
        },
    },
});

export const { setUserLoginToken, setUserLoginRequired } = AuthAction.actions;

export const selectAlertStore = (state: AppState) => state.auth;
