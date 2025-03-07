<template>
  <div
    className="text-[26px] w-full h-full flex flex-col justify-center items-center "
  >
    <div class="font24" data-text="404">404</div>
    <h1>- _ - 页面未找到</h1>
    <p>您访问的页面不存在 ❗</p>
  </div>
</template>
<style scoped>
.font24 {
  width: 156px;
  height: 98px;
  position: relative;
  font-size: 70px;
  font-weight: 900;
  color: transparent;
  letter-spacing: 10px;
  z-index: 10;
  animation: text-skew24 4s linear infinite;
}
.font24:before {
  display: block;
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
}
.font24:after {
  display: block;
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
}
.font24:before {
  animation: text-light241 1s alternate-reverse infinite;
  color: #ff0000;
  z-index: -5;
  text-shadow: 2px 2px 0 #00ff00;
  mix-blend-mode: darken;
}
.font24:after {
  animation: text-light242 0.5s alternate-reverse infinite;
  color: #00ff00;
  z-index: -10;
  text-shadow: 2px 2px 0 #ff0000;
}
@keyframes text-light241 {
  10% {
    transform: translate(-2px, 4px);
  }
  50% {
    transform: translate(2px, 2px);
  }
  100% {
    transform: translate(-4px, 4px);
  }
}
@keyframes text-light242 {
  0% {
    transform: translate(0, 0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, 2px);
  }
  60% {
    transform: translate(2px, -2px);
  }
  80% {
    transform: translate(2px, 2px);
  }
  100% {
    transform: translate(0, 0);
  }
}
@keyframes text-skew24 {
  29% {
    color: transparent;
    transform: skew(0deg, 0deg);
  }
  30% {
    color: #000000;
    transform: skew(10deg, 40deg);
  }
  31% {
    color: transparent;
    transform: skew(0deg, 0deg);
  }
  69% {
    color: transparent;
    transform: skew(0deg, 0deg);
  }
  70% {
    color: #000000;
    transform: skew(180deg, 10deg);
  }
  71% {
    color: transparent;
    transform: skew(0deg, 0deg);
  }
}
</style>
