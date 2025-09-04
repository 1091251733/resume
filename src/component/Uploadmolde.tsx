import {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
} from "react";

import { Radio } from "antd";
import { DiffOutlined } from "@ant-design/icons";
import { Button } from "@heroui/react";
import Modaltow from "@/component/Modaltow";
import { fileupload } from "@/api/useApi";
import { exportTxt } from "@/store/utile";
import { usetoast } from "@/store/contextmodel";
import { FileTextOutlined, DeleteOutlined } from "@ant-design/icons";

// props是接收父组件传来的参数，或者函数方法
const Udetails = forwardRef((props: {}, ref) => {
  const [fileDate, setfileDate] = useState<any>(null); //文件
  const [chonnel_id, setchonnel_id] = useState<any>(""); //菜单id
  // 新增：存储文件名数组
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [type, settype] = useState<any>(1);
  const refDom = useRef<any>(null); //弹窗dom
  //useImperativeHandle方法将子组件的函数或者数据暴露给父组件
  useImperativeHandle(ref, () => ({
    childFunction,
  }));
  useEffect(() => {
    // 使用 URLSearchParams 解析查询参数
    const urlParams = new URLSearchParams(window.location.search);
    // 获取 id 参数
    const urlid = urlParams.get("id");
    if (urlid) {
      setchonnel_id(urlid);
      refDom.current.popupstate(true);
    }
  }, []);
  const getDateUrl = () => {
    return "11223----4455566\r\n251****62";
  };
  const childFunction = (val: boolean, id: any) => {
    // 子组件的函数
    setchonnel_id(id);
    refDom.current.popupstate(val);
  };
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // 创建 FormData 发送文件 formData  二进制文件
      const formData = new FormData();
      // 新增：保存文件名
      const names = Array.from(files).map((file) => file.name);
      setFileNames(names); // 更新文件名状态
      // 将所有文件添加到 FormData 的 files 字段（后端接收 files 数组）
      Array.from(files).map((file, index) => {
        formData.append(`files${index}`, file);
      });
      formData.append("type", type);
      formData.append("key", "three_bind");
      formData.append("chonnel_id", chonnel_id);
      //如果需要继续增加参数继续append...
      setfileDate(formData);
      event.target.value = ""; //清空内容可重复上传文件
    }
  };
  // 修改：修复 handleDeleteFile，仅删除指定文件并更新 fileDate
  const handleDeleteFile = (index: number) => {
    // 过滤掉指定索引的文件名
    const updatedFileNames = fileNames.filter((_, i) => i !== index);

    // 如果没有剩余文件，清空状态
    if (updatedFileNames.length === 0) {
      setFileNames([]);
      setfileDate(null);
      return;
    }
    // 从 fileDate 获取文件列表
    const currentFiles: File[] = [];
    let i = 0;
    while (fileDate.get(`files${i}`)) {
      currentFiles.push(fileDate.get(`files${i}`));
      i++;
    }
    // 过滤掉指定索引的文件
    const updatedFiles = currentFiles.filter((_, i) => i !== index);
    // 重新构建 FormData
    const newFormData = new FormData();
    updatedFiles.forEach((file, i) => {
      newFormData.append(`files${i}`, file);
    });
    newFormData.append("type", type);
    newFormData.append("key", "three_bind");
    newFormData.append("chonnel_id", chonnel_id);
    // 更新状态
    setFileNames(updatedFileNames);
    setfileDate(newFormData);
  };

  const affirm = () => {
    //点击提交
    // 新增：验证是否有文件
    if (!fileDate || fileNames.length === 0) {
      usetoast("请先上传文件");
      return;
    }
    fileupload(fileDate).then((res: any) => {
      if (res.code == 200) {
        usetoast("上传成功", "success");
        childFunction(false, "");
        // 新增：清空文件名和文件数据
        setFileNames([]);
        setfileDate(null);
      }
    });
  };
  return (
    <>
      <input
        type="file"
        id="file-input"
        style={{ display: "none" }}
        accept=".txt"
        multiple={type == 2}
        onChange={handleFileChange}
      />
      <Modaltow
        configuration={{
          isDismissable: true, //是否点击遮罩层关闭弹窗
          radius: "md", //圆角
          placement: "center", //弹窗打开位置
          size: "sm", //弹窗大小
          backdrop: "opaque", //遮罩背景
          hideCloseButton: false, //是否隐藏关闭按钮
          Header: "添加任务",
          footrBut: "提交",
        }}
        affirm={affirm}
        ref={refDom}
      >
        <div className="mb-4 flex justify-between border-b-2 border-dashed rounded-sm border-[#ACBEBE]">
          <div></div>
          <p
            className="underline cursor-pointer text-primary-500 hover:text-red-600"
            onClick={() => exportTxt(getDateUrl(), "模板试列", "txt")}
          >
            下载模板
          </p>
        </div>
        <ul>
          <li className=" flex items-center mb-3 ">
            <p className=" mr-[15px] ">登录类型：</p>
            <Radio.Group
              value={type}
              options={[
                { value: 1, label: "单文件上传" },
                { value: 2, label: "多文件上传" },
              ]}
              onChange={(val) => {
                settype(val.target.value);
                // 新增：切换类型时清空文件
                setFileNames([]);
                setfileDate(null);
              }}
            />
          </li>
        </ul>
        <Button
          className="text-white"
          size="sm"
          color="warning"
          onPress={() => document.getElementById("file-input")?.click()}
        >
          <DiffOutlined />
          上传文件
        </Button>
        {/* 新增：显示已上传文件名和删除按钮 */}
        <div className="border-2 p-2 border-dashed rounded-sm border-[#ACBEBE]">
          {fileNames.length > 0 ? (
            fileNames.map((name, index) => (
              <div
                key={index}
                className="hover:bg-[#F2F2F2] p-1 flex text-sm items-center justify-between "
              >
                <div>
                  <FileTextOutlined /> &nbsp;
                  <span>{name}</span>
                </div>
                <DeleteOutlined
                  className="hover:text-red-500"
                  onClick={() => handleDeleteFile(index)}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">未上传文件</p>
          )}
        </div>
      </Modaltow>
    </>
  );
});
export default Udetails;
