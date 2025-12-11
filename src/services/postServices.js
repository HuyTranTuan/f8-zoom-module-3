import http from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getFeed = createAsyncThunk(
  "posts/getFeed",
  async ({ page = 1, feedType = "for_you" } = {}) => {
    const params = {
      page,
      per_page: 15,
    };

    if (localStorage.getItem("accessToken")) {
      params.type = feedType;
    }

    return await http.get("/posts/feed", { params });
  },
);

export const getLike = async (feedType = "for_you", page = 1) => {
  const response = await http.get("/posts/feed", {
    params: {
      type: feedType,
      page: page,
    },
  });
  return response;
};
export const getSavePost = async (feedType = "for_you", page = 1) => {
  const response = await http.get("/posts/feed", {
    params: {
      type: feedType,
      page: page,
    },
  });
  return response;
};

export const likePost = async (postId) => {
  const response = await http.post(`/posts/${postId}/like`);
  return response.data;
};

export const savePost = async (postId) => {
  const response = await http.post(`/posts/${postId}/save`);
  return response.data;
};

export const getSinglePost = async (id) => {
  return await http.get(`/posts/${id}`);
};
export const getReplies = async (id) => {
  return await http.get(`/posts/${id}/replies`);
};
export const createPost = async (data) => {
  const formData = new FormData();
  formData.append("content", data.content);
  if (data.media) {
    data.media.forEach((file) => {
      formData.append("media[]", file);
    });
  }
  const response = await http.post("posts", formData);
  return response.data;
};
export const _buildFormData = (data) => {
  const formData = new FormData();
  formData.append("content", data.content);

  if (data.media && data.media.length > 0) {
    data.media.forEach((file) => {
      formData.append("media[]", file);
    });
  } else {
    formData.append("media[]", "");
  }

  formData.append("reply_permission", data.reply_permission || "");
  return formData;
};
export const updatePost = async (id, data) => {
  const formData = postServices._buildFormData(data);
  const response = await http.put(`posts/${id}`, formData);
  return response.data;
};
export const hide = async (id) => {
  const response = await http.post(`posts/${id}/hide`);
  return response.data;
};
export const report = async ({ reason, description, id }) => {
  const response = await http.post(`posts/${id}/report`, {
    reason,
    description,
  });
  return response.data;
};
export const deletePost = async (id) => {
  const response = await http.post(`posts/${id}`, { _method: "DELETE" });
  return response.data;
};
