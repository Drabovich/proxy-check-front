// 855881 / 855 881
export const formatNumber = (
	numValue: string | number | bigint | null | undefined,
	errorValue: string = "—",
	separator: string = " "
): string => {
	if (numValue === null || numValue === undefined) return errorValue;
	if (typeof numValue === "bigint") {
		return numValue.toLocaleString("en-US").replace(/,/g, separator);
	}
	const num = typeof numValue === "string" ? parseFloat(numValue) : numValue;
	if (Number.isNaN(num) || !Number.isFinite(num)) return errorValue;
	return num
		.toLocaleString("en-US", {
			maximumFractionDigits: 20,
			useGrouping: true
		})
		.replace(/,/g, separator);
};

// 591f3fcdc652cd3bbc69d3973ff699f88573cad9a8381ffbf4c06c5631eef8f2 / 591F3FCDC652CD3BBC69D3973FF699...EEF8F2
export const truncateText = (str: string, countPrefix: number = 14, countSuffix: number = 6): string => {
	if (!str) return "";
	const maxLength: number = Math.round(countPrefix + countSuffix);
	if (str.length <= maxLength) return str;
	const prefix: string = str.slice(0, countPrefix);
	const suffix: string = str.slice(-countSuffix);
	return prefix + "..." + suffix;
};

// ISO alpha-2 country code (GB, US) -> emoji flag (🇬🇧, 🇺🇸)
export const countryCodeToFlag = (countryCode: string): string => {
	if (!countryCode || countryCode.length !== 2) return "";
	return countryCode
		.toUpperCase()
		.split("")
		.map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
		.join("");
};
