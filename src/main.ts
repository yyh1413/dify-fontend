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

const config: LogtoConfig = {
  endpoint: "http://localhost:3001/",
  appId: "b382ynyk8jh9i7xw10uci",
};

//pinia
import store from "@/store";

createApp(App)
  .use(createLogto, config)
  .use(ElementPlus)
  .use(router)
  .use(store)
  .mount("#app");
