import http from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getList = createAsyncThunk(
    "product/getList",
    async ({limit = 10, page = 1}) => {
        const response = await http.get(
            `/products?limit=${limit}&page=${page}`
        );
        return response.data
    }
);