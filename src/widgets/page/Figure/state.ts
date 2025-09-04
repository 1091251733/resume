// 定义 initialState 的类型
export const initialState = {
  account: "",
  text: "Hello",
  myuserId: "我是ID",
} as const; // 使用 `as const` 来让 `initialState` 的类型更加严格

// 显式地定义 Action 类型
type Action =
  | { type: "setField"; field: keyof typeof initialState; value: any }
  | { type: "reset" };

// 修改值的函数
export const reducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case "setField":
      return { ...state, [action.field]: action.value };  // 更新动态字段
    case "reset":
      return initialState; // 重置状态
    default:
      throw new Error("未知动作类型");
  }
};
