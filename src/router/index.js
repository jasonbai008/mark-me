import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(), // hash模式
    // history: createWebHashHistory(), // history模式
    routes: [
        {
            path: '/',
            component: () => import("@/views/index.vue"),
        }
    ]
})

export default router;
