import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router";

import { useCurrentUser } from "@/features/auth/hooks";
import { getCurrentUser, login } from "@/services/authServices";
import LoginForm from "@/features/auth/components/LoginForm";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { t } = useTranslation();
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (currentUser) {
      const continuePath = params.get("continue") || "/";
      navigate(continuePath);
    }
  }, [currentUser, navigate, params]);

  const onSubmit = async (data) => {
    const { access_token, refresh_token } = await login(data);
    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("refreshToken", refresh_token);
    dispatch(getCurrentUser());
  };

  return (
    <div className="max-w-[370px] min-w-[300px] p-6! mx-auto! flex flex-col gap-2 absolute top-full left-[50%] -translate-x-[50%] translate-y-[50%]">
      {/* Card */}
      <div className="flex flex-col gap-2">
        <h1 className="text-center text-base sm:text-lg sm:my-4 text-foreground font-bold! text-[16px]">
          {t("login_threads")}
        </h1>

        {/* Form đăng nhập */}
        <LoginForm />

        {/* Link Quên mật khẩu */}
        <div className="text-center">
          <Link to="/auth/forgot-password" className="text-sm text-foreground">
            {t("forgot_psw")}
          </Link>
        </div>

        <div className="relative my-6!">
          <Separator className="bg-normaltext!" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 text-sm text-systemtext!">
            {t("or")}
          </span>
        </div>
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
