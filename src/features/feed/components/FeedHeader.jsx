import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  selectIsAuthenticated,
  selectIsInitializing,
} from "@/features/auth/selectors";
import { useSelector } from "react-redux";

const FeedHeader = ({ currentFeedType, onFeedTypeChange }) => {
  // Kiểm tra user đã đăng nhập chưa
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isInitializing = useSelector(selectIsInitializing);
  return (
    <>
      <header className="h-[90px] bg-background/95 backdrop-blur-md">
        <div className="h-full flex items-center justify-center gap-8 px-6 relative z-10">
          <button
            onClick={() => onFeedTypeChange("for_you")}
            className={cn(
              "relative py-4 px-2 text-base font-semibold transition-colors",
              currentFeedType === "for_you"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Dành cho bạn
            {currentFeedType === "for_you" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full" />
            )}
          </button>
          <button
            onClick={() => onFeedTypeChange("following")}
            className={cn(
              "relative py-4 px-2 text-base font-semibold transition-colors",
              currentFeedType === "following"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Đang follow
            {currentFeedType === "following" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full" />
            )}
          </button>
        </div>
      </header>
    </>
  );
};
export default FeedHeader;
