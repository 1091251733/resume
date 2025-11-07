import { useState, useEffect } from "react";
import { usetoast } from "@/store/contextmodel";
import dayjs from "dayjs";
type DebounceFn = (...args: any[]) => void;

export function exportTxt(content: any, filename: string, type: string) {
  //下载txt文件   content：内容 换行可以用\r\n   filename:文件名  type下载文件类型  txt..
  const blob = new Blob([content], { type });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export const copy = (val: string) => {
  //复制方法
  const textArea = document.createElement("textarea");
  textArea.value = val;
  textArea.style.position = "fixed"; // 避免影响页面布局
  textArea.style.opacity = "0"; // 隐藏元素
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  const successful = document.execCommand("copy");
  document.body.removeChild(textArea);
  if (successful) {
    usetoast("复制成功", "success");
    return true;
  } else {
    console.error("回退方案复制失败");
    return false;
  }
};
// 防抖
export function debounce(func: DebounceFn, delay: number = 3000): DebounceFn {
  let timer: number | undefined;
  return function (this: any, ...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
// 节流
export function throttle(func: DebounceFn, delay: number = 3000): DebounceFn {
  let timeout: number | undefined;
  return function (this: any, ...args: any[]) {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = undefined;
        func.apply(this, args);
      }, delay);
    }
  };
}

export const goFullScreen = () => {
  //全屏网页
  const element = document.documentElement;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if ((element as any).mozRequestFullScreen) {
    // Firefox
    (element as any).mozRequestFullScreen();
  } else if ((element as any).webkitRequestFullscreen) {
    // Chrome, Safari 和 Opera
    (element as any).webkitRequestFullscreen();
  } else if ((element as any).msRequestFullscreen) {
    // IE/Edge
    (element as any).msRequestFullscreen();
  }
};

export const exitFullScreen = () => {
  //缩小全屏网页
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if ((document as any).mozCancelFullScreen) {
    (document as any).mozCancelFullScreen();
  } else if ((document as any).webkitExitFullscreen) {
    (document as any).webkitExitFullscreen();
  } else if ((document as any).msExitFullscreen) {
    (document as any).msExitFullscreen();
  }
};

export function useWindowWidth() {
  //监听页面宽度
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = throttle(() => {
      setWidth(window.innerWidth);
    }, 800);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

export function formatTimeAgo(time: string): string {
  //计算多少时间前  比如 time参数值：几天前几小时前  时间格式：2025-06-29 08:00:00
  const num = dayjs().diff(dayjs(time), "minute");
  const diffMinutes = Math.abs(num);

  if (diffMinutes == 0) return `刚刚`;
  if (diffMinutes < 60) return `${diffMinutes}分钟前`;
  if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}小时前`;
  const days = Math.floor(diffMinutes / 1440);
  const remainingHours = Math.floor((diffMinutes % 1440) / 60);

  return remainingHours > 0
    ? `${days}天${remainingHours}小时前`
    : `${days}天前`;
}
