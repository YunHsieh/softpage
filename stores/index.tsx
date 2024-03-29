import { authSlice } from "./authSlice";
import { essaySlice } from "./softEssay";
import { essayGadGetSwtichers } from "./essayGadgetController";
import { essayCommitted } from "./essayCommitted";
import { AlertStore } from "./alertness";
import { AuthAction } from "./authAction";

// register reduer
export const reducers = {
    [authSlice.name]: authSlice.reducer,
    [essaySlice.name]: essaySlice.reducer,
    [essayGadGetSwtichers.name]: essayGadGetSwtichers.reducer,
    [essayCommitted.name]: essayCommitted.reducer,
    [AlertStore.name]: AlertStore.reducer,
    [AuthAction.name]: AuthAction.reducer,
}
