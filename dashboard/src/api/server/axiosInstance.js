import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 30000,
});

// Map to track and cancel pending GET requests across all pages
const pendingGetRequests = new Map();

axiosInstance.interceptors.request.use((req) => {
  // Cancel previous pending request to the same endpoint + query params for GET requests
  if (req.method?.toLowerCase() === "get") {
    let paramsKey = "";
    if (req.params) {
      try {
        paramsKey = typeof req.params === "object" ? JSON.stringify(req.params) : String(req.params);
      } catch {
        paramsKey = "";
      }
    }
    const urlKey = `${req.url || ""}?${paramsKey}`;
    if (pendingGetRequests.has(urlKey)) {
      const prevController = pendingGetRequests.get(urlKey);
      prevController.abort();
      pendingGetRequests.delete(urlKey);
    }

    const controller = new AbortController();
    req.signal = req.signal || controller.signal;
    pendingGetRequests.set(urlKey, controller);
    req._pendingKey = urlKey;
  }

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
  (res) => {
    const key = res.config?._pendingKey || res.config?.url;
    if (key && pendingGetRequests.has(key)) {
      pendingGetRequests.delete(key);
    }
    return res;
  },
  (error) => {
    const key = error.config?._pendingKey || error.config?.url;
    if (key && pendingGetRequests.has(key)) {
      pendingGetRequests.delete(key);
    }

    // Gracefully ignore intentional request cancellations
    if (
      axios.isCancel(error) ||
      error.name === "CanceledError" ||
      error.code === "ERR_CANCELED"
    ) {
      return new Promise(() => {});
    }

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("appState");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
