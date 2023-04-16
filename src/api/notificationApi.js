import { axiosClientPrivate } from './axiosClient';
import { generateParamsString } from '../utils/generateParamsString';

const url = '/notifications';

const notificationApi = {
	getNotifications: (optional = { page: 0, limit: 9, isRead: null }) => {
		const { page = null, limit = null, isRead = null } = optional || {};
		const params = generateParamsString({ page, limit, isRead });
		return axiosClientPrivate.get(`${url}?${params}`);
	},
	setIsRead: (id) => axiosClientPrivate.patch(`${url}/${id}`),
	createNotification: (notification) =>
		axiosClientPrivate.post(`${url}`, notification),
};

export const setNotificationRead = async (id) => {
	const response = await axiosClientPrivate.patch(`${url}/${id}`, null);
	return response.data;
};

export const { getNotifications, setIsRead, createNotification } =
	notificationApi;

export default notificationApi;
