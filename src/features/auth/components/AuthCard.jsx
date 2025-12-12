import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

import { Card } from "@/components/ui/card";
import Button from "@/components/Button";
import { InstagramIcon } from "@/components/ui/icons/lucide-instagram";

const AuthCard = ({ showAuthCard }) => {
  const { t } = useTranslation();

  return (
    <div className={cn(showAuthCard ? "flex" : "hidden", "w-[380px]")}>
      <Card
        className={cn(
          "rounded-2xl border border-border",
          "bg-card shadow-sm overflow-hidden",
        )}
      >
        {/* Nội dung giữ nguyên */}
        <div className="px-6 py-6 text-center">
          <h2 className="text-base font-semibold text-normaltext mb-2">
            {t("login_or_register")}
          </h2>
          <p className="text-sm text-muted-normaltext leading-5">
            {t("see_what_people_talk")}
          </p>
        </div>

        <Button className="w-full mt-6 mb-4">
          <div className="flex justify-center items-center gap-3">
            <InstagramIcon />
            {t("continue_with_ig")}
          </div>
        </Button>

        <div className="px-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span>{t("or")}</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <Link
          to="/login"
          className="text-sm text-center flex justify-center text-normaltext hover:text-normaltext transition-colors mb-3"
        >
          {t("login_with_username")}
        </Link>
      </Card>
    </div>
  );
};
export default AuthCard;
