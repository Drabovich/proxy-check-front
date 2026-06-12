<script setup lang="ts">
	import { UiButton, UiIcon } from "@dv.net/ui-kit";
</script>

<template>
	<section class="home">
		<div class="home__card">
			<p class="home__watermark" aria-hidden="true">Proxy</p>

			<header class="home__header">
				<div class="home__logo">
					<span class="home__logo-icon" aria-hidden="true">
						<ui-icon name="dns" type="filled" size="lg" />
					</span>
					<div class="home__logo-text">
						<h1 class="home__title">
							Proxy<span class="home__title-accent">check</span>
						</h1>
						<p class="home__subtitle">Proxy server checker</p>
					</div>
				</div>
			</header>

			<p class="home__description">
				Quickly check proxy availability and performance. Sign in or create an account to get started.
			</p>

			<ul class="home__features">
				<li class="home__feature">
					<span class="home__feature-icon">
						<ui-icon name="dns" type="400" size="md" />
					</span>
					<span class="home__feature-text">Connection check</span>
				</li>
				<li class="home__feature">
					<span class="home__feature-icon">
						<ui-icon name="done" type="400" size="md" />
					</span>
					<span class="home__feature-text">Clear results</span>
				</li>
				<li class="home__feature">
					<span class="home__feature-icon">
						<ui-icon name="grid-view" type="400" size="md" />
					</span>
					<span class="home__feature-text">Simple dashboard</span>
				</li>
			</ul>

			<div class="home__actions">
				<ui-button
					type="primary"
					mode="neutral"
					size="lg"
					:to="{ name: 'sign-in' }"
				>
					Sign in
				</ui-button>
				<ui-button
					type="outline"
					mode="neutral"
					size="lg"
					:to="{ name: 'sign-up' }"
				>
					Sign up
				</ui-button>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
	.home {
		width: 100%;
		max-width: 520px;

		&__card {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			padding: 48px 32px 40px;
			border-radius: 16px;
			border: 1px solid $border;
			background: $white;
			overflow: hidden;
			box-shadow: 0 8px 32px rgb(48 51 69 / 6%);
		}

		&__watermark {
			position: absolute;
			top: 50%;
			left: 50%;
			margin: 0;
			font-size: clamp(96px, 24vw, 140px);
			font-weight: 700;
			line-height: 1;
			letter-spacing: -0.04em;
			color: rgb(48 51 69 / 5%);
			transform: translate(-50%, -58%);
			user-select: none;
			pointer-events: none;
		}

		&__header {
			position: relative;
			z-index: 1;
			display: flex;
			justify-content: center;
			width: 100%;
			margin-bottom: 24px;
		}

		&__logo {
			display: flex;
			align-items: center;
			gap: 16px;
			text-align: left;
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

		&__title {
			margin: 0;
			font-size: 26px;
			font-weight: 700;
			line-height: 1.15;
			letter-spacing: -0.03em;
			color: $black;
		}

		&__title-accent {
			font-weight: 500;
			color: $secondary;
		}

		&__subtitle {
			margin: 0;
			font-size: 14px;
			font-weight: 500;
			line-height: 1.35;
			color: $secondary;
		}

		&__description {
			position: relative;
			z-index: 1;
			margin: 0 0 28px;
			text-align: center;
			max-width: 360px;
			font-size: $font-size-main + px;
			line-height: 1.5;
			color: $secondary;
		}

		&__features {
			position: relative;
			z-index: 1;
			display: flex;
			flex-direction: column;
			gap: 12px;
			width: 100%;
			max-width: 280px;
			margin: 0 0 32px;
			padding: 0;
			list-style: none;
		}

		&__feature {
			display: flex;
			align-items: center;
			gap: 12px;
			text-align: left;
		}

		&__feature-icon {
			display: flex;
			flex-shrink: 0;
			align-items: center;
			justify-content: center;
			width: 40px;
			height: 40px;
			border-radius: 10px;
			border: 1px solid $border;
			background: $background-block;
			color: $black;
		}

		&__feature-text {
			font-size: 14px;
			font-weight: 500;
			line-height: 1.35;
			color: $black;
		}

		&__actions {
			position: relative;
			z-index: 1;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			gap: 12px;
			width: 100%;
		}
	}
</style>
