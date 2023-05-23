import axios from "axios";
import { CookieKeys } from "./constant";
import { CookieStorage } from "./setup-cokkies";

const http = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
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
    return Promise.reject(error);
  }
);

export default http;
