import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";

import * as authService from "@/services/auth";
import { EMAIL_REGEX, registerSchema } from "@/utils/validators";
import { useEffect } from "react";
import RegisterForm from "@/features/auth/components/RegisterForm";

function Register() {
  const navigate = useNavigate();
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
    <div className="max-w-[370px] p-6! -mt-8! !sm:-mt-12 mx-auto! flex flex-col gap-2">
      {/* Card */}
      <div className="flex flex-col gap-2">
        <h1 className="text-center text-base sm:text-lg sm:my-4 text-foreground font-bold! text-[16px]">
          {t("login_with_ig")}
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
