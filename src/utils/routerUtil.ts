import { RouteLocationRaw, RouteRecordRaw } from "vue-router";
import routerList from "@/router/submenu/submenu";
import router from "@/router";
import {  errorMessage } from "@/utils";

/**
 * 根据path获取路由对象信息
 * @param path
 * @returns
 */
export const getPathToRoute = (path: string): RouteRecordRaw | undefined => {
  for (const item of routerList) {
    if (item.children && item.children?.length > 0) {
      const result = item.children.find((j) => j.path === path);
      if (result) return result;
    } else if (item.path === path) {
      return item;
    }
  }
  return undefined;
};
/**
 * 控制权限
 * @param path
 * @returns
 */
export const routerPush = (to: RouteLocationRaw): void => {
  const msg = "抱歉您没有权限!";
  if (Object.prototype.toString.call(to) === "[object String]") {
    // if (!checkMenuPermission(to as string)) {
    //   errorMessage(msg);
    //   return;
    // }
  }
  router.push(to);
};
