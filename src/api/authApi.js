import { axiosClientPrivate } from "./axiosClient";
const url = "/auth";
const authApi = {
  getAuthInfo: () => {
    return axiosClientPrivate.get(url + "/info");
  },
};

export const { getAuthInfo } = authApi;
