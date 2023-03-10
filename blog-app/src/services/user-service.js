import { myAxios, privateAxios } from "./handler";

export const signUp = (user) => {
	return myAxios
		.post("/api/v1/auth/register", user)
		.then((response) => response.data);
};

export const login = (user) => {
	return myAxios
		.post("/api/v1/auth/login", user)
		.then((response) => response.data);
};

export const getUser = (userId) => {
	return myAxios
		.get(`/api/users?userId=${userId}`)
		.then((response) => response.data);
};

export const updateUserService = (userId,user) => {
	return privateAxios
		.put(`/api/users?userId=${userId}`,user)
		.then((resp) => resp.data);
};
