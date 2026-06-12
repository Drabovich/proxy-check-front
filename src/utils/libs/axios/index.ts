import axios, { type AxiosInstance, HttpStatusCode } from "axios";
import { useAuthStore } from "@/stores/auth";
import { useNotifications } from "@/utils/composables/useNotifications";

const { notify } = useNotifications();

const REQUEST_TIMEOUT_MS: number = 10_000;

const api: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: REQUEST_TIMEOUT_MS,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json"
	}
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		// Pass { suppressNotify: true } in the request config to skip error notifications
		if (!error?.config?.suppressNotify) {
			if (error?.response?.data?.message) {
				notify(error.response.data.message);
			} else {
				notify(error.message || "Unknown error");
			}
		}
		if (error.response.status === HttpStatusCode.Unauthorized) {
			useAuthStore().postLogOut();
		}
		return Promise.reject(error);
	}
);
export default api;
