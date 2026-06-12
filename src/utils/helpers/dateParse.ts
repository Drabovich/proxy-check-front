import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import { DATE_FORMATS } from "@/utils/constants/general";
import { getTimeZoneUser } from "@/utils/helpers/locale";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

// Formats an ISO date string into the given timezone and output format.
export const formatDate = (date: any, format?: string, timeZone?: string, errorValue: string = "—"): string => {
	try {
		if (!date || typeof date !== "string") return errorValue;
		// Get date format
		const resultDateFormat: string = format || DATE_FORMATS.US_DATETIME;
		// Get timezone
		const browserTimeZone: string | null = getTimeZoneUser();
		const resultTimeZone: string = timeZone || browserTimeZone || "UTC";
		// Return formatted date
		return dayjs.utc(date).tz(resultTimeZone).format(resultDateFormat);
	} catch (error: any) {
		console.error(error);
		return errorValue;
	}
};
