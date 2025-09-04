import { useState } from "react";
import { Button } from "@heroui/react";

import { Select, Input, DatePicker } from "antd";
import dayjs from "dayjs";

export default function ConditionSearch(props: {
  navDate: any;
  Startquery: (val: any, type: string) => void;
  children?: any;
}) {
  const { RangePicker } = DatePicker;
  const initialValues = props?.navDate.reduce((acc: any, item: any) => {
    // 初始化动态值 如果有默认值，则设置默认值
    acc[item.myvalues] =
      item.defaultValue !== undefined ? item.defaultValue : "";
    return acc;
  }, {});
  // 用于保存每个表单项的值
  const [values, setValues] = useState<any>(initialValues);
  // 更新值
  const handleChange = (key: string, value: any) => {
    setValues((prev: any) => ({ ...prev, [key]: value }));
  };
  // 查询功能
  const handleQuery = () => {
    props.Startquery(values, "查询");
  };
  // 重置功能
  const handleReset = () => {
    const resetValues = props?.navDate.reduce((acc: any, item: any) => {
      acc[item.myvalues] =
        item.defaultValue !== undefined ? item.defaultValue : ""; // 如果有 defaultValue 就重置成它
      return acc;
    }, {});
    setValues(resetValues);
    props.Startquery(values, "重置");
  };

  // 渲染表单项
  function renderFormItems() {
    return props?.navDate.map((item: any, index: number) => {
      const { name, Dom, myvalues, options } = item;
      switch (Dom) {
        case "Select":
          return (
            <div {...item?.parent} key={index}>
              <div>{name}</div>
              <Select
                {...item?.extend}
                value={values[myvalues]}
                onChange={(value) => handleChange(myvalues, value)}
                placeholder={`请选择${name}`}
                options={options}
              ></Select>
            </div>
          );
        case "Input":
          return (
            <div {...item?.parent} key={index}>
              <div>{name}</div>
              <Input
                value={values[myvalues]}
                onChange={(e) => handleChange(myvalues, e.target.value)}
                placeholder={`请输入${name}`}
              />
            </div>
          );
        case "DatePicker":
          return (
            <div key={index}>
              <div>{name}</div>
              <DatePicker
                value={values[myvalues] ? dayjs(values[myvalues]) : null}
                onChange={(date) => handleChange(myvalues, date)}
                placeholder={`请选择${name}`}
              />
            </div>
          );
        case "RangePicker":
          return (
            <div {...item?.parent} key={index}>
              <div>{name}</div>
              <RangePicker
                className="w-[220px]"
                value={
                  values[myvalues]
                    ? [dayjs(values[myvalues][0]), dayjs(values[myvalues][1])]
                    : null
                }
                onChange={(dates) => {
                  handleChange(myvalues, dates);
                }}
                placeholder={["开始日期", "结束日期"]}
              />
            </div>
          );
        default:
          return null;
      }
    });
  }

  return (
    <div className="flex items-end flex-wrap">
      {renderFormItems()} {/*查询组件*/}
      <Button className="mx-2" color="primary" size="sm" onPress={handleQuery}>
        查询
      </Button>
      <Button size="sm" onPress={handleReset}>
        重置
      </Button>
      {props.children}
    </div>
  );
}
