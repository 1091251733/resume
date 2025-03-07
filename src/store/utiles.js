import { ref, onMounted, onUnmounted } from "vue";


// 封装监听页面宽度的函数
export function useWindowWidth() {
  const width = ref(window.innerWidth);
  const handleResize = () => {
    width.value = window.innerWidth;
  };
  onMounted(() => {
    window.addEventListener("resize", handleResize);
  });
  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });
  // 返回响应式宽度
  return width;
}

export const goFullScreen = () => {
  //全屏网页
  const element = document.documentElement;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    // Firefox
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    // Chrome, Safari 和 Opera
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    // IE/Edge
    element.msRequestFullscreen();
  }
};

export const exitFullScreen = () => {
  //缩小全屏网页
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
};

//小山登录背景
export const loginBg = () => {
  const elems = document.querySelectorAll(".laya-please");
  const layer3 = document.querySelector(".layer-3");
  const layer4 = document.querySelector(".layer-4");
  const layer5 = document.querySelector(".layer-5");
  const layer6 = document.querySelector(".layer-6");
  const layer7 = document.querySelector(".layer-7");
  const layer8 = document.querySelector(".layer-8");

  setTimeout(() => {
    elems.forEach((elem) => {
      elem.style.animation = "none";
    });
  }, 1500);

  document.body.addEventListener("mousemove", (e) => {
    const target = e.currentTarget;

    if (!target.dataset.triggered) {
      elems.forEach((elem) => {
        if (elem.getAttribute("style")) {
          elem.style.transition = "all .5s";
          elem.style.transform = "none";
        }
      });
    }
    target.dataset.triggered = "true";

    const width = window.innerWidth / 2;
    const mouseMoved2 = (width - e.pageX) / 50;
    const mouseMoved3 = (width - e.pageX) / 40;
    const mouseMoved4 = (width - e.pageX) / 30;
    const mouseMoved5 = (width - e.pageX) / 20;
    const mouseMoved6 = (width - e.pageX) / 10;
    const mouseMoved7 = (width - e.pageX) / 5;

    if (layer3) layer3.style.transform = `translateX(${mouseMoved2}px)`;
    if (layer4) layer4.style.transform = `translateX(${mouseMoved3}px)`;
    if (layer5) layer5.style.transform = `translateX(${mouseMoved4}px)`;
    if (layer6) layer6.style.transform = `translateX(${mouseMoved5}px)`;
    if (layer7) layer7.style.transform = `translateX(${mouseMoved6}px)`;
    if (layer8) layer8.style.transform = `translateX(${mouseMoved7}px)`;
  });

  document.body.addEventListener("mouseleave", () => {
    elems.forEach((elem) => {
      elem.style.transition = "all .5s";
      elem.style.transform = "none";
    });
  });

  document.body.addEventListener("mouseenter", () => {
    elems.forEach((elem) => {
      setTimeout(() => {
        elem.style.transition = "none";
      }, 500);
    });
  });
};
