import { authSlice } from "./authSlice";

// register reduer
export const reducers = {
    [authSlice.name]: authSlice.reducer,
}
