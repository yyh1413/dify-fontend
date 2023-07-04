import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // viteMockServe({
    //   supportTs: false,
    //   mockPath: "./src/mock/", // 解析刚刚user.ts的位置
    //   localEnabled: true, // 是否开启开发环境
    // }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  //这里进行配置别名
  resolve: {
    alias: {
      "@": path.resolve("./src"), // @代替src
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 导入全局样式
        additionalData: `@import "./src/assets/style/theme.scss";`
      }
    }
  }
});
