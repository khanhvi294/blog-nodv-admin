import { axiosClientPrivate } from "./axiosClient";

const url = "/api/admin";

const warningApi = {
  createWarning: (warning) =>
    axiosClientPrivate.post(`${url}/warning/${userId}`, warning),
};

export const { createWarning } = warningApi;

export default warningApi;
