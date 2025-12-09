import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/utils/validators";
import { authService } from "@/services/authServices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { PasswordInput } from "@/components/ui/password-input";
import {
  selectLoginLoading,
  loginStart,
  loginSuccess,
  loginFailure,
} from "@/features/auth";
import { useTranslation } from "react-i18next";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isLoading = useSelector(selectLoginLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur", //Validate khi bluer ra ngoài
  });

  const onSubmit = async (data) => {
    dispatch(loginStart());

    try {
      const response = await authService.login(data);

      //Lưu token vào localStorage
      if (response.access_token) {
        localStorage.setItem("access_token", response.access_token);
      }
      if (response.refresh_token) {
        localStorage.setItem("refresh_token", response.refresh_token);
      }

      //Lưu user vào localStorage để restore khi F5
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }

      dispatch(loginSuccess(response));

      //Hiển thị toast
      toast.success("Đăng nhập thành công !", {
        description: `Chào mừng ${response.user.username}`,
      });

      if (response.user) {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch(loginFailure(errorMessage));

      //Toast lỗi
      toast.error("Đăng nhập thất bại", {
        description: errorMessage,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-3"
    >
      {/* Input: Tên người dùng hoặc Email */}
      <div>
        <Input
          type="text"
          placeholder="Tên người dùng hoặc email"
          {...register("username")}
          className={`
                        h-12
                        bg-background
                        border-input-border
                        rounded-2xl
                        text-normaltext
                        placeholder:text-normaltext-tertiary
                        ${errors.username ? "border-destructive" : ""}
                        `}
          disabled={isLoading}
        />
        {errors.username && (
          <p className="text-destructive text-sm mt-1">
            {errors.username.message}
          </p>
        )}
      </div>

      {/* Input: Mật khẩu */}
      <div>
        <PasswordInput
          placeholder="Mật khẩu"
          {...register("password")}
          className={`
                        h-12
                        bg-background
                        border-input-border
                        rounded-xl
                        text-normaltext
                        placeholder:text-normaltext-tertiary
                        ${errors.password ? "border-destructive" : ""}
                        `}
          disabled={isLoading}
        />
        {errors.password && (
          <p className="text-destructive text-sm mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Button đăng nhập */}
      <Button
        type="submit"
        className="w-full h-12 rounded-xl font-semibold text-background !hover:text-threaditembg bg-foreground !hover:bg-normaltext"
        disabled={isLoading}
      >
        {isLoading ? t("loging_in") : t("login")}
      </Button>
    </form>
  );
}
export default LoginForm;
