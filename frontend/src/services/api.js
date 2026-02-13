import axios from "axios";

// 🔥 Force correct backend URL (no env issues)
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🧪 Debug log to confirm frontend uses correct URL
console.log("✅ Axios Base URL:", api.defaults.baseURL);

// Add token to every request if it exists
api.interceptors.request.use((config) => {
  console.log("🚀 Sending request to:", config.baseURL + config.url); // debug request URL

  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ API ERROR:", error?.response?.status, error?.config?.url);

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
