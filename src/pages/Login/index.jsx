import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router";

import * as authService from "@/services/auth";
import { useCurrentUser } from "@/features/auth/authSlice";
import { getCurrentUser } from "@/services/authServices";
import LoginForm from "@/features/auth/components/LoginForm";
import { Separator } from "@/components/ui/separator";
import Button from "@/components/Button";
import { InstagramIcon } from "@/components/ui/icons/lucide-instagram";
import { useTranslation } from "react-i18next";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { t } = useTranslation();

  const currentUser = useCurrentUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "sondang1234@gmail.com",
      password: "12341234",
    },
  });

  useEffect(() => {
    if (currentUser) {
      const continuePath = params.get("continue") || "/";
      navigate(continuePath);
    }
  }, [currentUser, navigate, params]);

  const onSubmit = async (data) => {
    const { access_token, refresh_token } = await authService.login(data);
    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("refreshToken", refresh_token);
    dispatch(getCurrentUser());
  };

  return (
    <div className="max-w-[370px] p-6! -mt-8! !sm:-mt-12 mx-auto! flex flex-col gap-2">
      {/* Card */}
      <div className="flex flex-col gap-2">
        <h1 className="text-center text-base sm:text-lg sm:my-4 text-foreground font-bold! text-[16px]">
          {t("login_with_ig")}
        </h1>

        {/* Form đăng nhập */}
        <LoginForm />

        {/* Link Quên mật khẩu */}
        <div className="text-center">
          <Link to="/forgot-password" className="text-sm text-foreground">
            {t("forgot_psw")}
          </Link>
        </div>

        <div className="relative my-6!">
          <Separator className="bg-normaltext!" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 text-sm text-systemtext!">
            {t("or")}
          </span>
        </div>

        <Button className="w-full h-12 rounded-xl text-sytemtext bordered ">
          <div className="flex justify-center gap-5 items-center">
            <InstagramIcon />
            {t("continue_with_ig")}
          </div>
        </Button>
      </div>

      {/* Card đăng ký */}
      <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 text-center">
        <p className="text-sm text-foreground-secondar">
          {t("havent_got_account")}
          <Link
            to="/auth/register"
            className="text-foreground font-semibold hover:underline"
          >
            {t("register")}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
