import { ref, onMounted, onUnmounted } from "vue";

export const isDesktopDevice = (): boolean => {
	const canHover: boolean = window.matchMedia("(hover: hover)").matches;
	const finePointer: boolean = window.matchMedia("(pointer: fine)").matches;
	return canHover && finePointer;
};

export function useMediaQuery(query: string) {
	const matches = ref(false);
	let mediaQuery: MediaQueryList;

	const update = () => {
		matches.value = mediaQuery.matches;
	};

	onMounted(() => {
		mediaQuery = window.matchMedia(query);
		update();
		mediaQuery.addEventListener("change", update);
	});

	onUnmounted(() => {
		mediaQuery.removeEventListener("change", update);
	});

	return matches;
}
