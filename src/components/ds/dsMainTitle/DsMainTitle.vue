<script setup lang="ts">
	import { computed } from "vue";

	defineOptions({
		name: "DsMainTitle"
	});

	type TitleTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

	const {
		tag = "h1",
		fontSize = 32,
		marginBottom = 40,
		fontWeight = 700,
		color = "rgb(51, 55, 66)",
		lineHeight = 1.2
	} = defineProps<{
		title: string;
		tag?: TitleTag;
		fontSize?: number | string;
		marginBottom?: number | string;
		fontWeight?: number | string;
		color?: string;
		lineHeight?: number | string;
	}>();

	const toCssUnit = (value: number | string): string => {
		return typeof value === "number" ? `${value}px` : value;
	};

	const titleStyle = computed(() => ({
		fontSize: toCssUnit(fontSize),
		marginBottom: toCssUnit(marginBottom),
		fontWeight: String(fontWeight),
		color,
		lineHeight: String(lineHeight)
	}));
</script>

<template>
	<component :is="tag" class="ds-main-title" :style="titleStyle">
		{{ title }}
	</component>
</template>

<style scoped lang="scss">
	.ds-main-title {
		font-family:
			"Inter",
			"Segoe UI",
			"SF Pro Display",
			-apple-system,
			BlinkMacSystemFont,
			"Helvetica Neue",
			Arial,
			sans-serif;
	}
</style>
