import React from "react";
import { Form, Row, Col } from "antd";

interface FieldConfig {
  name: string;
  label: string;
  component: React.ComponentType<any>; // 接受 Ant Design 组件
  rules?: any[];
  placeholder?: string;
  options?: any[]; // 适用于如 Select 组件的选项
  [key: string]: any; // 其他可扩展属性
}

interface CustomFormProps {
  onSubmit: (values: any) => void;
  form: any; // 接受 form 实例
  initialValues?: any;
  customStyles?: {
    form?: string;
    item?: string;
    button?: string;
  };
  fieldConfig: FieldConfig[];
  submitButton?: any;
  layout: "vertical" | "horizontal" | "inline";
  labelAlign: "right" | "left";
  labelCol?: any;
  wrapperCol?: any;
  Colspan: number;
}

const CustomForm: React.FC<CustomFormProps> = ({
  onSubmit,
  form,
  initialValues,
  customStyles,
  fieldConfig,
  layout,
  labelAlign,
  labelCol,
  wrapperCol,
  submitButton,
  Colspan,
}) => {
  return (
    <Form
      form={form}
      name="custom_form"
      layout={layout}
      onFinish={onSubmit}
      initialValues={initialValues}
      className={`${customStyles?.form}`}
    >
      <Row gutter={24}>
        {/* 使用 Row 和 Col 来布局 */}
        {fieldConfig.map(
          (
            {
              classstyles,
              name,
              label,
              component: Component,
              rules,
              placeholder,
              options,
              ...rest
            },
            index
          ) => (
            <Col span={Colspan} key={index}>
              {/* 每个字段占据 12 格，2 个字段一行 */}
              <Form.Item
                label={label}
                name={name}
                rules={rules}
                labelAlign={labelAlign} // 表单标题对其方式
                labelCol={labelCol} // 控制 label 的宽度
                wrapperCol={wrapperCol} // 控制输入框等的宽度
                className={customStyles?.item} // 动态合并 classNames
              >
                {/* 动态渲染 Ant Design 组件 */}
                <Component
                  className={classstyles || ""} // 支持动态字段样式
                  placeholder={placeholder}
                  options={options}
                  {...rest}
                />
              </Form.Item>
            </Col>
          )
        )}
      </Row>
      {/* 提交按钮 */}
      <Form.Item
        // wrapperCol={{ offset: 6, span: 18 }}
        className={`${customStyles?.item}`}
      >
        {submitButton}
      </Form.Item>
    </Form>
  );
};

export default CustomForm;
