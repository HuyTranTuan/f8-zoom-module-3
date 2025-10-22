import { useCurrentUser } from "@/features/auth";

function Profile() {
    const currentUser = useCurrentUser();

    return <div>{JSON.stringify(currentUser)}</div>;
}

export default Profile;
