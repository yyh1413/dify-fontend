import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layout/Layout.vue";
import subMenu from "./submenu/submenu";
import { LOGIN, L1 } from "@/constants/routerUrl";
import CallbackView from "@/layout/CallbackView.vue";
import Logout from "@/layout/Logout.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: L1,
  },
  {
    path: "/callback",
    name: "callback",
    component: CallbackView,
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
  },
  {
    path: "/",
    name: "layout",
    redirect: L1,
    component: Layout,
    children: subMenu,
  },
  // {
  //   path: LOGIN,
  //   name: "login",
  //   component: () => {
  //     return import(/* webpackChunkName: "login" */ "@/pages/login/Login.vue");
  //   },
  //   meta: {
  //     title: "登录",
  //   },
  // },

  // {
  //   path: "/403",
  //   name: "403",
  //   component: () => import("@/pages/error/403.vue"),
  //   meta: {
  //     title: "无访问权限",
  //     isNeedLogin: false,
  //     keepAlive: true,
  //   },
  // },
  {
    path: "/404",
    name: "404",
    component: () => import("@/pages/error/404.vue"),
    meta: {
      title: "页面不存在",
      isNeedLogin: false,
      keepAlive: true,
    },
  },
  { path: "/:pathMatch(.*)", name: "bad-not-found", redirect: "/404" },
  // { path: "/:pathMatch(.*)", name: "bad-not-found", redirect: "index" },
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(),
  routes: routes,
  // routes: routes,
});

//路由守卫
router.beforeEach((to, from, next) => {
  // const { isAuthenticated, signIn } = useLogto();

  // 在跳转路由之前，先清除所有的请求
  // console.log("to", to, from);
  if (to.path === LOGIN) return next();
  next();

  // 获取用户本地的token, 如果token不存在则跳转到登录页
  // console.log(isAuthenticated);
  // if (isAuthenticated) {
  //   next();
  // } else {
  //   signIn("http://127.0.0.1:5173");
  // }
  // const tokenStr = authUtils.isLoggedIn();
  // if (!tokenStr) return next(LOGIN);

  // const white = [INDEX, "/Test"];
  // if (white.includes(to.path) || checkMenuPermission(to.fullPath)) {
  //   next();
  // } else {
  //   //  next(from.fullPath);
  //   if (to.path === "/404") {
  //     next();
  //   } else {
  //     next("/404");
  //   }
  // }
});

export default router;
