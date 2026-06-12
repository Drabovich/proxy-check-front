import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "@/assets/scss/index.scss";
import { init, hideAppLoader } from "@/utils/helpers/init";

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())

const bootstrap = async () => {
	await init();

	app.use(router);
	await router.isReady();

	app.mount("#app");

	requestAnimationFrame(hideAppLoader);
};
bootstrap();
