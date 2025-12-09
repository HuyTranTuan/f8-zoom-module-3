import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getCurrentUser, useFetchCurrentUser } from "@/services";

//Init State
const initialState = {
  user: null,
  isAuthenticated: false, // Trạng thái đăng nhập
  loading: false,
  error: null, // Error message
  showSignUpModal: false, //Modal Sign

  //State Register
  registerLoading: false,
  registerError: null,
  registerSuccess: false,

  //State Login
  loginLoading: false,
  loginError: null,
  loginSuccess: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //Action set loading
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    //Register actions
    registerStart: (state) => {
      state.registerLoading = true;
      state.registerError = null;
      state.registerSuccess = false;
    },
    registerSuccess: (state, action) => {
      state.registerLoading = false;
      state.registerSuccess = true;
      state.user = action.payload.user || null;
      state.registerError = null;
    },
    registerFailure: (state, action) => {
      state.registerLoading = false;
      state.registerError = action.payload;
      state.registerSuccess = false;
    },
    // Reset Register state
    resetRegisterState: (state) => {
      state.registerLoading = false;
      state.registerError = null;
      state.registerSuccess = false;
    },

    //Login actions
    loginStart: (state) => {
      state.loginLoading = true;
      state.loginError = null;
      state.loginSuccess = false;
    },
    loginSuccess: (state, action) => {
      state.loginLoading = false;
      state.loginSuccess = true;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action) => {
      state.loginLoading = false;
      state.loginError = action.payload;
      state.loginSuccess = false;
    },
    resetLoginState: (state) => {
      state.loginLoading = false;
      state.loginError = null;
      state.loginSuccess = false;
    },

    //Logout action
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },

    //Restore user từ localStorage khi app khởi động
    restoreUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },

    //Action đóng/mở Modal
    toggleSignUpModal: (state, action) => {
      state.showSignUpModal = action.payload ?? !state.showSignUpModal;
    },
    //Action đóng modal
    closeSignUpModal: (state) => {
      state.showSignUpModal = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(useFetchCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.status = "succeeded";
    });
  },
});

export const useCurrentUser = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  return currentUser;
};

export const {
  setLoading,
  registerStart,
  registerSuccess,
  registerFailure,
  resetRegisterState,
  loginStart,
  loginSuccess,
  loginFailure,
  resetLoginState,
  logout,
  restoreUser,
  toggleSignUpModal,
  closeSignUpModal,
} = authSlice.actions;

export default authSlice.reducer;
