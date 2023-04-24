import { axiosClientPrivate } from "./axiosClient";

const url = "/users";

const userApi = {
  updateCountNotifications: ({ userId, isIncrease }) => {
    return axiosClientPrivate.patch(
      `${url}/${userId}${!!isIncrease ? "?isIncrease=" + isIncrease : ""}`
    );
  },
  resetCountNotifications: () => {
    return axiosClientPrivate.patch(`${url}/notifications-count/reset`);
  },

  getAllUsers: () => axiosClientPrivate.get(`/admin${url}/allUsers`),
  updateStatusUser: (id) =>
    axiosClientPrivate.patch(`/admin${url}/updateStatusUser/${id}`),
  updateUserProfile: (data) => axiosClientPrivate.put(url, data),
};
export const {
  updateCountNotifications,
  getAllUsers,
  updateStatusUser,
  resetCountNotifications,
  updateUserProfile,
} = userApi;
