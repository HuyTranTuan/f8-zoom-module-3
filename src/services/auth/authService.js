import { createAsyncThunk } from "@reduxjs/toolkit";

import http from "@/utils/http";

export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async () => {
        const response = await http.get("/auth/me");
        return response.data;
    }
);
export const register = async (data) => {
    const response = await http.post("/auth/register", data);
    return response.data;
};
export const login = async (data) => {
    const response = await http.post("/auth/login", data);
    return response.data;
};
export const logout = async () => {
    const response = await http.post("/auth/logout");
    return response.data;
};
export const checkExistEmail = async (email) => {
    const response = await http.post(`/auth/check-email?email=${email}`);
    return response.data.exists;
};