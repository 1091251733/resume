<script setup>
import { ref } from "vue";
const dialogVisible = ref(false);
const popupstate = (val) => {
  //打开或者关闭弹窗
  dialogVisible.value = val;
};
let props = defineProps(["date"]); //接收父组件传来的数据
console.log(props.date, "prprprprpr");

//暴露方法给父组件
defineExpose({
  popupstate,
});
</script>
<template>
  <el-dialog  v-model="dialogVisible" title="" width="">
    <slot></slot>
  </el-dialog>
</template>
