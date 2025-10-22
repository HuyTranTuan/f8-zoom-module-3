import { createSlice } from "@reduxjs/toolkit";

import { getCurrentUser } from "@/services/auth";


const initialState = {
    currentUser: null,
    fetching: true,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCurrentUser(state, action){
            state.currentUser = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentUser.pending, (state) => {
                state.fetching = true;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.fetching = false;
            })
            .addCase(getCurrentUser.rejected, (state) => {
                state.currentUser = null;
                state.fetching = false;
            });
    }
});

export const { setCurrentUser } = authSlice.actions;
export const { reducerPath } = authSlice;

export default authSlice;