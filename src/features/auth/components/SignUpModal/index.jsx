import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const SignUpModal = ({ open = true, onOpenChange }) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      className=""
      id="SignUpModal"
    >
      <DialogContent className="[&>button:last-child]:hidden px-[46px]! py-14! gap-8">
        <div>
          <DialogTitle className="text-foreground text-[32px]! font-bold! text-center">
            {t("say_more_with_threads")}
          </DialogTitle>
          <p className="text-center ">
            <span className="text-(--systemtext)">
              {t("join_threads_to_share_thoughts")}
            </span>
          </p>
        </div>
        <Button className="h-12">
          <Link
            to="/auth/login"
            className="text-background font-semibold text-xl!"
          >
            {t("login_threads")}
          </Link>
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;
