import { defineStore } from "pinia";
import { ref } from "vue";
import type { IUserInfoResponse } from "@/utils/types/user";
import { getApiUserInfo } from "@/services/api/user";
import { getApiSession, postApiLogOut } from "@/services/api/auth.ts";

export const useAuthStore = defineStore("auth", () => {
	const isLoggedIn = ref<boolean>(false);
	const isLoadingLogOut = ref<boolean>(false);
	const userInfo = ref<IUserInfoResponse | null>(null);

	const getUserInfo = async () => {
		try {
			const data = await getApiUserInfo();
			if (data) {
				userInfo.value = data;
			}
		} catch (error) {
			console.error(error);
		}
	};

	const getSession = async () => {
		try {
			const data = await getApiSession();
			if (data) {
				isLoggedIn.value = data.isLoggedIn;
			}
		} catch (error) {
			console.error(error);
		}
	};

	const postLogOut = async () => {
		try {
			isLoadingLogOut.value = true;
			await postApiLogOut();
			window.location.replace("/auth/sign-in");
		} catch (error) {
			console.error(error);
		} finally {
			isLoadingLogOut.value = false;
		}
	};

	return {
		isLoggedIn,
		isLoadingLogOut,
		userInfo,
		postLogOut,
		getSession,
		getUserInfo
	};
});
