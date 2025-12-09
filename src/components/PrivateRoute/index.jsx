import { Outlet, Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";

import { useCurrentUser } from "@/features/auth/hooks";
import Loading from "@/components/Loading";
import { selectAuthState, selectFetching } from "@/features/auth";

function PrivateRoute() {
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();
  const fetching = useSelector(selectFetching);
  const auth = useSelector(selectAuthState);
  console.log(auth);

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
