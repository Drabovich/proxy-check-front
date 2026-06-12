<script setup lang="ts">
	import { useRoute } from "vue-router";
	import { type Component, computed, onMounted } from "vue";
	import DefaultLayout from "@/layouts/DefaultLayout.vue";
	import EmptyLayout from "@/layouts/EmptyLayout.vue";
	import type { LayoutNames } from "@/layouts";
	import AuthLayout from "@/layouts/AuthLayout.vue";

	const route = useRoute();

	const layouts: Record<LayoutNames, Component> = {
		"auth-layout": AuthLayout,
		"default-layout": DefaultLayout,
		"empty-layout": EmptyLayout
	};

	const resolveLayout = computed(() => {
		return layouts[route.meta.layout as keyof typeof layouts];
	});
</script>

<template>
	<component :is="resolveLayout">
		<RouterView />
	</component>
</template>
