import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
});

axiosInstance.interceptors.request.use((req) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // Ignore error and proceed without auth token
  }

  return req;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("appState");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
