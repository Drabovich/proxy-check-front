export type ProxyType = "http" | "socks";

export type ProxyStatus = "working" | "not_working" | "timeout";

export interface IProxyCheckRequest {
	proxies: string[];
}

export interface IProxyCheckSummary {
	total: number;
	working: number;
	duration_ms: number;
}

export interface IProxyCheckResult {
	address: string;
	type: ProxyType;
	status: ProxyStatus;
	timed_out: boolean;
	country?: string;
	city?: string;
	latency_ms?: number;
	external_ip?: string;
}

export interface IProxyCheckResponse {
	summary: IProxyCheckSummary;
	results: IProxyCheckResult[];
}
