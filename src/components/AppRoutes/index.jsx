import { lazy, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";

// Pages
import Home from "@/pages/Home";
import Embed from "@/pages/Embed";

const Profile = lazy(() => import("@/pages/Profile"));
const Search = lazy(() => import("@/pages/Search"));
const Acitvities = lazy(() => import("@/pages/Acitvities"));
const Register = lazy(() => import("@/pages/Register"));
const Login = lazy(() => import("@/pages/Login"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const Insights = lazy(() => import("@/pages/Insights"));
const ForYou = lazy(() => import("@/pages/ForYou"));
const Account = lazy(() => import("@/pages/Account"));
const Settings = lazy(() => import("@/pages/Settings"));
const Saved = lazy(() => import("@/pages/Saved"));
const Liked = lazy(() => import("@/pages/Liked"));
const GhostPost = lazy(() => import("@/pages/GhostPost"));
const VerifyEmail = lazy(() => import("@/pages/VerifyEmail"));

import { httpClient } from "@/utils/http";
// Components
import AuthProvider from "../AuthProvider";
import PrivateRoute from "../PrivateRoute";

// Layouts
import DefaultLayout from "@/layouts/DefaultLayout";
import AuthLayout from "@/layouts/AuthLayout";
import EmbedLayout from "@/layouts/EmbedLayout";
import NotFound from "@/pages/NotFound";
import ForgotPassword from "@/pages/ForgotPassword";

function AppRoutes() {
  useEffect(() => {
    httpClient.get("/auth/user");
  }, []);

  return (
    <HashRouter>
      <AuthProvider />
      <Toaster />
      <Routes>
        {/* Default Layout */}
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route element={<PrivateRoute />}>
            <Route path="activities" element={<Acitvities />} />
            <Route path="account" element={<Account />} />
            <Route path="profile" element={<Profile />} />
            <Route path="insights" element={<Insights />} />
            <Route path="for-you" element={<ForYou />} />
            <Route path="following" element={<ForYou />} />
            <Route path="ghost-posts" element={<GhostPost />} />
            <Route path="settings" element={<Settings />} />
            <Route path="saved" element={<Saved />} />
            <Route path="liked" element={<Liked />} />
          </Route>
        </Route>

        {/* Auth Layout */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>

      {/* Embed Route - for iframe embedding */}
      <Routes path="/:username/post/:postId/embed" element={<EmbedLayout />}>
        <Route index element={<Embed />} />
      </Routes>

      {/*NotFound*/}
      <Routes path="*" element={<NotFound />} />
    </HashRouter>
  );
}

export default AppRoutes;
