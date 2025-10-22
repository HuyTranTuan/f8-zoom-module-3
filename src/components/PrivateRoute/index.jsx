import { Outlet, Navigate, useLocation } from "react-router";

import { useCurrentUser } from "@/features/auth";
import { useSelector } from "react-redux";

function PrivateRoute() {
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();
  const fetching = useSelector((state) => state.auth.fetching);

  if (fetching) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to={`/login?continue=${encodeURIComponent(pathname)}`} />;
  }

  return <Outlet />;
}

export default PrivateRoute;
