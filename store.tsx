import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { reducers } from "./stores";
import logger from "redux-logger"
import { createWrapper } from "next-redux-wrapper";

// Initialize the store data
const preloadedState = {}

const makeStore = () =>
    configureStore({
        reducer: reducers,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
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
