import { authSlice } from "./authSlice";
import { essaySlice } from "./softEssay";
import { essayGadGetSwtichers } from "./essayGadgetController";
import { essayCommitted } from "./essayCommitted";

// register reduer
export const reducers = {
    [authSlice.name]: authSlice.reducer,
    [essaySlice.name]: essaySlice.reducer,
    [essayGadGetSwtichers.name]: essayGadGetSwtichers.reducer,
    [essayCommitted.name]: essayCommitted.reducer,
}
