import { useCurrentUser } from "@/features/auth/authSlice";

function Profile() {
  const currentUser = useCurrentUser();

  return <div>{JSON.stringify(currentUser)}</div>;
}

export default Profile;
