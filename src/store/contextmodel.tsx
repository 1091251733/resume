import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { addToast, cn } from "@heroui/react";

// 定义状态的类型
interface LastingState {
  disclosedBallot: boolean;
  curtain: string;
  encipherment: string;
  Menuoption: string;
  tabList: Array<any>;
  openKeys: Array<string>;
  clickAdd: Array<string>;
}

interface PerishabilityState {
  strongDom: string;
  stateNo2: string;
}

// 初始化持久化数据
const lasting: LastingState = {
  disclosedBallot: false, //记住账户
  curtain: "", //记住账号
  encipherment: "", //记住密码
  Menuoption: "", //菜单选项
  tabList: [], //菜单tab
  openKeys: [window.location.pathname],
  clickAdd: [window.location.pathname],
};

// 初始化非持久化数据
const perishability: PerishabilityState = {
  strongDom: "",
  stateNo2: "",
};
// usebegin store：持久化数据 + immer + devtools
const usebegin = create(
  devtools(
    persist(
      immer<LastingState>((set) => ({
        ...lasting,
        setclickAdd: (val: Array<string>) =>
          set((state) => {
            state.clickAdd = val;
          }),
        setopenKeys: (val: Array<string>) =>
          set((state) => {
            state.openKeys = val;
          }),
        settabList: (val: Array<any>) =>
          set((state) => {
            state.tabList = val;
          }),
        setcurtain: (val: string) =>
          set((state) => {
            state.curtain = val;
          }),
        setencipherment: (val: string) =>
          set((state) => {
            state.encipherment = val;
          }),
        setdisclosedBallot: (val: boolean) =>
          set((state) => {
            state.disclosedBallot = val;
          }),
      })),
      { name: "usebegin" }
    )
  )
);

// useBearStore store：非持久化数据 + immer
const useBearStore = create(
  immer<PerishabilityState>((set) => ({
    ...perishability,
    setstrongDom: (val: string) =>
      set((state) => {
        state.strongDom = val;
      }),
    setstateNo2: (val: string) =>
      set((state) => {
        state.stateNo2 = val;
      }),
  }))
);
//消息提示
const usetoast = (
  description: string,
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger"
) => {
  addToast({
    description,
    timeout: 2000,
    color: color ? color : "warning",
    classNames: {
      base: cn(["w-[360px]", "m-auto", "z-[2000]"]),
    },
  });
};
export { usebegin, useBearStore, usetoast };
