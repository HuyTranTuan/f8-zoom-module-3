import { createSlice } from "@reduxjs/toolkit";

import { getList } from "@/services/product";


const initialState = {
    list: [],
    pagination: {
        last_page: 0,
    },
    loading: false
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setList(state, action){
            state.list = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getList.fulfilled, (state, action) => {
                const { items, pagination } = action.payload;

                state.list = [...state.list, ...items];
                state.pagination = pagination;
                state.loading = false;
            })
            .addCase(getList.rejected, (state) => {
                state.loading = false;
            });
    }
});

export const { setList } = productSlice.actions;
export const { reducerPath } = productSlice;

export default productSlice;