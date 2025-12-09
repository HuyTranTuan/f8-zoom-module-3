import { useFetchCurrentUser } from "@/features/auth/authSlice";

function AuthProvider() {
  useFetchCurrentUser();

  return null;
}

export default AuthProvider;
