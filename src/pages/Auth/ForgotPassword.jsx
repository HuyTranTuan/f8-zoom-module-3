import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import Button from "@/components/Button";
import { Separator } from "@/components/ui/separator";
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";

function ForgotPassword() {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-[370px] mx-auto space-y-6">
      <div>
        <h1 className="text-center text-base sm:text-lg font-normal text-foreground mb-6">
          {t("forgot_psw_title")}
        </h1>

        <p className="text-center text-sm text-foreground-secondary mb-6">
          {t("enter_email_recive_link")}
        </p>

        <ForgotPasswordForm />

        <div className="relative my-6">
          <Separator className="bg-separator" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 text-sm text-foreground-tertiary">
            {t("or")}
          </span>
        </div>

        <Link to="auth/login">
          <Button
            variant="outline"
            className="w-full h-12 rounded-xl border-border hover:bg-foreground transition-colors"
          >
            {t("back_to_login")}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
