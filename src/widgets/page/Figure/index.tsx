import { useRef, useReducer } from "react";
import { getTransactionDetails } from "@/api/useApi";
import { Input, Button } from "antd";
import TableView from "@/component/TableView";
import { Figuretable } from "@/store/tableDate";
import { reducer, initialState } from "./state";
import Modaltow from "@/component/Modaltow";
import { debounce, throttle } from "@/store/utile";
import SButton from "@/component/SButton";
import { confirmationpopup } from "@/component/confirmationpopup";
import NavDom from "@/component/NavDom";
import dayjs from "dayjs";
import { usetoast } from "@/store/contextmodel";
import Uploadmolde from "@/component/Uploadmolde";
export default function Together() {
  //列子
  const [state, dispatch] = useReducer(reducer, initialState);
  const TalbeRef: any = useRef(null); //表格dom
  const Uploadmoldedom: any = useRef(null); //上传文件dom
  const refDom = useRef<{ popupstate?: (state: boolean) => void }>(null);
  const navDate = [
    {
      name: "条件查", // 标题
      Dom: "Select", // 组件
      myvalues: "tiaojian", // 字段名
      options: [
        { value: "jack", label: "Jack" },
        { value: "lucy", label: "Lucy" },
        { value: "Yiminghe", label: "Yiminghe" },
      ],
      defaultValue: "jack", // 设置默认选中的值（选填）
      extend: {
        //拓展
        className: "min-w-[130px]",
      },
    },
    {
      name: "输入订单号查询",
      Dom: "Input",
      myvalues: "order_sn",
    },
    {
      name: "时间查询",
      Dom: "DatePicker",
      myvalues: "times",
      defaultValue: dayjs(), // 可选的默认值
    },
    {
      name: "时间范围查询",
      Dom: "RangePicker",
      myvalues: "fanwTimes",
      defaultValue: [dayjs(), dayjs()], // 可选的默认值
    },
  ];
  const affirm = () => {
    //确定按钮点击函数
    console.log(545);
    usetoast("请输入完整内容");
  };
  const compile = (val: any) => {
    console.log("54_ww", val, "嗡嗡嗡");
  };
  const Startquery = (val: any, type: string) => {
    //查询&重置
    if (type == "查询") {
      TalbeRef?.current?.queryList({ ...val });
    } else {
      TalbeRef?.current?.resetList();
    }
  };
  return (
    <>
      <Uploadmolde ref={Uploadmoldedom}></Uploadmolde>
      <Modaltow
        configuration={{
          isDismissable: true, //是否点击遮罩层关闭弹窗
          radius: "md", //圆角
          placement: "center", //弹窗打开位置
          size: "lg", //弹窗大小
          backdrop: "opaque", //遮罩背景
          hideCloseButton: false, //是否隐藏关闭按钮
          Header: "标题",
          footrBut: "确认按钮",
        }}
        affirm={affirm} //确定按钮点击函数
        ref={refDom}
      >
        <Button onClick={() => Uploadmoldedom.current.childFunction(true)}>
          上传文件
        </Button>
      </Modaltow>
      <p>{state.account}</p>
      <p> {state.myuserId}</p>
      <div className="flex">
        <Input
          className="w-[200px]"
          placeholder="订单查询"
          value={state.account}
          onChange={(val) =>
            dispatch({
              type: "setField",
              field: "account",
              value: val.target.value,
            })
          }
          allowClear
        ></Input>
        <Input
          className="w-[200px]"
          placeholder="账户名称查询"
          value={state.myuserId}
          onChange={(val) =>
            dispatch({
              type: "setField",
              field: "myuserId",
              value: val.target.value,
            })
          }
          allowClear
        ></Input>
        <SButton
          className="mx-2"
          size="sm"
          color="primary"
          onClick={() => {
            TalbeRef?.current?.queryList({
              orderSn: state.account,
            });
          }}
        >
          查询
        </SButton>
        <SButton
          size="sm"
          onClick={() => {
            TalbeRef?.current?.resetList();
            dispatch({ type: "reset" });
          }}
        >
          重置
        </SButton>
        <SButton
          onClick={() => {
            TalbeRef.current.getList();
          }}
        >
          操作成功
        </SButton>
        <SButton
          color="success"
          size="sm"
          // loading={true}
          disable={false}
          icon={true}
          tooltipColor="warning"
          tooltip={<div>防抖-打开确认弹窗</div>}
          onClick={debounce(() => {
            confirmationpopup({
              position: "center",
              icon: "warning",
              title: "提示",
              text: "确定要删除这个文件吗?",
              confirmButtonText: "确认",
              confirmButtonColor: "#d33",
              cancelButtonText: "取消",
              cancelButtonColor: "#bbb",
              showCancelButton: true,
            }).then((res) => {
              if (res.isConfirmed) {
                console.log("确认按钮");
              } else {
                console.log("取消Window scrolled");
              }
            });
          }, 1000)}
        >
          防抖
        </SButton>
        <SButton
          onClick={throttle(() => {
            console.log("节流");
          }, 1000)}
        >
          节流
        </SButton>
        <SButton
          onClick={() => {
            if (refDom.current && refDom.current.popupstate) {
              refDom.current.popupstate(true);
            }
          }}
        >
          打开弹窗
        </SButton>
      </div>
      <NavDom navDate={navDate} Startquery={Startquery}></NavDom>
      <TableView
        bordered
        xScroll={800}
        heightValue={800} //表格固定高度
        compile={compile}
        ref={TalbeRef}
        api={getTransactionDetails}
        rowKey={"id"}
        size={10}
        type={"radio"} //多选/单选
        rowSelectionKey={true} //是否展示表格选择项
        optionsPagintion={true}
        apiState={{ name: "w122" }} //固定一个参数
        columns={[...Figuretable]}
        summaryList={["总计", "", "successNum", "", ""]} //底部计算栏用于计算总数
      />
    </>
  );
}
