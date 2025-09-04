import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    //配置@到src目录
    alias: {
      "@": "/src",
    },
  },
  server: {
    //暴露端口
    host: "0.0.0.0", //解决vite use--host to expose
    port: 8081, //配置端口
    open: true, //配置默认打开浏览器
    // -前端代理防止开发环境接口跨域-
    // proxy: {
    //   "/api": {
    //     target: "https://wojdax.tianmakf.com",
    //     // target: "http://192.168.2.229:9586/",
    //     changeOrigin: true,
    //     ws: true,
    //     rewrite: (path: any) => {
    //       if (path.includes("/api")) {
    //         return path.replace(/^\/api/, "");
    //       }
    //     },
    //   },
    // },
  },
});
