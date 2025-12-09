import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import FeedHeader from "@/features/feed/components/FeedHeader";
import FeedList from "@/features/feed/components/FeedList";
import {
  setPosts,
  appendPosts,
  setLoading,
  setError,
  setHasMore,
  incrementPage,
} from "@/features/feed/feedSlice";
import {
  selectIsAuthenticated,
  selectIsInitializing,
} from "@/features/auth/selectors";
import { postService } from "@/services/postServices";
import {
  restoreLikedPostsFromFeed,
  restoreLikedPostsFromStorage,
} from "@/features/post/postSlice";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import Loading from "@/components/Loading";

const Home = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const posts = useSelector((state) => state.feed.posts);
  const loading = useSelector((state) => state.feed.loading);
  const hasMore = useSelector((state) => state.feed.hasMore);
  const currentPage = useSelector((state) => state.feed.page);

  // Kiểm tra user đã đăng nhập chưa
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isInitializing = useSelector(selectIsInitializing);

  const [currentFeedType, setCurrentFeedType] = useState("for_you");

  // Restore liked posts từ localStorage khi component mount
  useEffect(() => {
    dispatch(restoreLikedPostsFromStorage());
  }, [dispatch]);

  // Fetch lần đầu Page 1 posts từ API
  useEffect(() => {
    (async () => {
      dispatch(setLoading(true));

      try {
        const response = await postService.getFeed(currentFeedType, 1);

        // Lấy data từ response
        const feedPosts = response.data || [];
        const pagination = response.pagination;

        dispatch(setPosts(feedPosts));
        dispatch(restoreLikedPostsFromFeed(feedPosts));

        //Check còn page không?
        if (pagination) {
          const hasNextPage = pagination.current_page < pagination.last_page;
          dispatch(setHasMore(hasNextPage));
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || t("cannot_load_post_retry");

        dispatch(setError(errorMessage));

        toast.error(t("fetch_feed_error"), {
          description: errorMessage,
        });
      }
    })();
  }, [dispatch, currentFeedType]);

  //Load post khi scroll đến cuối trang
  const fetchMorePosts = async () => {
    if (loading || !hasMore) return;

    dispatch(setLoading(true));

    try {
      const nextPage = currentPage + 1;
      const response = await postService.getFeed(currentFeedType, nextPage);

      const newPosts = response.data || [];
      const pagination = response.pagination;

      //Thêm post mới vào cuối danh sách
      dispatch(appendPosts(newPosts));
      // Restore liked posts từ API response cho posts mới
      dispatch(restoreLikedPostsFromFeed(newPosts));
      dispatch(incrementPage());

      //Check xem còn Page kế tiếp không?
      if (pagination) {
        const hasNextPage = pagination.current_page < pagination.last_page;
        dispatch(setHasMore(hasNextPage));
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || t("cannot_load_more");

      dispatch(setError(errorMessage));
      toast.error(t("cannot_load_more"), {
        description: errorMessage,
      });
    }
  };

  return (
    <div
      id="Home"
      className="w-full tablet:w-[100%-80px] h-dvh! overflow-hidden flex justify-center"
    >
      {/* Feed Column - Left */}
      <div className="w-full tablet:max-w-[370px]">
        <FeedHeader
          currentFeedType={currentFeedType}
          onFeedTypeChange={setCurrentFeedType}
        />

        {loading && posts.length === 0 ? (
          <Loading />
        ) : (
          <FeedList
            posts={posts}
            fetchMorePosts={fetchMorePosts}
            hasMore={hasMore}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};
export default Home;
