<script setup>
import { ref } from "vue";
import TableView from "@/components/TableView.vue";
import Molde from "@/components/Molde.vue";
const MoldeDom = ref(null);
const openShow = () => {
  MoldeDom?.value?.popupstate(true);
};
</script>

<template>
  <div @click="openShow">封装表格-打开弹窗</div>
  <Molde
    :date="{ title: '标题', width: '500', fullscreen: true }"
    ref="MoldeDom"
  >
    <span>This is a message</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="warning" @click="dialogVisible = false">
          确定
        </el-button>
      </div>
    </template>
  </Molde>
  <TableView></TableView>
</template>
