import { Link, Outlet } from "react-router-dom";
import images from "@/assets/images";

const AuthLayout = () => {
  return (
    <div className="relative">
      <div className="absolute top-0 w-full">
        <img
          src={images.logo}
          alt="Threads decorative header"
          className="w-full h-auto object-fill object-center"
        />
      </div>
      <Outlet />

      {/* Footer */}
      <footer className="fixed bottom-1 w-full flex! flex-wrap justify-center! gap-3 sm:gap-4 text-xs sm:text-sm">
        <span className="text-systemtext">© 2025</span>
        <Link href="#" className="text-systemtext!">
          Điều khoản của Threads
        </Link>
        <Link href="#" className="text-systemtext!">
          Chính sách quyền riêng tư
        </Link>
        <Link href="#" className="text-systemtext!">
          Chính sách cookie
        </Link>
        <Link href="#" className="text-systemtext!">
          Báo cáo sự cố
        </Link>
      </footer>
    </div>
  );
};
export default AuthLayout;
