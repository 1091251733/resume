import { Tag, Tooltip } from "antd";
import { copy } from "@/store/utile";
export const Figuretable = [
  {
    title: "容量",
    dataIndex: "orderType",
    render: (record: number) => <>{record || "-"}</>,
  },
  {
    title: "容量",
    dataIndex: "successNum",
    render: (record: number) => <>{record ?? "0"}</>,
  },
  {
    title: "订单号",
    dataIndex: "orderId",
    render: (record: string) => (
      <>
        <Tooltip placement="bottom" title={record || "-"}>
          <div
            onClick={() => copy(record)}
            className="w-full text-primary-500 hover:text-primary-400 cursor-pointer truncate"
          >
            {record || "-"}
          </div>
        </Tooltip>
      </>
    ),
  },
  {
    title: "状态",
    dataIndex: "status",
    width: 80,
    render: (record: number) => (
      <Tag color={record == 1 ? "error" : "success"}>
        {record == 1 ? "离线" : record == 0 ? "在线" : "-"}
      </Tag>
    ),
  },
];
