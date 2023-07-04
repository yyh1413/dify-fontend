import { createApp } from "vue";
import router from "./router";
import "./style.css";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/assets/style/element-style-reset.scss";

// import "@/assets/style/theme.scss";
import "@/assets/style/common.scss";
import "@/assets/style/reset.css";
import { createLogto, LogtoConfig } from "@logto/vue";
//pinia
import store from "@/store";

console.log(import.meta.env.VITE_APP_APPID);
console.log(import.meta.env.VITE_APP_INDEX);
console.log(import.meta.env.VITE_APP_ENDPOINT);
const config: LogtoConfig = {
  endpoint: import.meta.env.VITE_APP_ENDPOINT,
  appId: import.meta.env.VITE_APP_APPID,
};

createApp(App)
  .use(createLogto, config)
  .use(ElementPlus)
  .use(router)
  .use(store)
  .mount("#app");
