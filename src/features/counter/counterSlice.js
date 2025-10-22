import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
};

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increments: (state) => {
            state.value += 1;
        },
        decrements: (state) => {
            state.value -= 1;
        },
        increaseByAmount: (state, action) => {
            state.value += action.payload;
        },
    }
});

export const {increments, decrements, increaseByAmount} = counterSlice.actions;
export const { reducerPath } = counterSlice;

export const selectCount = (state) => state.counter.value;

export default counterSlice;