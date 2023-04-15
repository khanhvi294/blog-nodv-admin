import { appRoutes } from "../routers/AppRoutes";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { logout } from "../redux/slices/userSlice";
import { setIsCallLogin } from "../redux/slices/authSlice";
import store from "../redux/store";

const baseURL = process.env.REACT_APP_API_URL;
const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
    "content-type": "application/json",
  },
  credentials: "include",
  withCredentials: true,
});

export const axiosClientPrivate = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
    "content-type": "application/json",
  },
  credentials: "include",
  timeout: 60000,
  withCredentials: true,
});

axiosClientPrivate.interceptors.request.use(
  async (config) => {
    const accessToken = store.getState().user.data.accessToken;
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    if (accessToken === null) {
      store.dispatch(setIsCallLogin(true));
    } else {
      const decodeToken = jwt_decode(accessToken);
      const today = new Date();
      if (decodeToken.exp < today.getTime() / 1000) {
        store.dispatch(logout());
        window.location.href = appRoutes.AUTH_LOGIN;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error.response.data);
  }
);

axiosClientPrivate.interceptors.response.use(
  function (response) {
    console.log("response ", response);

    return response.data;
  },
  function (error) {
    console.log("error axios ", error);

    if (error.code === "ERR_NETWORK") {
      // window.location.href = '/404';
    }
    // return Promise.reject(error.data);
    return error;
  }
);

axiosClient.interceptors.request.use(
  async (config) => {
    const accessToken = store.getState()?.user?.data?.accessToken;
    if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error.response.data);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error.response.data);
  }
);

export default axiosClient;
