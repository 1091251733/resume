import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import "./index.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "dayjs/locale/zh-cn";
import { HeroUIProvider } from "@heroui/react";
// 放弃严格模式，浏览器打印调用两次
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <HeroUIProvider>
    <App />
  </HeroUIProvider>
);
