import http from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await http.get("/auth/user");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const login = async (data) => {
  const response = await http.post("/auth/login", {
    login: data.username,
    password: data.password,
  });
  return response.data;
};

export const logout = async () => {
  const response = await http.post("/auth/logout");
  return response.data;
};

export const register = async (userData) => {
  const response = await http.post("/auth/register", {
    username: userData.username,
    email: userData.email,
    password: userData.password,
    password_confirmation: userData.password_confirmation,
  });

  return response.data;
};
export const validateUsername = async (username) => {
  const response = await http.post("/auth/validate/username", {
    username,
  });
  return response.data;
};

export const validateEmail = async (email) => {
  const response = await http.post("/auth/validate/email", {
    email,
  });
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await http.post("/auth/forgot-password", {
    email: email,
  });

  return response.data;
};

export const validateResetToken = async (token, email) => {
  const response = await http.get("/auth/reset-password/validate", {
    params: { token, email },
  });

  return response.data;
};

export const resetPassword = async (data) => {
  const response = await http.post("/auth/reset-password", {
    token: data.token,
    email: data.email,
    password: data.password,
    password_confirmation: data.password_confirmation,
  });

  return response.data;
};
