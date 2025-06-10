import dayjs from "dayjs";
// el-tag / el-button ：primary ， success ， info，warning，danger
export const headerTbale = [
  {
    prop: "username",
    label: "名字",
  },
  {
    prop: "integralId",
    label: "描述",
    minWidth: "70",
    showOverflowTooltip: true, //是否腻出加省略号
  },
  {
    prop: "username",
    label: "状态",
    render: (value) => {
      return {
        isTag: true, //是否显示标签
        content: value !== "plm852456" ? "12" : "禁用",
        type: value !== "plm852456" ? "primary" : "warning",
      };
    },
  },
  // dayjs转换
  {
    prop: "createTime",
    label: "时间",
    render: (value) => dayjs(value).format("YYYY-MM-DD HH:mm:ss") || "-",
  },
];
