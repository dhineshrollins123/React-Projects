import axios from "axios";
import { getToken } from "../auth/auth";

export const BASE_URL = "http://localhost:8080";

export const myAxios = axios.create({
	baseURL: BASE_URL
});

let token = getToken();

export const privateAxios = axios.create({
	baseURL: BASE_URL
});

setInterval(() => {
	token = getToken()
}, 120000);

if (token !== null) {
	console.log("token available 2");
	privateAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
