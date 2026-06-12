<script setup lang="ts">
	import { computed, ref } from "vue";
	import { UiButton, UiForm, UiFormItem, UiIcon, UiTable, UiTag, UiTextarea } from "@dv.net/ui-kit";
	import type { UiFormRules } from "@dv.net/ui-kit/dist/components/UiForm/types";
	import type { UiTableHeader } from "@dv.net/ui-kit/dist/components/UiTable/types";
	import DsMainTitle from "@/components/ds/dsMainTitle/DsMainTitle.vue";
	import { postApiProxyCheck } from "@/services/api/proxy";
	import { getInvalidProxyLines, parseProxyLines } from "@/utils/helpers/proxy";
	import {
		PROXIES_PLACEHOLDER,
		PROXY_STATUS_LABELS,
		PROXY_STATUS_MODES,
		PROXY_TYPE_LABELS
	} from "@/utils/constants/proxy";
	import type { IProxyCheckResponse, IProxyCheckResult } from "@/utils/types/proxy";

	const isLoading = ref<boolean>(false);
	const checkResult = ref<IProxyCheckResponse | null>(null);
	const formRef = ref<InstanceType<typeof UiForm> | null>(null);
	const form = ref({
		proxies: ""
	});

	const rulesForm = computed<UiFormRules>(() => ({
		proxies: [
			{
				required: true,
				message: "Enter at least one proxy"
			},
			{
				validator: () => {
					const lines = parseProxyLines(form.value.proxies);
					if (!lines.length) return true;

					return getInvalidProxyLines(lines).length === 0;
				},
				message: "Each proxy must be in IP:PORT format, e.g. 80.150.246.98:443"
			}
		]
	}));

	const tableHeaders = computed<UiTableHeader<IProxyCheckResult>[]>(() => [
		{ name: "address", label: "Address", width: "200" },
		{ name: "type", label: "Type", width: "130" },
		{ name: "status", label: "Status", width: "130" },
		{
			name: "latency_ms",
			label: "Latency",
			width: "130",
			format: (row) => (row.latency_ms != null ? `${row.latency_ms} ms` : "—")
		},
		{
			name: "location",
			label: "Location",
			width: "200",
			format: (row) => {
				if (row.country && row.city) return `${row.country}, ${row.city}`;
				if (row.country) return row.country;
				return "—";
			}
		},
		{
			name: "external_ip",
			label: "External IP",
			width: "160",
			format: (row) => row.external_ip ?? "—"
		}
	]);

	const submit = async () => {
		if (!formRef.value?.validate()) return;

		try {
			isLoading.value = true;
			checkResult.value = null;

			const proxies = parseProxyLines(form.value.proxies);
			checkResult.value = await postApiProxyCheck({ proxies });
		} catch (error) {
			console.error(error);
		} finally {
			isLoading.value = false;
		}
	};
</script>

<template>
	<section class="dashboard">
		<header class="dashboard__header">
			<ds-main-title title="Proxy check" tag="h1" :font-size="28" :margin-bottom="8" />
			<p class="dashboard__subtitle">Paste a list of proxies — one address per line in IP:PORT format</p>
		</header>

		<div class="dashboard__card">
			<ui-form ref="formRef" class="dashboard__form" :model="form" :rules="rulesForm" @submit.prevent="submit">
				<ui-form-item label="Proxy list" name="proxies">
					<ui-textarea v-model="form.proxies" size="lg" :rows="10" :placeholder="PROXIES_PLACEHOLDER" />
				</ui-form-item>

				<ui-button
					class="dashboard__submit"
					type="primary"
					mode="neutral"
					size="lg"
					native-type="submit"
					:loading="isLoading"
					left-icon-type="400"
					left-icon-name="dns"
				>
					Check
				</ui-button>
			</ui-form>
		</div>

		<div v-if="checkResult" class="dashboard__results">
			<div class="dashboard__summary">
				<div class="dashboard__stat">
					<span class="dashboard__stat-value">{{ checkResult.summary.total }}</span>
					<span class="dashboard__stat-label">Total</span>
				</div>
				<div class="dashboard__stat dashboard__stat--working">
					<span class="dashboard__stat-value">{{ checkResult.summary.working }}</span>
					<span class="dashboard__stat-label">Working</span>
				</div>
				<div class="dashboard__stat">
					<span class="dashboard__stat-value">{{ checkResult.summary.duration_ms }} ms</span>
					<span class="dashboard__stat-label">Check duration</span>
				</div>
			</div>

			<div class="dashboard__table-card">
				<h2 class="dashboard__table-title">Results</h2>
				<ui-table :data="checkResult.results" :headers="tableHeaders" row-key="address" table-layout="fixed">
					<template #body-cell-type="{ row }">
						<ui-tag size="sm" mode="neutral" :text="PROXY_TYPE_LABELS[row.type] ?? row.type" />
					</template>

					<template #body-cell-status="{ row }">
						<ui-tag
							size="sm"
							:mode="PROXY_STATUS_MODES[row.status]"
							:text="PROXY_STATUS_LABELS[row.status] ?? row.status"
						/>
					</template>
				</ui-table>
			</div>
		</div>

		<div v-else-if="!isLoading" class="dashboard__empty">
			<span class="dashboard__empty-icon" aria-hidden="true">
				<ui-icon name="dns" type="400" size="xl" />
			</span>
			<p class="dashboard__empty-text">Check results will appear here after you submit the proxy list</p>
		</div>
	</section>
</template>

<style scoped lang="scss">
	.dashboard {
		display: flex;
		flex-direction: column;
		gap: 24px;
		width: 100%;

		&__header {
			display: flex;
			flex-direction: column;
			gap: 4px;
		}

		&__subtitle {
			margin: 0;
			font-size: 14px;
			line-height: 1.5;
			color: $secondary;
		}

		&__card,
		&__table-card {
			padding: 24px;
			border-radius: 16px;
			border: 1px solid $border;
			background: $white;
			box-shadow: 0 4px 20px rgb(48 51 69 / 5%);
		}

		&__form {
			display: flex;
			flex-direction: column;
			gap: 4px;
		}

		&__submit {
			align-self: flex-start;
			margin-top: 8px;
		}

		&__results {
			display: flex;
			flex-direction: column;
			gap: 16px;
		}

		&__summary {
			display: grid;
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 12px;

			@media (width <= 640px) {
				grid-template-columns: 1fr;
			}
		}

		&__stat {
			display: flex;
			flex-direction: column;
			gap: 4px;
			padding: 20px 24px;
			border-radius: 12px;
			border: 1px solid $border;
			background: $white;

			&--working {
				border-color: rgb(34 197 94 / 25%);
				background: rgb(34 197 94 / 6%);

				.dashboard__stat-value {
					color: #16a34a;
				}
			}
		}

		&__stat-value {
			font-size: 24px;
			font-weight: 700;
			line-height: 1.2;
			color: $black;
		}

		&__stat-label {
			font-size: 13px;
			font-weight: 500;
			color: $secondary;
		}

		&__table-title {
			margin: 0 0 16px;
			font-size: 18px;
			font-weight: 600;
			line-height: 1.3;
			color: $black;
		}

		&__empty {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 12px;
			padding: 48px 24px;
			border-radius: 16px;
			border: 1px dashed $border;
			background: $white;
			text-align: center;
		}

		&__empty-icon {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 56px;
			height: 56px;
			border-radius: 14px;
			border: 1px solid $border;
			background: $background-block;
			color: $secondary;
		}

		&__empty-text {
			margin: 0;
			max-width: 320px;
			font-size: 14px;
			line-height: 1.5;
			color: $secondary;
		}
	}
</style>
