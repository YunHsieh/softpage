import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface AuthState {
  authState: boolean;
}

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialState: {} as any,
  reducers: {
    // Action to set the authentication status
    setAuthState(state, action) {
      state.authState = action.payload;
    },
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  // for ssr
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setAuthState } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;

// export default authSlice.reducer;
