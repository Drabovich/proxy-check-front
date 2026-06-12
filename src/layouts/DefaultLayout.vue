<script setup lang="ts">
	import { RouterLink } from "vue-router";
	import { UiButton, UiIcon } from "@dv.net/ui-kit";
	import { storeToRefs } from "pinia";
	import { useAuthStore } from "@/stores/auth";

	const { postLogOut } = useAuthStore();
	const { isLoadingLogOut } = storeToRefs(useAuthStore());
</script>

<template>
	<div class="default-layout">
		<header class="default-layout__header">
			<div class="default-layout__header-inner">
				<RouterLink :to="{ name: 'dashboard' }" class="default-layout__logo">
					<span class="default-layout__logo-icon" aria-hidden="true">
						<ui-icon name="dns" type="filled" size="lg" />
					</span>
					<span class="default-layout__logo-text">
						<span class="default-layout__brand">
							Proxy<span class="default-layout__brand-accent">check</span>
						</span>
					</span>
				</RouterLink>

				<ui-button
					class="default-layout__logout"
					type="outline"
					mode="neutral"
					size="md"
					left-icon-type="400"
					left-icon-name="logout"
					:loading="isLoadingLogOut"
					@click="postLogOut"
				>
					Log out
				</ui-button>
			</div>
		</header>

		<main class="default-layout__main">
			<div class="default-layout__container">
				<slot />
			</div>
		</main>
	</div>
</template>

<style scoped lang="scss">
	.default-layout {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		min-height: 100%;
		background: $background-block;

		&__header {
			flex-shrink: 0;
			border-bottom: 1px solid $border;
			background: $white;
		}

		&__header-inner {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 16px;
			max-width: $maxWidthContainer + px;
			width: 100%;
			min-height: 72px;
			margin: 0 auto;
			padding: 12px $padding-main + px;
		}

		&__logo {
			display: flex;
			align-items: center;
			gap: 12px;
			min-width: 0;
			text-decoration: none;
			color: inherit;
			transition: opacity 0.2s ease;

			@media (hover: hover) {
				&:hover {
					opacity: 0.85;
				}
			}
		}

		&__logo-icon {
			display: flex;
			flex-shrink: 0;
			align-items: center;
			justify-content: center;
			width: 44px;
			height: 44px;
			border-radius: 12px;
			border: 1px solid $border;
			background: linear-gradient(160deg, $white 0%, $background-block 100%);
			color: $black;
			box-shadow: 0 2px 10px rgb(48 51 69 / 6%);
		}

		&__logo-text {
			min-width: 0;
		}

		&__brand {
			font-size: 20px;
			font-weight: 700;
			line-height: 1.15;
			letter-spacing: -0.03em;
			color: $black;
		}

		&__brand-accent {
			font-weight: 500;
			color: $secondary;
		}

		&__logout {
			flex-shrink: 0;
		}

		&__main {
			flex-grow: 1;
			display: flex;
			padding: 32px 0 64px;
		}

		&__container {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			max-width: $maxWidthContainer + px;
			width: 100%;
			margin: 0 auto;
			padding: 0 $padding-main + px;
		}
	}
</style>
