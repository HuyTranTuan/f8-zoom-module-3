import MainSidebar from "./MainSidebar";
import MainContain from "./MainContain";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { closeSignUpModal } from "@/features/auth";

import { useEffect } from "react";
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

      const token = localStorage.getItem("access_token");

      // Nếu có token trong localStorage, verify với backend
      if (token) {
        try {
          const response = await authService.getCurrentUser();

          // Token hợp lệ, restore user vào Redux state
          if (response.data) {
            // Lưu user vào localStorage để restore khi gặp lỗi 500
            localStorage.setItem("user", JSON.stringify(response.data));
            dispatch(restoreUser(response.data));
          }
        } catch (error) {
          // CHỈ xóa token nếu là lỗi 401 (Unauthorized) - token không hợp lệ
          if (error.response?.status === 401) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user");
            dispatch(logout());
          } else {
            // Lỗi 500 hoặc lỗi khác: Có thể là lỗi server tạm thời
            // Restore user từ localStorage nếu có để app vẫn hoạt động
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
