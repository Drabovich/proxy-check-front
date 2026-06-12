import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useAuthStore } from "@/stores/auth";

export const guest = (to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext) => {
	if (useAuthStore().isLoggedIn) {
		return next({ name: "dashboard" });
	}
	return next();
};
