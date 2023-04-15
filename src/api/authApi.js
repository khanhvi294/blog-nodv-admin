import axiosClient, { axiosClientPrivate } from "./axiosClient";
const url = "/auth";
const authApi = {
  getAuthInfo: () => {
    return axiosClientPrivate.get(url + "/info");
  },
  login: (data) => axiosClient.post(url + "/signin", data),
};

export const { getAuthInfo, login } = authApi;
