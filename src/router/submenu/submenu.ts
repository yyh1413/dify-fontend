import { RouteRecordRaw } from "vue-router";
import { L1, L2, L3, L4, L5, LISTING } from "@/constants/routerUrl";

const routerList: Array<RouteRecordRaw> = [
  {
    path: L1,
    name: L1,
    component: () => import("@/pages/main/Main.vue"),
    meta: {
      title: "文案工具",
    },
  },
  {
    path: L2,
    name: L2,
    component: () => import("@/pages/main/Main.vue"),
    meta: {
      title: "Case处理",
    },
  },
  {
    path: L3,
    name: L3,
    component: () => import("@/pages/main/Main.vue"),
    meta: {
      title: "客服处理",
    },
  },
  {
    path: L4,
    name: L4,
    component: () => import("@/pages/main/Main.vue"),
    meta: {
      title: "亚马逊知识问答",
    },
  },
  {
    path: L5,
    name: L5,
    component: () => import("@/pages/main/Main.vue"),
    meta: {
      title: "面试工具",
    },
  },
  {
    path: LISTING,
    name: "listing",
    component: () => import("@/pages/components/listing/Listing.vue"),
    meta: {
      hide: true,
    },
  },
];

export default routerList;
