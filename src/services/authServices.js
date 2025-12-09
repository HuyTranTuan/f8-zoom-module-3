import http from "@/utils/http";

export const authService = {
  login: async (credentials) => {
    const response = await http.post("/auth/login", {
      login: credentials.username,
      password: credentials.password,
    });
    return response.data;
  },

  register: async (userData) => {
    const response = await http.post("/auth/register", {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      password_confirmation: userData.password_confirmation,
    });

    return response.data;
  },

  validateUsername: async (username) => {
    const response = await http.post("/auth/validate/username", {
      username,
    });
    return response.data;
  },

  validateEmail: async (email) => {
    const response = await http.post("/auth/validate/email", {
      email,
    });
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await http.post("/auth/forgot-password", {
      email: email,
    });

    return response.data;
  },

  validateResetToken: async (token, email) => {
    const response = await http.get("/auth/reset-password/validate", {
      params: { token, email },
    });

    return response.data;
  },

  resetPassword: async (data) => {
    const response = await http.post("/auth/reset-password", {
      token: data.token,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    });

    return response.data;
  },

  getCurrentUser: async () => {
    const response = await http.get("/auth/user");
    return response.data;
  },
};
