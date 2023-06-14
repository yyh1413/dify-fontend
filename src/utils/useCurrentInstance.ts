/*
 * @description: 解决vue3 使用 ctx ，打包到dist以后，ctx下面的值是拿不到值
 * @author: YANGYuHao
 * @date: Do not edit
 */

import { ComponentInternalInstance, getCurrentInstance } from 'vue';

/**
 * @description: 获取全局函数函数
 * @param {*}
 * @returns {*}
 */
export default function useCurrentInstance() {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance;
  const globalProperties = appContext.config.globalProperties;
  return {
    globalProperties,
  };
}
