export const headerTbale = [
  {
    prop: "username",
    label: "名字",
  },
  {
    prop: "address",
    label: "描述",
    width: "240",
    showOverflowTooltip: true, //是否腻出加省略号
  },
  {
    prop: "state",
    label: "状态",
    render: (value) => (value === 1 ? "启用" : "禁用"), // 三元表达式处理 state
  },
];
