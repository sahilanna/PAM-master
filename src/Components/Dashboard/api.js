import axios from "axios";
import { ngrokUrl } from "../../Assets/config";

let token = null;
const getAccessToken = () => {
  if(!token){
  const auth = JSON.parse(sessionStorage.getItem("item"));
  token = auth.token;
  console.log("token",token)
  }
  return token;
};


const api = axios.create({
  baseURL:ngrokUrl,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["AccessToken"] = token;
      config.headers["ngrok-skip-browser-warning"]="true"
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
    const originalConfig = err.config;
    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const token=getAccessToken()
          window.localStorage.setItem("AccessToken", token);
          api.defaults.headers.common["AccessToken"] = token;
          return api(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }
    return Promise.reject(err);
  }
);
export default api;




