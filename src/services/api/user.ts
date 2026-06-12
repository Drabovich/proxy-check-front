import type { IUserInfoResponse } from "@/utils/types/user";
import api from "@/utils/libs/axios";

export const getApiUserInfo = async (): Promise<IUserInfoResponse> => {
	const resp = await api.get(`/user/info`);
	return resp.data;
};
