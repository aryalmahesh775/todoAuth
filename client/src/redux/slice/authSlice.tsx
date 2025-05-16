import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

export interface CounterState {
  user: any | null;
  isAuthenticated: boolean; // true if user is logged in, false otherwise
  loading: boolean; // true if user is being authenticated, false otherwise
  isVerified: boolean; // true if user is verified, false otherwise
  error: string | null; // error message if any, null otherwise
}

const cookies = new Cookies();
const token = cookies.get("token");

const initialState: CounterState = {
  user: null,
  isAuthenticated: !!token,
  loading: false,
  isVerified: false,
  error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authRequest(state) {
            state.loading = true;
            state.error = null;
        },
        authSuccess(state, action) {
            const user = action.payload;
            state.user = user;
            state.isAuthenticated = true;
            state.isVerified = user.isVerified;
            state.loading = false
        },
        verifyOtpSuccess(state) {
            state.isVerified = true;
            if(state.user) {
                state.user.isverified = true;
            }
        },
        authFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.loading = false
        },
        logoutSuccess(state) {
            state.user=null;
            state.isAuthenticated = false
        }
    }
})

export const {authRequest, authSuccess, verifyOtpSuccess, authFailure, logoutSuccess} = authSlice.actions;
export default authSlice.reducer;