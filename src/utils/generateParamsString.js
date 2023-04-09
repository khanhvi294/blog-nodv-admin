export const generateParamsString = (params) => {
	return Object.keys(params)
		.filter((key) => params[key] !== null)
		.map((key) => `${key}=${params[key]}`)
		.join('&');
};
