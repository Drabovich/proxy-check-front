import { PROXY_LINE_REGEX } from "@/utils/constants/regex";

export const isValidProxyLine = (line: string): boolean => {
	if (!PROXY_LINE_REGEX.test(line)) return false;

	const port = Number(line.split(":")[1]);
	return port >= 1 && port <= 65535;
};

export const parseProxyLines = (text: string): string[] => {
	return text
		.split("\n")
		.map((line) => line.trim())
		.filter(Boolean);
};

export const getInvalidProxyLines = (lines: string[]): string[] => {
	return lines.filter((line) => !isValidProxyLine(line));
};
