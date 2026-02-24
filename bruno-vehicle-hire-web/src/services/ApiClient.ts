import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "X-Bruno-API-Key": import.meta.env.VITE_API_KEY,
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data;
    if (data?.errors) {
      const message = Object.values(data.errors).flat().join(", ");
      return Promise.reject(new Error(message));
    }
    if (data?.error) return Promise.reject(new Error(data.error));
    return Promise.reject(new Error("An unexpected error occurred."));
  },
);

export default apiClient;
