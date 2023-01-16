import { authSlice } from "./authSlice";
import { essaySlice } from "./softEssay";
import { essayGadGetSwtichers } from "./essayGadgetController";

// register reduer
export const reducers = {
    [authSlice.name]: authSlice.reducer,
    [essaySlice.name]: essaySlice.reducer,
    [essayGadGetSwtichers.name]: essayGadGetSwtichers.reducer,
}
