<template>
  <div
    class="w-full max-w-[800px] p-5 mx-auto flex flex-col md:shadow-2xl overflow-hidden"
  >
    <NImage
      class="w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full mx-auto mb-5 fade_InDown"
      :src="getImageUrl(userInfo.avatar)"
      lazy
    />
    <div class="text-3xl font-bold text-center pb-2 fade_InDown">
      {{ userInfo.name }}
    </div>
    <div
      class="text-sm opacity-60 font-normal text-grey text-center pb-4 fade_InDown"
    >
      {{ userInfo.job }}
    </div>
    <!-- info -->
    <div
      class="flex justify-center flex-wrap gap-x-6 gap-y-1 mb-7 fadeIn_Right"
    >
      <div
        class="flex justify-space text-sm"
        v-for="(item, index) in userInfo.infoList"
        :key="index"
      >
        <span>{{ item.title }}：</span>
        <span>{{ item.value }}</span>
      </div>
    </div>
    <div class="fadeInLeft">
      <div class="text-lg font-bold mb-4 text71">工作经验</div>
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
    </div>
    <div className="loading17 text-lg font-bold mb-4 mt-7 ">
      <span className="load-span17">技</span>
      <span className="load-span17">能</span>
      <span className="load-span17">特</span>
      <span className="load-span17">长</span>
    </div>
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
import { userInfo } from "./store/tableDate";
import { NCarousel, NImage } from "naive-ui";

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
