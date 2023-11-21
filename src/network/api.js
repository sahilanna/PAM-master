import axios from "axios";
import { NGROK_URL } from "./config";
import { Navigate } from "react-router-dom";
let token = null;
const getAccessToken = () => {
  if (!token) {
    const auth = JSON.parse(sessionStorage.getItem("item"));
    token = auth.token;
  }
  return token;
};

const api = axios.create({
  baseURL: NGROK_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["AccessToken"] = token;
      config.headers["ngrok-skip-browser-warning"] = "true";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    if (err.response) {
      if (err.response.status === 401) {
        Navigate("/Login");
      } else if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }
    return Promise.reject(err);
  }
);
export default api;
