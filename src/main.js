import { createApp } from "vue";
import "./style.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import App from "./App.vue";
import router from "./userouter";

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.mount("#app");
