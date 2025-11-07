import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import userTokenVessel from "./store/userToken_vessel.ts";

// 导入组件
const Home = lazy(() => import("./widgets/page/Home")); //首页

// 获取用户信息
const userInfo: any = userTokenVessel.getState().userInfo;
// 路由配置
const routeConfig = [
  {
    path: "/",
    element: (
      <Suspense fallback={<div>⌛加载中...</div>}>
        <Home />
      </Suspense>
    ),
  },
];

// 根据用户角色过滤路由
const filteredRoutes = routeConfig.filter((route: any) => {
  if (!route.roles) return true;
  return route.roles.includes(userInfo.username);
});

// 创建路由
const route = createBrowserRouter(filteredRoutes);

export default route;
