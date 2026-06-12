import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useAuthStore } from "@/stores/auth";

export const auth = async (to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext) => {
	if (!useAuthStore().isLoggedIn) {
		return next({ name: "sign-in" });
	}
	return next();
};
