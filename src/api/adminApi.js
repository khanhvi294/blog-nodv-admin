import { axiosClientPrivate } from "./axiosClient";

const url = "/admin";

const adminApi = {
  getAllReportings: () => axiosClientPrivate.get(`${url}/reporting`),
  getReportingById: (id) => axiosClientPrivate.get(`${url}/reporting/${id}`),
  changeReportingStatus: (id) =>
    axiosClientPrivate.patch(`${url}/reporting/${id}`),
  getOverview: () => axiosClientPrivate.get(`${url}/overview`),
  createWarning: (data) => axiosClientPrivate.post(`${url}/warning`, data),
  getAllComment: (page) =>
    axiosClientPrivate.get(`${url}/comments/list?page=${page}&limit=9`),
  getCommentById: (id) => axiosClientPrivate.get(`${url}/comment/${id}`),
  deleteCommentById: (id) => axiosClientPrivate.delete(`${url}/comment/${id}`),
};

export const {
  getAllReportings,
  getReportingById,
  changeReportingStatus,
  getOverview,
  createWarning,
  getAllComment,
  getCommentById,
  deleteCommentById,
} = adminApi;

export default adminApi;
