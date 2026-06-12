<script setup lang="ts">
	import { computed } from "vue";
	import { RouterLink, useRoute } from "vue-router";
	import { UiIcon, UiLink } from "@dv.net/ui-kit";

	type AuthRouteName = "sign-in" | "sign-up";

	const route = useRoute();

	const authPages: Record<
		AuthRouteName,
		{
			title: string;
			subtitle: string;
			footerText: string;
			footerLink: { name: AuthRouteName };
			footerLinkLabel: string;
		}
	> = {
		"sign-in": {
			title: "Sign in",
			subtitle: "Sign in to your account to continue",
			footerText: "Don't have an account?",
			footerLink: { name: "sign-up" },
			footerLinkLabel: "Sign up"
		},
		"sign-up": {
			title: "Sign up",
			subtitle: "Create an account to get started",
			footerText: "Already have an account?",
			footerLink: { name: "sign-in" },
			footerLinkLabel: "Sign in"
		}
	};

	const page = computed(() => authPages[route.name as AuthRouteName]);
</script>

<template>
	<section class="auth-layout">
		<div class="auth-layout__card">
			<header class="auth-layout__header">
				<RouterLink :to="{ name: 'home' }" class="auth-layout__logo">
					<span class="auth-layout__logo-icon" aria-hidden="true">
						<ui-icon name="dns" type="filled" size="lg" />
					</span>
					<span class="auth-layout__logo-text">
						<span class="auth-layout__brand">
							Proxy<span class="auth-layout__brand-accent">check</span>
						</span>
						<span class="auth-layout__brand-caption">Proxy server checker</span>
					</span>
				</RouterLink>
			</header>

			<template v-if="page">
				<h1 class="auth-layout__title">{{ page.title }}</h1>
				<p class="auth-layout__subtitle">{{ page.subtitle }}</p>
			</template>

			<div class="auth-layout__body">
				<slot />
			</div>

			<footer v-if="page" class="auth-layout__footer">
				<p class="auth-layout__switch">
					{{ page.footerText }}
					<ui-link :to="page.footerLink" size="md">{{ page.footerLinkLabel }}</ui-link>
				</p>
			</footer>
		</div>
	</section>
</template>

<style scoped lang="scss">
	.auth-layout {
		flex-grow: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: 40px $padding-main + px;

		&__card {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			max-width: 440px;
			padding: 40px 32px 36px;
			border-radius: 16px;
			border: 1px solid $border;
			background: $white;
			box-shadow: 0 8px 32px rgb(48 51 69 / 6%);
		}

		&__header {
			display: flex;
			justify-content: center;
			width: 100%;
			margin-bottom: 28px;
		}

		&__logo {
			display: flex;
			align-items: center;
			gap: 16px;
			text-align: left;
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
			width: 52px;
			height: 52px;
			border-radius: 14px;
			border: 1px solid $border;
			background: linear-gradient(160deg, $white 0%, $background-block 100%);
			color: $black;
			box-shadow: 0 4px 14px rgb(48 51 69 / 7%);
		}

		&__logo-text {
			display: flex;
			flex-direction: column;
			gap: 4px;
			min-width: 0;
		}

		&__brand {
			font-size: 22px;
			font-weight: 700;
			line-height: 1.15;
			letter-spacing: -0.03em;
			color: $black;
		}

		&__brand-accent {
			font-weight: 500;
			color: $secondary;
		}

		&__brand-caption {
			font-size: 13px;
			font-weight: 500;
			line-height: 1.35;
			color: $secondary;
		}

		&__title {
			width: 100%;
			margin: 0 0 8px;
			font-size: 22px;
			font-weight: 700;
			line-height: 1.25;
			letter-spacing: -0.02em;
			text-align: center;
			color: $black;
		}

		&__subtitle {
			width: 100%;
			margin: 0 0 24px;
			font-size: $font-size-main + px;
			line-height: 1.5;
			text-align: center;
			color: $secondary;
		}

		&__body {
			width: 100%;
		}

		&__footer {
			width: 100%;
			margin-top: 20px;
			padding-top: 20px;
			border-top: 1px solid $border;
			text-align: center;
		}

		&__switch {
			margin: 0;
			font-size: 14px;
			line-height: 1.5;
			color: $secondary;
		}
	}
</style>
