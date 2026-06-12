import api from "@/utils/libs/axios";
import type { ISignInRequest, ISignUpRequest, ISessionResponse } from "@/utils/types/auth";

export const postApiSignIn = async (body: ISignInRequest) => {
	await api.post(`/auth/sign-in`, body);
};

export const postApiSignUp = async (body: ISignUpRequest) => {
	await api.post(`/auth/sign-up`, body);
};

export const postApiLogOut = async () => {
	await api.post(`/auth/log-out`);
};

export const getApiSession = async (): Promise<ISessionResponse> => {
	const resp = await api.get(`/auth/session`);
	return resp.data;
};
