<script setup lang="ts">
	import { computed, ref } from "vue";
	import { postApiSignIn } from "@/services/api/auth.ts";
	import { useRouter } from "vue-router";
	import { useAuthStore } from "@/stores/auth";
	import { UiButton, UiForm, UiFormItem, UiInput } from "@dv.net/ui-kit";
	import type { UiFormRules } from "@dv.net/ui-kit/dist/components/UiForm/types";
	import { EMAIL_REGEX } from "@/utils/constants/regex";

	const router = useRouter();
	const { getSession, getUserInfo } = useAuthStore();

	const isLoading = ref<boolean>(false);
	const formRef = ref<InstanceType<typeof UiForm> | null>(null);
	const form = ref({
		email: "",
		password: ""
	});

	const rulesForm = computed<UiFormRules>(() => ({
		email: [
			{
				required: true,
				message: "Enter your email"
			},
			{
				validator: () => {
					const email = form.value.email.trim();
					if (!email) return true;
					return EMAIL_REGEX.test(email);
				},
				message: "Enter a valid email"
			}
		],
		password: [
			{
				required: true,
				message: "Enter your password"
			},
			{
				min: 8,
				message: "Password must be at least 8 characters"
			}
		]
	}));

	const submit = async () => {
		if (!formRef.value?.validate()) return;
		try {
			isLoading.value = true;
			await postApiSignIn(form.value);
			await getSession();
			await getUserInfo();
			await router.push({ name: "dashboard" });
		} catch (error) {
			console.error(error);
		} finally {
			isLoading.value = false;
		}
	};
</script>

<template>
	<ui-form @submit.prevent="submit" ref="formRef" :rules="rulesForm" :model="form">
		<ui-form-item label="Email" name="email">
			<ui-input v-model="form.email" type="email" autocomplete="email" placeholder="name@example.com" />
		</ui-form-item>
		<ui-form-item label="Password" name="password">
			<ui-input
				v-model="form.password"
				type="password"
				show-password
				autocomplete="current-password"
				placeholder="Enter your password"
			/>
		</ui-form-item>
		<ui-button style="width: 100%;" type="primary" mode="neutral" size="lg" native-type="submit" :loading="isLoading">
			Sign in
		</ui-button>
	</ui-form>
</template>
