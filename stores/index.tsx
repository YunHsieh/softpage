import { authSlice } from "./authSlice";
import { essaySlice } from "./softEssay";

// register reduer
export const reducers = {
    [authSlice.name]: authSlice.reducer,
    [essaySlice.name]: essaySlice.reducer,
}
