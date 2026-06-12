<template>
	<div class="empty-layout">
		<slot />
	</div>
</template>

<style scoped lang="scss">
	.empty-layout {
		flex-grow: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 40px $padding-main + px;
	}
</style>
