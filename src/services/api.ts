import {
  debugLog,
  getItemFromLocalStorage,
  setItemToLocalStorage,
} from "@/utils";

import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  withCredentials: true,
});

// Append Authorization header
api.interceptors.request.use(
  (config) => {
    const accessToken = getItemFromLocalStorage("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Refresh token interceptor
api.interceptors.response.use(undefined, async (error) => {
  const originalRequest = error.config;

  if (
    error.response?.data?.code === "EXPIRED_ACCESS_TOKEN" &&
    originalRequest &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true;

    try {
      const {
        data: { accessToken: newAccessToken },
      } = await api.post("/auth/refresh-token");

      setItemToLocalStorage("accessToken", newAccessToken);
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (error) {
      debugLog(error, "REFRESH_TOKEN_ERROR");
      return Promise.reject(error);
    }
  }

  if (error.response?.data?.code === "REFRESH_TOKEN_NOT_PROVIDED") {
    debugLog(error, "REFRESH_TOKEN_NOT_PROVIDED");
    return Promise.reject(error.response.data.message);
  }

  return Promise.reject(error);
});

export default api;
