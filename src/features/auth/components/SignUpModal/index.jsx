import { Instagram } from "lucide-react";
import { Link } from "react-router";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { InstagramIcon } from "@/components/ui/icons/lucide-instagram";

const SignUpModal = ({ open = true, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="">
        {/* Icon */}
        <div className=""></div>
        {/* Title */}
        <div className="">
          <h2 className="">Đăng ký để đăng</h2>
          <p className="">
            Tham gia Threads để chia sẻ ý tưởng, đặt câu hỏi, đăng những suy
            nghĩ bất chợt và hơn thế nữa.
          </p>
        </div>

        {/* Instagram Button */}
        <Button
          className={
            cn()
            // "w-full h-11 rounded-xl font-semibold",
            // "bg-primary hover:bg-primary-hover",
            // "text-primary-foreground",
            // "transition-all duration-200",
            // "flex items-center justify-center gap-2"
          }
        >
          <InstagramIcon className="" />
          <span>Tiếp tục bằng Instagram</span>
        </Button>

        {/* Divider */}
        {/* Separator */}
        <div className="">
          <div className="" />
          <span>hoặc</span>
          <div className="" />
        </div>

        {/* Login Link */}
        <div className="">
          <Link to="/login" className="">
            Đăng nhập bằng tên người dùng
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;
