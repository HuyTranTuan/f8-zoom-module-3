import AuthCard from "@/features/auth/components/AuthCard";
import { Outlet } from "react-router";

function MainContain({ shouldShowAuthCard }) {
  return (
    <div className="flex gap-5" id="MainContent">
      <Outlet />
      <AuthCard showAuthCard={shouldShowAuthCard} />
    </div>
  );
}

export default MainContain;
