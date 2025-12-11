import { SidebarProvider } from "@/components/ui/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { closeSignUpModal } from "@/features/auth";
import { useEffect } from "react";

import MainSidebar from "./MainSidebar";
import MainContain from "./MainContain";
import SignUpModal from "@/features/auth/components/SignUpModal";
import {
  selectIsAuthenticated,
  selectIsInitializing,
  selectShowSignUpModal,
} from "@/features/auth/selectors";

function DefaultLayout() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isInitializing = useSelector(selectIsInitializing);
  const showModal = useSelector(selectShowSignUpModal);

  const shouldShowAuthCard = !isAuthenticated && !isInitializing;
  useEffect(() => {
    (async () => {
      if (isAuthenticated) return;

      const access_token = localStorage.getItem("access_token");

      if (access_token) {
        try {
          const response = await authService.getCurrentUser();

          if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
            dispatch(restoreUser(response.data));
          }
        } catch (error) {
          if (error.response?.status === 401) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user");
            dispatch(logout());
          } else {
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
              try {
                const userData = JSON.parse(savedUser);
                dispatch(restoreUser(userData));
              } catch (parseError) {}
            }
          }
        }
      }
    })();
  }, []);

  return (
    <div className="relative w-full h-[100%-10px]! bg-threadbg box-border!">
      <SidebarProvider>
        <MainSidebar
          classNames={"bg-threadbg! backdrop-blur-sm"}
          isAuthenticated={isAuthenticated}
        />
        <main className="ml-0 tablet:ml-[70px]! w-full !tablet:w-[calc(100dvw-70px)] h-[calc(100%-90px)]! tablet:h-full!">
          {/* <SidebarTrigger /> */}
          <MainContain shouldShowAuthCard={shouldShowAuthCard} />
        </main>
        <SignUpModal
          open={showModal}
          onOpenChange={(open) => {
            if (!open) dispatch(closeSignUpModal());
          }}
          id="SignUpModal"
        />
      </SidebarProvider>
    </div>
  );
}

export default DefaultLayout;
