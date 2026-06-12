// Returns the browser IANA timezone (e.g. America/New_York).
export const getTimeZoneUser = (): string | null => {
	return Intl.DateTimeFormat().resolvedOptions().timeZone || null;
};
