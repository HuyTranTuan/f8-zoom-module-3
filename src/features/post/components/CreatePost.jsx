import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { postServices } from "@/services";
import { addPostToFeed } from "@/features/feed";
import { Button } from "@/components/ui/button";

const CreatePost = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || {
    username: "Guest",
    avatar: "",
  };

  const handlePost = async () => {
    if (!content.trim()) return;

    setIsPosting(true);
    try {
      const response = await postServices.createPost({
        content,
        user: {
          username: user.username,
          avatar: user.avatar || "https://github.com/shadcn.png",
        },
      });

      if (response.success) {
        dispatch(addPostToFeed(response.data));
        setContent("");
        toast.success(t("post_successed"));
      }
    } catch (error) {
      toast.error(t("post_failed"));
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="p-2.5! rounded-xl! border-2! border-border! mb-2.5!">
      <div className="flex gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={user.avatar || "https://github.com/shadcn.png"} />
          <AvatarFallback>{user.username[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2!">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm">{user.username}</span>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t("write_sth")}
            className="w-full bg-transparent border-none resize-none focus:ring-0 p-0 text-foreground placeholder:text-foreground-tertiary min-h-[50px]"
            disabled={isPosting}
          />
          <div className="flex justify-end">
            <Button
              onClick={handlePost}
              size="sm"
              className="rounded-md p-3 text-background bg-foreground"
            >
              {isPosting ? t("posting") : t("post")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
