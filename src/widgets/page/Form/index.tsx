// src/App.tsx
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import CustomForm from "@/component/FromDom";
import {
  Input,
  Select,
  Button,
  Radio,
  Form,
  Checkbox,
  Switch,
  InputNumber,
  DatePicker,
} from "antd";
import { usebegin, useBearStore } from "@/store/contextmodel";
const App = () => {
  // //////////状态机///////////////
  const takestore: any = usebegin(); //本地存储
  const nonLocal: any = useBearStore(); //非本地存储
  ////////////
  const [optionsData, setOptionsData] = useState<any>({
    radioOptions: [],
    genderOptions: [],
    CheckboxOptions: [],
  });
  const [form] = Form.useForm(); // 获取表单实例
  useEffect(() => {
    setTimeout(() => {
      // console.log(takestore, nonLocal, "xxxssssss");
      //模拟请求与下拉数据等赋值
      setOptionsData({
        radioOptions: [
          { label: "China", value: "china" },
          { label: "USA", value: "usa" },
        ],
        genderOptions: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ],
        CheckboxOptions: [
          { label: "A", value: 1 },
          { label: "B", value: 2 },
          { label: "C", value: 3 },
          { label: "D", value: 4 },
        ],
      });
      //初始化表单数据
      form.setFieldsValue({
        timerPicker: dayjs(),
        username: "JohnDoe",
        radioType: "china",
        gender: "male",
        CheckboxType: [1, 2, 3],
        onoff: "open", //开关赋值
      });
    }, 1000);
  }, []);
  // 清空表单数据
  const handleClear = () => {
    form.resetFields(); // 清空表单数据
  };
  // 表单提交完成事件
  const handleSubmit = (values: any) => {
    const timerPicker = dayjs(values.timerPicker).format("YYYY-MM-DD"); //过滤时间
    const newobj = {
      ...values,
      timerPicker,
    };
    console.log("Received values: ", newobj);
  };

  // 自定义公共样式
  const customStyles = {
    form: "bg-gray-100 shadow-xl ",
    item: "mb-4",
    button:
      "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg",
  };

  // 字段配置（可以动态生成）
  const fieldConfig = [
    {
      name: "timerPicker",
      label: "时间选择",
      component: DatePicker, // 传递 Ant Design 的 组件
      rules: [{ required: true, message: "请输入" }],
      placeholder: "请输入内容",
    },
    {
      name: "unm",
      label: "数字输入框",
      classstyles: " w-full", //自定义样式
      component: InputNumber, // 传递 Ant Design 的  组件
      rules: [{ required: true, message: "请输入" }],
      placeholder: "请输入内容",
    },
    {
      name: "username",
      label: "账码",
      component: Input, // 传递 Ant Design 的  组件
      rules: [{ required: true, message: "Username is required!" }],
      placeholder: "请输入内容",
    },
    {
      name: "password",
      label: "信息",
      component: Input.Password,
      // rules: [{ required: true, message: 'Password cannot be empty!' }],
      placeholder: "Enter your password",
    },
    {
      name: "gender",
      label: "下拉",
      component: Select,
      rules: [{ required: true, message: "额嗡嗡嗡" }],
      options: optionsData.genderOptions, //动态数据
    },
    {
      name: "radioType",
      label: "单选",
      component: Radio.Group,
      rules: [{ required: true, message: "选择" }],
      options: optionsData.radioOptions, //动态数据
    },
    {
      name: "CheckboxType",
      label: "多选",
      component: Checkbox.Group,
      rules: [{ required: true, message: "请选择" }],
      options: optionsData.CheckboxOptions, //动态数据
    },
    {
      name: "onoff",
      label: "开关",
      component: ({ value, onChange }: any) => {
        //开关选中后自定义数据
        return (
          <Switch
            checked={value === "open"}
            onChange={(checked) => {
              console.log(value, "sss");
              const newState = checked ? "open" : "closed"; // 自定义状态值
              onChange(newState); // 更新父组件传递的值
            }}
            checkedChildren="开"
            unCheckedChildren="关"
          />
        );
      },
    },
  ];

  return (
    <div>
      <div>
        <p style={{ display: "inline" }}>154</p>
        <p style={{ display: "inline" }}>6666</p>
      </div>
      <Button
        onClick={() => {
          handleClear();
        }}
      >
        清空表单
      </Button>
      <Button
        onClick={() => {
          takestore.setencipherment("123456");
          nonLocal.setstateNo2("改变了非本地");
        }}
      >
        改变状态机
      </Button>
      <p> 状态机本地存储： {takestore.encipherment}</p>
      <p> 状态机非本地存储： {nonLocal.stateNo2}</p>
      <CustomForm
        form={form} // 将 form 实例传递给 CustomForm
        layout={"horizontal"} //控制表单种类
        onSubmit={handleSubmit} //提交过后函数
        customStyles={customStyles} //自定义样式
        fieldConfig={fieldConfig}
        labelAlign="right" //表单label对齐方式
        Colspan={24} //栅格布局
        labelCol={{ xs: { span: 24 }, sm: { span: 8 }, md: { span: 4 } }} // 控制 label 的宽度   左右合计24
        wrapperCol={{ xs: { span: 24 }, sm: { span: 16 }, md: { span: 20 } }} // 控制输入框等的宽度
        submitButton={
          <div>
            <Button>取消</Button>
            <Button danger htmlType="submit">
              提交
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default App;
