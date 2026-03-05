import axios from "axios";


// (import.meta.env.VITE_API_URL as string) || 
const API_BASE_URL = "http://localhost:5156/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("jutc_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("jutc_token");
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);
