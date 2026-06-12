import { useAuthStore } from "@/stores/auth";

export const hideAppLoader = () => {
	const loader = document.getElementById("app-loader");
	if (!loader) return;

	loader.classList.add("app-loader--hide");
	loader.setAttribute("aria-busy", "false");

	const remove = () => loader.remove();
	loader.addEventListener("transitionend", remove, { once: true });
	window.setTimeout(remove, 450);
};

export const init = async () => {
	try {
		const authStore = useAuthStore();
		await authStore.getSession();
		if (authStore.isLoggedIn) {
			await authStore.getUserInfo();
		}
	} catch (error) {
		console.error(error);
	}
};
