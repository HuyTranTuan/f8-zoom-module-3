import http from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getList = createAsyncThunk(
  "product/getList",
  async ({ limit = 10, page = 1 }) => {
    const response = await http.get(`/products?limit=${limit}&page=${page}`);
    return response.data;
  },
);

export const postService = {
  //Lấy feed posts
  getFeed: async (feedType = "for_you", page = 1) => {
    const response = await http.get("/posts/feed", {
      params: {
        type: feedType,
        page: page,
      },
    });
    return response;
  },

  getLike: async (feedType = "for_you", page = 1) => {
    const response = await http.get("/posts/feed", {
      params: {
        type: feedType,
        page: page,
      },
    });
    return response;
  },
  getSavePost: async (feedType = "for_you", page = 1) => {
    const response = await http.get("/posts/feed", {
      params: {
        type: feedType,
        page: page,
      },
    });
    return response;
  },

  likePost: async (postId) => {
    const response = await http.post(`/posts/${postId}/like`);
    return response.data;
  },

  savePost: async (postId) => {
    const response = await http.post(`/posts/${postId}/like`);
    return response.data;
  },
};
