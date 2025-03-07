import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    component: () => import("./widgets/page/Home/index.vue"), // 首页
  },
  {
    path: "/encapsulation",
    component: () => import("./widgets/page/Encapsulation/index.vue"), // 封装表格
  },
  {
    path: "/holdform",
    component: () => import("./widgets/page/Holdform/index.vue"), // 封装表单
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("./widgets/NotFound.vue"), // 404
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
