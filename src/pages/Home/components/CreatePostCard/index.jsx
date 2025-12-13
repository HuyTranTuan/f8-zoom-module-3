import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import CreatePostDialog from "@/components/CreatePostDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Button from "@/components/Button";
import { selectUser } from "@/features/auth";

function CreatePostCard() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation("Common");
  const currentUser = useSelector(selectUser);
  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Card className="bg-content-background border-card-border! py-4 transition-colors shadow-none rounded-none cursor-pointer border-0 border-b">
        <CardContent className="flex items-center p-2 gap-3">
          {/* Avatar */}
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={currentUser?.avatar}
              alt={currentUser?.username || "User"}
            />
            <AvatarFallback className="bg-gray-200 text-muted-foreground font-semibold">
              {currentUser?.username?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          {/* Placeholder giống input - clickable */}
          <div
            className="flex-1 px-4 py-2 text-muted-foreground text-md transition-colors"
            onClick={handleOpenDialog}
          >
            {t("messages.something")}
          </div>

          {/* Button Đăng */}
          <Button size="sm" className="rounded-xl" onClick={handleOpenDialog}>
            {t("buttons.post")}
          </Button>
        </CardContent>
      </Card>

      {/* Dialog tạo post */}
      <CreatePostDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}

export default CreatePostCard;
