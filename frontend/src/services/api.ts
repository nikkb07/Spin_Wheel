import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);

    return Promise.reject(error);
  }
);
console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
export default api;