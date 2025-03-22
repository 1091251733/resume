import { create } from "zustand-vue";
import { persist, devtools } from "zustand/middleware";

// 持久化状态
const lasting = {
  disclosedBallot: false, // 记住账户
  curtain: "", // 记住账号
  encipherment: "", // 记住密码
  loginInformation: {}, // 登录信息
  token: "", // 登录 token
  menuOption: "", // 菜单选项
  ceshiDate:'测试本地数据~'
};

// 非持久化状态
const perishability = {
  strongDom: "非持久化测试",
};

// 持久化 Store
export const useBeginStore = create(
  devtools(
    persist(
      (set) => ({
        ...lasting,
        setToken: (val) => set({ token: val }),
        setCurtain: (val) => set({ curtain: val }),
        setEncipherment: (val) => set({ encipherment: val }),
        setDisclosedBallot: (val) => set({ disclosedBallot: val }),
        setLoginInformation: (val) => set({ loginInformation: val }),
        setMenuOption: (val) => set({ menuOption: val }),
        setceshiDate: (val) => set({ ceshiDate: val }),
      }),
      {
        name: "begin-store", // localStorage 中的键名
      }
    )
  )
);

// 非持久化 Store
export const useBearStore = create(
  // , get
  devtools((set) => ({
    ...perishability,
    setStrongDom: (val) => set({ strongDom: val }),
    setMenuOption: (val) => set({ menuOption: val }),
    // 可选：获取当前状态的方法
    // getState: () => get(),
  }))
);
