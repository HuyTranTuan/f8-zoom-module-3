import Button from "@/components/Button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-lg mb-2 text-center font-bold w-[400px]">
        {t("title")}
      </h2>

      <p className="text-[14px] text-muted-foreground max-w-[360px] mb-8">
        {t("description")}
      </p>

      <Button className="px-6 rounded-lg" onClick={() => navigate("/")}>
        {t("backButton")}
      </Button>
    </div>
  );
}

export default NotFound;
