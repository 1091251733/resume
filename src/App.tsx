import { ToastProvider } from "@heroui/toast"; //配置消息提示
import { createPortal } from "react-dom";
import Afterlogin from "./widgets/Afterlogin";
import Schementwo from "./widgets/Login/Schementwo"; //第二个登录（山)（小圆点）
import userTokenvessel from "./store/userToken_vessel";
import zhCN from "antd/locale/zh_CN";
import { ConfigProvider } from "antd"; //配置国际化
function Toast() {
  return createPortal(
    <ToastProvider toastOffset={35} placement="top-center" />,
    document.body // 直接渲染到 body，避免被 Modal 的 DOM 层级影响
  );
}
function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Toast></Toast>
      {!userTokenvessel.getState().token ? (
        <Schementwo></Schementwo>
      ) : (
        <Afterlogin></Afterlogin>
      )}
    </ConfigProvider>
  );
}

export default App;
