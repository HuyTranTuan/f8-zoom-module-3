import { lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

// Pages
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";

// import Counter from "@/pages/Counter";
const Counter = lazy(() => import("@/pages/Counter"));
const ProductsList = lazy(() => import("@/pages/ProductsList"));
const ProvincesList = lazy(() => import("@/pages/Address/ProvincesList"));
const ProvincesList2 = lazy(() => import("@/pages/Address/ProvincesList2"));
const Assets = lazy(() => import("@/pages/Assets"));
const Icons = lazy(() => import("@/pages/Icons"));
const Register = lazy(() => import("@/pages/Auth/Register"));
const Login = lazy(() => import("@/pages/Auth/Login"));
const PortalDemo = lazy(() => import("@/pages/PortalDemo"));

// Components
import Header from "../Header";
import AuthProvider from "../AuthProvider";
import PrivateRoute from "../PrivateRoute";

import { httpClient } from "@/utils/http";
import UseReducer from "@/pages/UseReducer";
import PostDetail from "@/pages/PostDetail";

function AppRoutes() {
  useEffect(() => {
    httpClient.get("/auth/devices");
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider />
      <Header />

      <Routes>
        <Route index element={<Home />} />
        <Route path="/address/provinces" element={<ProvincesList />} />
        <Route path="/portal-demo" element={<PortalDemo />} />
        <Route path="/use-reducer" element={<UseReducer />} />
        <Route path="/address/provinces2" element={<ProvincesList2 />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/post-detail" element={<PostDetail />} />

        <Route path="/assets" element={<Assets />} />
        <Route path="/icons" element={<Icons />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/counter" element={<Counter />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
