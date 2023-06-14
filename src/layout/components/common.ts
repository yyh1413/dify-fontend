import {
  Monitor,
  Star,
  Calendar,
  CollectionTag,
  Collection,
  DataLine,
} from "@element-plus/icons";
import { h, provide, reactive, toRefs, VNode } from "vue";
import { main } from "@/constants/config";
/**
 * 根据名称获取对应icon图标的实例
 * 用于左侧菜单的小icon
 * @param param
 * @returns
 */
export const getIcon = (param: keyof typeof main) => {
  if (main[param]) {
    return main[param][0].icon;
  }
};
