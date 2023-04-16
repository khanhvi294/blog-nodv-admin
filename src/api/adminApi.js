import { axiosClientPrivate } from "./axiosClient";

const url = "/admin";

const adminApi = {
  getAllReportings: () => axiosClientPrivate.get(`${url}/reporting`),
  getReportingById: (id) => axiosClientPrivate.get(`${url}/reporting/${id}`),
  changeReportingStatus: (id) =>
    axiosClientPrivate.patch(`${url}/reporting/${id}`),
};

export const { getAllReportings, getReportingById, changeReportingStatus } =
  adminApi;

export default adminApi;
