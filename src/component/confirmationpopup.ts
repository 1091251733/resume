import Swal, { SweetAlertOptions, SweetAlertResult } from "sweetalert2";
// 定义弹窗配置类型 (封装确认弹窗)
interface WarningOptions {
  position?: SweetAlertOptions["position"]; // 位置
  icon?: SweetAlertOptions["icon"]; // 图标
  title?: string; // 标题
  text?: string; // 内容
  timer?: number; // 自动关闭时间
  timerProgressBar?: boolean; // 是否有进度条
  footer?: string; // 底部内容
  confirmButtonColor?: string; // 确定按钮颜色
  cancelButtonColor?: string; // 取消按钮颜色
  allowOutsideClick?: boolean; // 是否允许外部点击
  confirmButtonText?: string; // 确定按钮文本
  cancelButtonText?: string; // 取消按钮文本
  showCancelButton?: boolean; // 是否显示取消按钮
}

export const confirmationpopup = (
  options: WarningOptions
): Promise<SweetAlertResult> => {
  return Swal.fire({
    position: options.position || "center", // 默认居中, //位置
    icon: options.icon, //提示框图标
    title: options.title, //标题
    text: options.text, //内容
    timer: options.timer, //自动关闭时间
    timerProgressBar: options.timerProgressBar, //是否有关闭进度条
    footer: options.footer, //底部内容
    confirmButtonColor: options.confirmButtonColor, // 确定按钮颜色
    cancelButtonColor: options.cancelButtonColor, // 取消按钮颜色
    allowOutsideClick: options.allowOutsideClick, // 是否允许外部点击
    confirmButtonText: options.confirmButtonText, //确定按钮
    showCancelButton: options.showCancelButton, //是否有取消按钮
    cancelButtonText: options.cancelButtonText, //取消按钮
  }).then((res) => {
    return res;
  });
};
