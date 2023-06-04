import axios from "axios";
import { CookieStorage, CookieKeys } from "./cookies";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-api-key": "j9361zel0oh68u5etulvv38tcclolz",
  },
});

// Change request data/error here
http.interceptors.request.use(
  (config) => {
    // const token = getToken();
    const authToken = CookieStorage.get(CookieKeys.AuthToken);
    const token = authToken;
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token ? token : ""}`,
    };
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      CookieStorage.remove(CookieKeys.AuthToken);
      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  }
);

export default http;
