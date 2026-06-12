import api from "@/utils/libs/axios";
import type { IProxyCheckRequest, IProxyCheckResponse } from "@/utils/types/proxy";

const PROXY_CHECK_TIMEOUT_MS = 120_000;

export const postApiProxyCheck = async (body: IProxyCheckRequest): Promise<IProxyCheckResponse> => {
	const resp = await api.post<IProxyCheckResponse>(`/proxy/check`, body, {
		timeout: PROXY_CHECK_TIMEOUT_MS
	});

	return resp.data;
};
