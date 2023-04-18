import { axiosClientPrivate } from "./axiosClient";

const url = "/admin";

const adminApi = {
  getAllReportings: () => axiosClientPrivate.get(`${url}/reporting`),
  getReportingById: (id) => axiosClientPrivate.get(`${url}/reporting/${id}`),
  changeReportingStatus: (id) =>
    axiosClientPrivate.patch(`${url}/reporting/${id}`),
  getOverview: () => axiosClientPrivate.get(`${url}/overview`),
  createWarning: (data) => axiosClientPrivate.post(`${url}/warning`, data),
};

export const {
  getAllReportings,
  getReportingById,
  changeReportingStatus,
  getOverview,
  createWarning,
} = adminApi;

export default adminApi;
