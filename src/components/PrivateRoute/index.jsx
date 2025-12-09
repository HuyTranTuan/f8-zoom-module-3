import { Outlet, Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";

import { useCurrentUser } from "@/features/auth/authSlice";
import Loading from "@/components/Loading";

function PrivateRoute() {
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();
  const fetching = useSelector((state) => state.auth.fetching);

  if (fetching) {
    return <Loading />;
  }

  if (!currentUser) {
    return (
      <Navigate to={`/auth/login?continue=${encodeURIComponent(pathname)}`} />
    );
  }

  return <Outlet />;
}

export default PrivateRoute;
