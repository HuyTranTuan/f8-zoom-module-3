import { createSlice } from "@reduxjs/toolkit";

import { getFeed, login } from "@/services";
import { logout } from "@/features/auth";

const initialState = {
  posts: [],
  pagination: {
    current_page: 1,
    total: 0,
    last_page: 1,
    per_page: 15,
  },
  loading: false,
  error: null,
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    //Set danh sách post
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.page = 1; // Reset page về 1
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    //Tạo infinite scroll
    appendPosts: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      ((state.error = action.payload), (state.loading = false));
    },
    //Update khi có thay đổi (like, cmt)
    updatePost: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id,
      );
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    //Đếm số page
    incrementPage: (state) => {
      state.page += 1;
    },
    resetFeed: (state) => {
      state.posts = [];
      state.pagination = initialState.pagination;
    },
    addPostToFeed: (state, action) => {
      state.posts.unshift(action.payload);
    },
    removePostFromFeed: (state, action) => {
      const postId = action.payload;
      state.posts = state.posts.filter((post) => post.id !== postId);
    },
    removePostsByUserId: (state, action) => {
      const userId = action.payload;
      state.posts = state.posts.filter((post) => post.user?.id !== userId);
    },
    updatePostContent: (state, action) => {
      const updatedPost = action.payload;
      state.posts = state.posts.map((post) => {
        if (post.id === updatedPost.id) {
          return { ...post, ...updatedPost };
        }
        return post;
      });
    },
    updatePostLike: (state, action) => {
      const { postId, is_liked_by_auth, likes_count } = action.payload;
      state.posts = state.posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            is_liked_by_auth,
            likes_count,
          };
        }
        return post;
      });
    },
    updatePostReplies: (state, action) => {
      const { postId, replies_count } = action.payload;
      state.posts = state.posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            replies_count,
          };
        }
        return post;
      });
    },
    updatePostReposts: (state, action) => {
      const { postId, reposts_and_quotes_count, is_reposted_by_auth } =
        action.payload;
      state.posts = state.posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            is_reposted_by_auth,
            reposts_and_quotes_count,
          };
        }
        return post;
      });
    },
    updatePostQuotes: (state, action) => {
      const { original_post_id } = action.payload;
      state.posts = state.posts.map((post) => {
        if (post.id === original_post_id) {
          return {
            ...post,
            reposts_and_quotes_count: post.reposts_and_quotes_count + 1,
          };
        }

        if (post.original_post?.id === original_post_id) {
          return {
            ...post,
            original_post: {
              ...post.original_post,
              reposts_and_quotes_count:
                post.original_post.reposts_and_quotes_count + 1,
            },
          };
        }
        return post;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.loading = false;
        const { data, pagination } = action.payload;

        state.pagination = pagination;

        if (pagination.current_page === 1) {
          state.posts = data;
        } else {
          const newPosts = data.filter(
            (newPost) =>
              !state.posts.some(
                (existingPost) => existingPost.id === newPost.id,
              ),
          );
          state.posts = [...state.posts, ...newPosts];
        }
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setPosts,
  addPost,
  appendPosts,
  setLoading,
  setError,
  updatePost,
  setHasMore,
  incrementPage,
  resetFeed,
  addPostToFeed,
  removePostFromFeed,
  removePostsByUserId,
  updatePostContent,
  updatePostLike,
  updatePostReplies,
  updatePostReposts,
  updatePostQuotes,
} = feedSlice.actions;

export const { reducerPath } = feedSlice.reducerPath;

export default feedSlice.reducer;
