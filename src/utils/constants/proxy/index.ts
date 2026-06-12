import type { UiTagMode } from "@dv.net/ui-kit/dist/components/UiTag/types";
import type { ProxyStatus, ProxyType } from "@/utils/types/proxy";

export const PROXIES_PLACEHOLDER = "80.150.246.98:443\n45.144.49.156:1080\n212.58.132.5:1080";

export const PROXY_TYPE_LABELS: Record<ProxyType, string> = {
	http: "HTTP",
	socks: "SOCKS"
};

export const PROXY_STATUS_LABELS: Record<ProxyStatus, string> = {
	working: "Working",
	not_working: "Not working",
	timeout: "Timeout"
};

export const PROXY_STATUS_MODES: Record<ProxyStatus, UiTagMode> = {
	working: "positive",
	not_working: "negative",
	timeout: "warning"
};
