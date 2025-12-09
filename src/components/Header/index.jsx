import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { setCurrentUser, useCurrentUser } from "@/features/auth/authSlice";
import * as authService from "@/services/auth";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      // Error handle...
      console.log(error);
    } finally {
      localStorage.clear();
      dispatch(setCurrentUser(null));

      navigate("/login");
    }
  };

  return (
    <div>
      {currentUser ? (
        <div>
          <p>{currentUser.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/login">Sign in</Link>
          <br />
          <Link to="/register">Sign up</Link>
        </div>
      )}
    </div>
  );
}

export default Header;
