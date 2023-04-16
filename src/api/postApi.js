import { axiosClientPrivate } from './axiosClient';
import { generateParamsString } from '../utils/generateParamsString';

const url = '/posts';
const postApi = {
	getPosts: ({
		page = 0,
		limit = 9,
		id = null,
		topic = null,
		title = null,
		user = null,
		sort = null,
		direction = null,
		isFollowing = null,
	}) => {
		const params = {
			id,
			page,
			limit,
			topic,
			user,
			title,
			isFollowing,
			sort,
			direction,
			sortBy: sort,
		};
		const paramsString = generateParamsString(params);
		return axiosClientPrivate.get(`${url}?${paramsString}`);
	},
	lockPost: (id) => axiosClientPrivate.patch(`/admin${url}/${id}/lock`),
	unlockPost: (id) => axiosClientPrivate.patch(`/admin${url}/${id}/unlock`),
};

export const { getPosts, lockPost, unlockPost } = postApi;
