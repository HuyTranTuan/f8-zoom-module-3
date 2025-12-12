import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Button from "@/components/Button";

function LoginDialog({ open, onOpenChange, icon, title, description }) {
  const navigate = useNavigate();
  const { t } = useTranslation(["DialogMessage", "LoginPanel"]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg min-h-[375px] bg-dialog-background rounded-2xl!">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-bold">
            {t(title)}
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground mt-2">
            {t(description)}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col gap-3">
          <Button
            size="xl"
            onClick={() => navigate("/auth/login")}
            className="w-full bg-background-dialog hover:bg-background-dialog cursor-pointer border border-border-btn-dialog! text-loginpanel-foreground rounded-3xl"
          >
            <p>{t("LoginPanel:continueWithInstagram")}</p>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;
