import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { reducers } from "./stores";
import logger from "redux-logger";
import { createWrapper } from "next-redux-wrapper";
import { axiosMiddleware } from "helps/customAxios";

// Initialize the store data
const preloadedState = {}


export const makeStore = () =>
    configureStore({
        reducer: reducers,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(
                logger,
                axiosMiddleware,
            )
        },
        preloadedState,
        devTools: process.env.STAGE === "dev",
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;

export const wrapper = createWrapper<AppStore>(makeStore, {debug: process.env.STAGE === "dev"});
