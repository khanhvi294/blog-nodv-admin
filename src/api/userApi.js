import { axiosClientPrivate } from "./axiosClient";

const url = "/users";
const userApi = {
  updateCountNotifications: ({ userId, isIncrease }) => {
    return axiosClientPrivate.patch(
      `${url}/${userId}${!!isIncrease ? "?isIncrease=" + isIncrease : ""}`
    );
  },
  updateUserProfile: (data) => axiosClientPrivate.put(url, data),
  getAllUsers: () => axiosClientPrivate.get(`${url}/allUsers`),
  updateStatusUser: (id) =>
    axiosClientPrivate.patch(`${url}/updateStatusUser/${id}`),
};
export const {
  updateCountNotifications,
  getAllUsers,
  updateStatusUser,
  updateUserProfile,
} = userApi;
