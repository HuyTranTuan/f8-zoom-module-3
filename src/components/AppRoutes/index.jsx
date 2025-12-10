import { lazy, useEffect } from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router";

// Pages
import Home from "@/pages/Home";

const Profile = lazy(() => import("@/pages/Profile"));
const Register = lazy(() => import("@/pages/Register"));
const Login = lazy(() => import("@/pages/Login"));
const Search = lazy(() => import("@/pages/Search"));
const Acitvities = lazy(() => import("@/pages/Acitvities"));

import { httpClient } from "@/utils/http";
// Components
import AuthProvider from "../AuthProvider";
import PrivateRoute from "../PrivateRoute";

// Layouts
import DefaultLayout from "@/layouts/DefaultLayout";
import AuthLayout from "@/layouts/AuthLayout";
import { Toaster } from "sonner";

function AppRoutes() {
  useEffect(() => {
    httpClient.get("/auth/user");
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider />
      <Toaster />
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
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
