import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";

import * as authService from "@/services/authServices";
import { EMAIL_REGEX, registerSchema } from "@/utils/validators";
import { useEffect } from "react";
import RegisterForm from "@/features/auth/components/RegisterForm";
import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";

function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    register,
    trigger,
    setError,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    mode: "onChange",
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await authService.register(data);
      navigate("/login");
    } catch (error) {
      // Error handle...
      console.log(error);
    }
  };

  const email = watch("email");

  useEffect(() => {
    if (email && EMAIL_REGEX.test(email)) {
      authService.checkExistsEmail(email).then((exists) => {
        if (exists) {
          setError("email", {
            type: "check-email",
            message: "Email đã tồn tại, chọn email khác",
          });
        }
      });
    }

    if (email) trigger("email");
  }, [email, errors, setError, trigger]);

  const password = watch("password");

  useEffect(() => {
    const confirmation = watch("password_confirmation");
    if (confirmation && password !== confirmation) {
      trigger("password_confirmation");
    } else {
      setError("password_confirmation", null);
    }
  }, [password, watch, trigger, setError]);

  return (
    <div className="max-w-[370px] min-w-[300px] p-6! mx-auto! flex flex-col gap-2 absolute top-full left-[50%] -translate-x-[50%] translate-y-[50%]">
      {/* Card */}
      <div className="flex flex-col gap-2">
        <h1 className="text-center text-base sm:text-lg sm:my-4 text-foreground font-bold! text-[16px]">
          {t("signup_threads")}
        </h1>

        {/* Form đăng ký */}
        <RegisterForm />

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
      </div>

      {/* Card đăng ký */}
      <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 text-center">
        <p className="text-sm text-foreground">
          {t("havent_got_account")}
          <Link
            to="/auth/login"
            className="text-foreground font-semibold hover:underline"
          >
            {t("login")}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
