import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/home/HomeView.vue";
import { APP_LAYOUT } from "@/layouts";
import { guest } from "@/router/middlewares/guest.ts";
import { auth } from "@/router/middlewares/auth.ts";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/:pathMatch(.*)*",
			name: "page-not-found",
			component: () => import("@/views/notFound/NotFoundView.vue"),
			meta: { layout: APP_LAYOUT.EMPTY }
		},
		{
			path: "/",
			name: "home",
			component: HomeView,
			meta: { layout: APP_LAYOUT.EMPTY },
			beforeEnter: guest
		},
		{
			path: "/dashboard",
			name: "dashboard",
			component: () => import("@/views/dashboard/DashboardView.vue"),
			meta: { layout: APP_LAYOUT.DEFAULT },
			beforeEnter: auth
		},
		{
			path: "/auth",
			name: "auth",
			component: () => import("@/views/auth/AuthView.vue"),
			meta: { layout: APP_LAYOUT.AUTH },
			beforeEnter: guest,
			redirect: () => ({ name: "sign-in" }),
			children: [
				{
					path: "sign-in",
					name: "sign-in",
					component: () => import("@/views/auth/signIn/SignInView.vue")
				},
				{
					path: "sign-up",
					name: "sign-up",
					component: () => import("@/views/auth/signUp/SignUpView.vue")
				}
			]
		}
	]
});

export default router;
