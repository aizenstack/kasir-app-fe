import axios from "axios";


const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

import { getToken, getRefreshToken, setToken, clearAuth } from "./auth";

http.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          // Asumsi endpoint refresh token adalah /auth/refresh-token
          // Sesuaikan dengan API backend Anda
          const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh-token`, {
            refreshToken: refreshToken
          });

          setToken(data.accessToken);

          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return http(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          clearAuth();
          window.location.href = '/auth/login';
          return Promise.reject(refreshError);
        }
      } else {
        clearAuth();
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

export default http;