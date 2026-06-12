<script setup lang="ts">
	import { computed } from "vue";
	import { storeToRefs } from "pinia";
	import { UiButton, UiTag } from "@dv.net/ui-kit";
	import { useAuthStore } from "@/stores/auth";

	const { isLoggedIn } = storeToRefs(useAuthStore());

	const homeRoute = computed(() => (isLoggedIn.value ? { name: "dashboard" } : { name: "home" }));
</script>

<template>
	<section class="not-found">
		<div class="not-found__card">
			<p class="not-found__code" aria-hidden="true">404</p>

			<ui-tag class="not-found__tag" text="404" mode="neutral" size="md" />

			<h1 class="not-found__title">Page not found</h1>
			<p class="not-found__description">
				This page does not exist or has been moved. Check the URL or return to the home page.
			</p>

			<div class="not-found__actions">
				<ui-button
					type="primary"
					mode="neutral"
					size="lg"
					:to="homeRoute"
					left-icon-type="400"
					left-icon-name="arrow-back"
				>
					Go home
				</ui-button>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
	.not-found {
		width: 100%;
		max-width: 480px;
		&__card {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			padding: 48px 32px 40px;
			border-radius: 16px;
			border: 1px solid #e8eaf0;
			background: $white;
			overflow: hidden;
			box-shadow: 0 8px 32px rgb(48 51 69 / 6%);
		}

		&__code {
			position: absolute;
			top: 50%;
			left: 50%;
			margin: 0;
			font-size: clamp(120px, 28vw, 180px);
			font-weight: 700;
			line-height: 1;
			letter-spacing: -0.04em;
			color: rgb(48 51 69 / 5%);
			transform: translate(-50%, -58%);
			user-select: none;
			pointer-events: none;
		}

		&__tag {
			position: relative;
			z-index: 1;
			margin-bottom: 16px;
		}

		&__title {
			position: relative;
			z-index: 1;
			margin: 0 0 12px;
			font-size: 24px;
			font-weight: 700;
			line-height: 1.25;
			letter-spacing: -0.02em;
			color: $black;
		}

		&__description {
			position: relative;
			z-index: 1;
			margin: 0 0 28px;
			max-width: 320px;
			font-size: 15px;
			line-height: 1.5;
			color: $secondary;
		}

		&__actions {
			position: relative;
			z-index: 1;
			display: flex;
			justify-content: center;
			width: 100%;
		}
	}
</style>
