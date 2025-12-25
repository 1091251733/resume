<template>
  <div class="w-full max-w-[800px] p-5 mx-auto flex flex-col md:shadow-2xl">
    <NImage
      class="w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full mx-auto mb-5"
      :src="getImageUrl(userInfo.avatar)"
      lazy
    />
    <div class="text-3xl font-bold text-center pb-2">{{ userInfo.name }}</div>
    <div class="text-sm opacity-60 font-normal text-grey text-center pb-4">
      {{ userInfo.job }}
    </div>

    <!-- info -->
    <div class="flex justify-center flex-wrap gap-x-6 gap-y-1 mb-7">
      <div
        class="flex justify-space text-sm"
        v-for="(item, index) in userInfo.infoList"
        :key="index"
      >
        <span>{{ item.title }}：</span>
        <span>{{ item.value }}</span>
      </div>
    </div>

    <div class="text-lg font-bold mb-4">工作经验</div>
    <div
      class="text-sm"
      v-for="(item, index) in userInfo.employmentList"
      :key="index"
    >
      <div class="flex justify-between pb-2">
        <div>{{ item.startDate }} ~ {{ item.endDate }}</div>
        <strong>{{ item.title }}</strong>
      </div>
      <div class="text-gray-500 mb-2" v-for="(v, i) in item.value" :key="i">
        {{ v }}
      </div>
    </div>

    <div class="text-lg font-bold mb-4 mt-7">技能特长</div>
    <ul
      class="text-sm text-gray-500 mb-2"
      v-for="(item, index) in userInfo.skillExpertise"
      :key="index"
    >
      <li v-html="item"></li>
    </ul>

    <div class="text-lg font-bold mb-4 mt-7">项目经验</div>
    <div
      class="project-card flex flex-col gap-y-2 text-sm pt-[20px] mt-[20px] first:mt-0 border-t-[2px] border-dashed"
      v-for="(item, index) in userInfo.projectExperienceList"
      :key="index"
    >
      <div class="font-bold text-[19px]">{{ item.project }}</div>
      <div v-if="item.weburl || item.titleURl">
        {{ item.titleURl || "地址："
        }}<a
          v-if="item.weburl"
          style="text-decoration: underline"
          class="text-purple-500 cursor-pointer"
          :href="item.weburl"
          target="_blank"
          >{{ item.weburl }}</a
        >
      </div>
      <div class="font-bold">项目描述：</div>
      <div class="text-gray-500 pl-5">{{ item.summary }}</div>
      <div class="font-bold">项目技术栈：</div>
      <div class="text-gray-500 pl-5">{{ item.techStack }}</div>
      <div class="font-bold">我的职责：</div>
      <div class="text-gray-500 pl-5">
        <div v-for="(v, i) in item.dutiesList" :key="i">{{ v }}</div>
      </div>

      <div
        v-if="item.webImageList || item.h5ImageList || item.imageList"
        class="font-bold"
      >
        项目快照：
      </div>

      <NCarousel
        v-if="item.h5ImageList"
        show-arrow
        draggable
        mousewheel
        slides-per-view="4"
      >
        <NImage
          v-for="(url, i) in item.h5ImageList"
          :key="i"
          :src="getImageUrl(url)"
          lazy
        />
      </NCarousel>
      <NCarousel v-if="item.webImageList" show-arrow draggable mousewheel>
        <NImage
          v-for="(url, i) in item.webImageList"
          :key="i"
          :src="getImageUrl(url)"
          lazy
        />
      </NCarousel>
      <NCarousel v-if="item.imageList" show-arrow draggable mousewheel>
        <NImage
          class="w-full !h-full"
          v-for="(url, i) in item.imageList"
          :key="i"
          :src="getImageUrl(url)"
          lazy
        />
      </NCarousel>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { NCarousel, NImage } from "naive-ui";

const userInfo = ref({
  name: "郑凯文",
  job: "前端开发工程师",
  avatar: {
    cdn: "",
    // /avatar.jpg
    local: "/avatar.jpg",
  },
  infoList: [
    { title: "年龄", value: "26" },
    { title: "性别", value: "男" },
    { title: "电话", value: "18048429819" },
    { title: "邮箱", value: "1091251733@qq.com" },
    { title: "期望薪资", value: "11-13 k" },
    { title: "毕业院校", value: "西南交通大学" },
  ],
  employmentList: [
    {
      startDate: "2020-09",
      endDate: "2022-09",
      title: "派沃特科技有限公司",
      value: ["· 前端开发工程师 | 7K"],
    },
    {
      startDate: "2022-10",
      endDate: "2023-05",
      title: "含然软件有限公司",
      value: ["· 前端开发工程师 | 8.5K"],
    },
    {
      startDate: "2023-05",
      endDate: "2023-11",
      title: "成都雪域云巅科技有限公司",
      value: ["· 前端开发工程师 | 9K"],
    },
    {
      startDate: "2023-11",
      endDate: "至今",
      title: "成都谦屿科技有限公司",
      value: ["· 前端开发工程师 | 11K"],
    },
  ],
  skillExpertise: [
    '1. 熟练使用主流框架及自动化构建工具 <span class="font-bold text-black">Vue2/3、React、Electron、Jquery、Uniapp、Vite、Webpack</span>',
    '2. 熟练使用主流UI库 <span class="font-bold text-black">HeroUI、HiUIDesign、Vant、AntDesign/Mobile、uView、uCharts、ECharts、ElementUI、NaiveUI</span>',
    "3. 对组件化、脚手架开发有着组合丰富的 项目经验，模块化开发以及代码封装思想。",
    '状态管理库：<span class="font-bold text-black">Zustand</span>、Vuex、Pinia',
    '4. 掌握多种后台交互技术，熟练使用Axios、Fetch、Request、Ajax、<span class="font-bold text-black">SSE、WebSocket</span>请求数据；',
    "5. 掌握使用Flex、Grid一二维布局进行开发，能在项目中使用ES6以上(赋值与解构赋值、Promise、箭头函数、rest运算符等)语法简化程序；",
    "6. 掌握HTML、CSS等网页前端技术，可纯手写可读性强且符合标准的页面，快速搭建前端界面并对浏览器渲染原理一定了解；",
    "7. 掌握JavaScript/TypeScript开发，熟悉JS封装、类、原型链、闭包等代码的编写；",
    '8. 熟悉Less、Sass的Css预处理器，<span class="font-bold text-black">Tailwind CSS、Framer-motion</span>、Animatopy，能够实现Css代码优化可读性强、增强界面交互；',
    "9. 熟练原生小程序及App、H5多端开发。以及响应式页面开发",
    "10. 了解 Node.js开发，能够使用Node js和 Express实现服务器端功能,数据库的操作及其 增、删、改、查等基本代码的编写",
  ],
  projectExperienceList: [
    {
      project: "东孚ERP + 东孚官网",
      titleURl: "官网地址：",
      weburl: "https://www.dongfufood.net/",
      summary: `该项目是为辽宁东孚控股公司开发的erp+官网系统，官网主要是介绍东孚公司的核心价值观，以及品质保障和各种产品介绍。
erp系统的模块有:登录页；后台首页(后台功能预览)；商品管理模块(查询商品、供货、发货管理)；订单管理(查询订单信息及修改)；
OA管理；仓库管理；商品管理；CRM管理；销售管理(对销售订单，商品销售情况进行可视化报表分析)；账号管理(超级管理员可以
添加普通管理员账号，以及查看账号信息)；帮助中心模块包括操作指南。`,
      dutiesList: [
        "负责开发官网",
        "负责考勤打卡小程序开发，可视化大屏系统开发",
        "确定ERP技术选型，规划工作时间搭建架构及人员工作安排。",
        "负责ERP生产，商品，采购，仓库，销售，账号管理，OA等模块开发",
      ],
      techStack:
        "React、Tailwindcss、Zustand、WebSocket、TypeScript、React-Router、Vite、Fetch、AntDesign、HeroUI",
      imageList: [
        {
          cdn: "",
          local: "/dongfu/0.png",
        },
        {
          cdn: "",
          local: "/dongfu/1.png",
        },
        {
          cdn: "",
          local: "/dongfu/2.png",
        },
        {
          cdn: "",
          local: "/dongfu/3.png",
        },
        {
          cdn: "",
          local: "/dongfu/4.png",
        },
        {
          cdn: "",
          local: "/dongfu/5.png",
        },
        {
          cdn: "",
          local: "/dongfu/6.png",
        },
        {
          cdn: "",
          local: "/dongfu/7.png",
        },
        {
          cdn: "",
          local: "/dongfu/8.png",
        },
        {
          cdn: "",
          local: "/dongfu/9.png",
        },
        {
          cdn: "",
          local: "/dongfu/10.png",
        },
      ],
    },
    {
      project: "东孚考勤打卡管理小程序",
      summary: `此项目借鉴钉钉APP而开发的企业级打卡、管理 小程序，方便员工上下班打卡统计考勤记录，PC端部分功能平移小程序内（方便用户在手机端能管理企业部分业务）`,
      dutiesList: ["负责整个项目前端开发、后期维护迭代"],
      techStack: "Uniapp、Vue3、Less、uView",
      h5ImageList: [
        {
          cdn: "",
          local: "/dongfu/dak/0.png",
        },
        {
          cdn: "",
          local: "/dongfu/dak/1.png",
        },
        {
          cdn: "",
          local: "/dongfu/dak/2.png",
        },
        {
          cdn: "",
          local: "/dongfu/dak/3.png",
        },
        {
          cdn: "",
          local: "/dongfu/dak/4.png",
        },
        {
          cdn: "",
          local: "/dongfu/dak/5.png",
        },
        {
          cdn: "",
          local: "/dongfu/dak/6.png",
        },
        {
          cdn: "",
          local: "/dongfu/dak/7.png",
        },
        {
          cdn: "",
          local: "/dongfu/dak/8.png",
        },
        {
          cdn: "",
          local: "/dongfu/dak/9.png",
        },
        {
          cdn: "",
          local: "/dongfu/dak/10.png",
        },
      ],
    },
    {
      project: "UiTab (浏览器插件新标签页、后台管理系统、官网）",
      titleURl: "地址：",
      weburl: "https://uitab.com/",
      summary: `公司为了方便大量用户使用浏览器更方便、有交互体验感（而诞生的一个项目）。如天气、日历、AI、伴随AI、下班倒计时、今
日新闻、代办、备忘录等小组件，即点即用方便快捷。实现小组件在页面任意拖拽，点击切换任意调整大小形
态，以及页面随着壁纸变化而变化的高度定制化主题系统，白夜模式切换。而与用户高度定制化一个项目`,
      dutiesList: [
        "负责官网、后台开发",
        "浏览器插件负责所有功能性小组件开发",
        "插件搜索功能、AI聊天开发",
      ],
      techStack:
        "React、Cocos、Vite、TypeScript、Zustand、Dayjs、SSE、framer-motion、Immer。NextUI、AntDesign、Tailwindcss、Highlighter",
      webImageList: [
        {
          cdn: "",
          local: "/uitab/0.png",
        },
        {
          cdn: "",
          local: "/uitab/1.png",
        },
        {
          cdn: "",
          local: "/uitab/2.png",
        },
        {
          cdn: "",
          local: "/uitab/3.png",
        },
        {
          cdn: "",
          local: "/uitab/4.png",
        },
        {
          cdn: "",
          local: "/uitab/10.png",
        },

        {
          cdn: "",
          local: "/uitab/5.png",
        },

        {
          cdn: "",
          local: "/uitab/6.png",
        },
        {
          cdn: "",
          local: "/uitab/7.png",
        },
        {
          cdn: "",
          local: "/uitab/8.png",
        },
        {
          cdn: "",
          local: "/uitab/9.png",
        },
      ],
    },
    {
      project: "自由行HTTP",
      titleURl: "地址：",
      weburl: "https://www.ziyxip.com/",
      summary: `企业级代理IP服务商，全方位大数据采集，HTTP/HTTPS/SOCKS5/隧道代理/动态IP/固态IP`,
      dutiesList: ["负责整个项目前端开发、后期维护迭代"],
      techStack:
        "React、Vite、TypeScript、Autofit、Zustand、Dayjs、Immer。Heroui、Framer-motion、Tailwindcss、Sweetalert2",
      webImageList: [
        {
          cdn: "",
          local: "/ziyxip/0.png",
        },
        {
          cdn: "",
          local: "/ziyxip/1.png",
        },
        {
          cdn: "",
          local: "/ziyxip/7.png",
        },
        {
          cdn: "",
          local: "/ziyxip/2.png",
        },
        {
          cdn: "",
          local: "/ziyxip/3.png",
        },
        {
          cdn: "",
          local: "/ziyxip/4.png",
        },
        {
          cdn: "",
          local: "/ziyxip/5.png",
        },
        {
          cdn: "",
          local: "/ziyxip/6.png",
        },

        {
          cdn: "",
          local: "/ziyxip/8.png",
        },
      ],
    },
    {
      project: "天马云客服系统",
      summary: `提供企业内部与客户聊天系统`,
      dutiesList: ["负责整个项目前端开发、后期维护迭代"],
      techStack:
        "React、Vite、TypeScript、Autofit、Zustand、Dayjs、Immer。Heroui、Framer-motion、Tailwindcss、Sweetalert2",

      h5ImageList: [
        {
          cdn: "",
          local: "/tianma/0.png",
        },
        {
          cdn: "",
          local: "/tianma/1.png",
        },
        {
          cdn: "",
          local: "/tianma/2.png",
        },
        {
          cdn: "",
          local: "/tianma/3.png",
        },
        {
          cdn: "",
          local: "/tianma/4.png",
        },
        {
          cdn: "",
          local: "/tianma/5.png",
        },
        {
          cdn: "",
          local: "/tianma/6.png",
        },
        {
          cdn: "",
          local: "/tianma/7.png",
        },
        {
          cdn: "",
          local: "/tianma/8.png",
        },
        {
          cdn: "",
          local: "/tianma/9.png",
        },
        {
          cdn: "",
          local: "/tianma/10.png",
        },
      ],
    },
    {
      project: "公牛电子签名管理系统",
      summary: `Bull系统包括C端和B端。C端专注于客户合同签字，通过<iframe>内嵌Shark系统。B端分为统计、模板和合同查询三个板 块。利用Echars展示不同贷款品牌统计和已签合同数量及比例。编辑不同贷款品牌的证书、合同。查询详情并提供下载签名证书 和完整合同的电子版。`,
      dutiesList: [
        "1.独立负责项目从零到一的全面开发，结合项目经理提供的原型图和业务需求，进行界面调整与开发。",
        "2.为适配美国律师编辑习惯，使用Tiptap插件开发。通过二次编辑源码解决原插件表格颜色及样式丢失问题。",
        "3.富文本编辑独立成组件，添加图片内联外联切换、可选表格无边框、重写预设的各类选择器，并在其它项目应用。",
        "4.严谨的操作逻辑，防止误删文本变量、发送预览邮件、编辑已发布合同先创建副本供用户编辑，发布后才替换。",
        "5.采用微前端技术对复杂项目进行解耦。",
      ],
      techStack: "Vue.js 2、VueX、Vue-Router、Vue-CLI、Vuetify-UI、Sass",
      webImageList: [
        {
          cdn: "",
          local: "/gongniu/0.png",
        },
        {
          cdn: "",
          local: "/gongniu/1.png",
        },
        {
          cdn: "",
          local: "/gongniu/2.png",
        },
        {
          cdn: "",
          local: "/gongniu/3.png",
        },
        {
          cdn: "",
          local: "/gongniu/4.png",
        },
        {
          cdn: "",
          local: "/gongniu/5.png",
        },
        {
          cdn: "",
          local: "/gongniu/6.png",
        },
        {
          cdn: "",
          local: "/gongniu/7.png",
        },
        {
          cdn: "",
          local: "/gongniu/8.png",
        },
      ],
    },
    {
      project: "慕映影视（H5、后台系统）",
      summary: `这是一个帮助影迷发现和管理影视作品的智能工具。它不仅能根据你的喜好推荐剧集，还能让你轻松记录“在看”、“想看”和“已看”的片单，并管理自己的观看进度。
      类似于腾讯视频的视频播放软件。项目主要模块有首页（视频分类，视频筛选，视频搜索等），短视频，VIP会员，个人中心等`,
      dutiesList: ["负责整个项目前端开发"],
      techStack:
        "Dlayer、Mescroll、React、Vite、TypeScript、Zustand、Heroui、Tailwindcss",
      webImageList: [
        {
          cdn: "",
          local: "/muying/ht0.png",
        },
        {
          cdn: "",
          local: "/muying/ht1.png",
        },
        {
          cdn: "",
          local: "/muying/ht2.png",
        },
        {
          cdn: "",
          local: "/muying/ht3.png",
        },
        {
          cdn: "",
          local: "/muying/ht4.png",
        },
        {
          cdn: "",
          local: "/muying/ht5.png",
        },
      ],
      h5ImageList: [
        {
          cdn: "",
          local: "/muying/0.png",
        },
        {
          cdn: "",
          local: "/muying/1.png",
        },
        {
          cdn: "",
          local: "/muying/2.png",
        },
        {
          cdn: "",
          local: "/muying/3.png",
        },
        {
          cdn: "",
          local: "/muying/4.png",
        },
        {
          cdn: "",
          local: "/muying/5.png",
        },
        {
          cdn: "",
          local: "/muying/6.png",
        },
        {
          cdn: "",
          local: "/muying/7.png",
        },
        {
          cdn: "",
          local: "/muying/8.png",
        },
      ],
    },
    {
      project: "流量汇,领新宝(App、后台管理系统)",
      titleURl: "地址：APK",
      summary: `流量汇VIP用户支付任务金额，发布视频任务。试列:抖音关注点赞等一系列任务。领新宝App用户接受并完成
任务获得佣金，App加入广告联盟。此项目实现用户流量变现，平台流量变现主要业务场景`,
      dutiesList: ["负责整个项目前端开发"],
      techStack: "Uniapp，Vue3，Vant，Elementplus，JsonBig",
    },
    {
      project: "仁泽到家 (PC、小程序、APP、H5)",
      weburl: "https://www.renzedaojia.com/",
      summary: `该项目是公司利用人群大量需求，在家设备、电视、家电等。在线下单师傅上门安装与维修的平台，方便用户
即刻下单24小时内师傅到家送货上门、维修、安装等业务场景`,
      dutiesList: ["负责整个项目前端开发、UI设计"],
      techStack: "Vue2、Vuex、Uniapp、ElementUI、uView、Less、Axios、mixin",
    },
    {
      project: "公益志愿者平台（微信小程序）",
      summary: `(腾讯外包) 公益志愿者平台是腾讯公益慈善基金会主导的为各类公益活动展示举办与报名的小程序，具有公
益活动首页、活动检索、活动详情、活动报名、个人公益中心等多个模块构成、致力于让更多人加入公益活动
帮助社会弱势群体并且带来温暖`,
      dutiesList: ["负责整个项目前端开发"],
      techStack: "Uniapp，Vue3",
    },
  ],
});

function getImageUrl(url) {
  if (typeof url === "string") {
    return new URL(url, import.meta.url).href;
  }
  if (url?.cdn && /^https?:\/\//.test(url.cdn)) {
    return url.cdn;
  }
  return new URL(url.local, import.meta.url).href;
}
</script>

<style>
.n-carousel__arrow {
  background: #7828c841 !important;
}
.n-carousel__dot {
  background: #7828c83d !important;
}
.n-carousel__dot--active {
  background: red !important;
}
</style>
