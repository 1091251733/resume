<script setup>
/**
 * title  标题  string
 * width  弹窗宽度 string
 * fullscreen  是否全屏 boolean
 * showclose  是否显示关闭按钮 boolean
 * draggable  拖拽功能 boolean
 * aligncenter  是否弹窗垂直居中 boolean
 * closeonclickmodal  是否点击遮罩层关闭弹窗 boolean
 * @confirm="confirm"  父组件传来确认函数
 * footer   底部组件是否展示
 */
import { ref, defineEmits } from "vue";
const emit = defineEmits(); // 定义 emit 事件(准备调用父组件方法)
const dialogVisible = ref(false);
const popupstate = (val) => {
  //打开或者关闭弹窗
  dialogVisible.value = val;
};
let props = defineProps(["date"]); //接收父组件传来的数据
//暴露方法给父组件
defineExpose({
  popupstate,
});
</script>
<template>
  <el-dialog
    v-model="dialogVisible"
    :title="props?.date?.title"
    :width="props?.date?.width"
    :fullscreen="props?.date?.fullscreen"
    :show-close="props?.date?.showclose"
    :draggable="props?.date?.draggable"
    :align-center="props?.date?.aligncenter"
    :close-on-click-modal="props?.date?.closeonclickmodal"
  >
    <slot></slot>
    <template v-if="props?.date?.footer" #footer>
      <div class="flex justify-end">
        <el-button @click="popupstate(false)">取消</el-button>
        <el-button @click="emit('confirm')" type="warning"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
