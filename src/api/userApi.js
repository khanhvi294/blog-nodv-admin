import { axiosClientPrivate } from "./axiosClient";

const url = "/users";
const userApi = {
  updateCountNotifications: ({ userId, isIncrease }) => {
    return axiosClientPrivate.patch(
      `${url}/${userId}${!!isIncrease ? "?isIncrease=" + isIncrease : ""}`
    );
  },
};
export const { updateCountNotifications } = userApi;
