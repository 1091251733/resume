<script setup>
import { reactive, ref } from "vue";
import Menu from "@/components/Menu.vue";
import { useBeginStore } from "@/store/contextmodel";
import Leftsidepopup from "@/components/Leftsidepopup.vue";
import { goFullScreen, exitFullScreen, useWindowWidth } from "@/store/utiles";

const beginStore = useBeginStore(); //本地存储
const windowWidth = useWindowWidth(); //监听页面宽度
const LeftsidepopupDom = ref(null);
const data = reactive({
  collapse: false,
  amplification: false,
});
const bigandSmle = (val) => {
  if (val === "放大") {
    data.amplification = true;
    goFullScreen();
  } else {
    data.amplification = false;
    exitFullScreen();
  }
};
const unfolding = () => {
  //展开收起
  if (windowWidth.value > 600) {
    data.collapse = !data.collapse;
  } else {
    LeftsidepopupDom?.value?.openShow(true); // 调用子组件的 closeDialog
  }
};
const operatefun = (val) => {
  if (val == "退出登录") {
    beginStore.setToken("");
    location.reload();
  }
};
</script>
<template>
  <Leftsidepopup ref="LeftsidepopupDom">
    <div class="flex-h-1 flex-direction: column min-h-[100vh] bg-[#102041]">
      <Menu :collapse="data.collapse"></Menu>
    </div>
  </Leftsidepopup>
  <el-container>
    <div
      v-if="windowWidth > 600"
      class="flex-h-1 flex-direction: column min-h-[100vh] bg-[#102041]"
    >
      <Menu :collapse="data.collapse"></Menu>
    </div>
    <el-container>
      <el-header class="flex justify-between items-center" style="height: 48px">
        <i
          @click="unfolding"
          style="font-size: 30px"
          class="material-icons cursor-pointer"
          >{{ data.collapse ? "menu" : "menu_open" }}
        </i>
        <div class="flex">
          <div
            v-if="windowWidth > 600"
            class="text-[20px] flex items-center cursor-pointer mx-2"
          >
            <i
              @click="bigandSmle('缩小')"
              v-if="data.amplification"
              class="material-icons cursor-pointer"
              >fullscreen_exit</i
            >
            <i
              @click="bigandSmle('放大')"
              v-else
              class="material-icons cursor-pointer"
              >fullscreen</i
            >
          </div>
          <el-dropdown>
            <div class="el-dropdown-link flex items-end">
              <img src="/heardeImgs.png" alt="" />
              <p v-if="windowWidth > 600" class="mx-2">你好用户</p>
              <i style="font-size: 15px" class="material-icons">
                expand_circle_down
              </i>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item @click="operatefun('退出登录')" divided
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main
        :style="windowWidth < 600 ? 'padding: 10px;' : ''"
        class="bg-[#F5F7FA]"
      >
        <div
          :class="
            ' shadow-md rounded-lg h-full bg-white ' +
            (windowWidth > 600 ? 'p-[20px]' : 'p-[8px]')
          "
        >
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<style scoped>
.el-dropdown-link:hover,
.el-dropdown-link:focus {
  border: none !important; /* 移除边框 */
  outline: none !important; /* 移除轮廓 */
}
</style>
