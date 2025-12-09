import { lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

// Pages
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";

const Register = lazy(() => import("@/pages/Register"));
const Login = lazy(() => import("@/pages/Login"));

// Components
// import Header from "../Header";
import AuthProvider from "../AuthProvider";
import PrivateRoute from "../PrivateRoute";

import { httpClient } from "@/utils/http";
import PostDetail from "@/pages/PostDetail";
import MainLayout from "@/layouts/MainLayout";
import Search from "@/pages/Search";
import Acitvities from "@/pages/Acitvities";
import AuthLayout from "@/layouts/AuthLayout";

function AppRoutes() {
  useEffect(() => {
    httpClient.get("/auth/user");
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider />
      {/* <Header /> */}

      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route element={<PrivateRoute />}>
            <Route path="activity" element={<Acitvities />} />
            <Route path="profile" element={<Profile />} />
            <Route path=":user-name" element={<Search />} />
          </Route>
          <Route path="search" element={<Search />} />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
