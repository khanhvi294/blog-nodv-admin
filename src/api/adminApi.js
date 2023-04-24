import { generateParamsString } from "../utils/generateParamsString";
import { axiosClientPrivate } from "./axiosClient";

const url = "/admin";

const adminApi = {
  getAllReportings: () => axiosClientPrivate.get(`${url}/reporting`),
  getReportings: ({ page = 0, limit = 2 }) => {
    const paramsString = generateParamsString({ page, limit });
    return axiosClientPrivate.get(`${url}/reportings?${paramsString}`);
  },
  getReportingById: (id) => axiosClientPrivate.get(`${url}/reporting/${id}`),
  changeReportingStatus: (id) =>
    axiosClientPrivate.patch(`${url}/reporting/${id}`),
  getOverview: () => axiosClientPrivate.get(`${url}/overview`),
  getOverviewPosts: () => axiosClientPrivate.get(`${url}/overview/posts`),
  getOverviewUsers: () => axiosClientPrivate.get(`${url}/overview/users`),
  getOverviewReportings: () =>
    axiosClientPrivate.get(`${url}/overview/reportings`),
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
  getReportings,
  getOverviewPosts,
  getOverviewUsers,
  getOverviewReportings,
  getAllComment,
  getCommentById,
  deleteCommentById,
} = adminApi;

export default adminApi;
