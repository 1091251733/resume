<script setup>
import { ref, reactive } from "vue";
import TableView from "@/components/TableView.vue";
import { headerTbale } from "@/store/tableDate";
import { queryOrderList } from "@/api/useApi";
import Molde from "@/components/Molde.vue";
const MoldeDom = ref(null); //弹窗组件
const TableDom = ref(null); //表格DOM
const data = reactive({
  order_sn: "", //查询
});
const openShow = () => {
  MoldeDom?.value?.popupstate(true);
};
const confirm = () => {
  //弹窗确定函数
  console.log("我被子组件调用了");
};
const searchresult = (type) => {
  console.log(TableDom.value);
  TableDom.value.getList(type, data);
};
</script>
<template>
  <div @click="openShow">封装表格-打开弹窗</div>
  <Molde
    :date="{
      title: '标题',
      width: '500',
      fullscreen: false,
      showclose: true,
      draggable: true,
      aligncenter: true,
      footer: true,
    }"
    @confirm="confirm"
    ref="MoldeDom"
  >
    <div>内容</div>
    <!-- 自定义footer底部内容 <div class="flex justify-end">
      <el-button @click="MoldeDom.popupstate(false)">取消</el-button>
      <el-button type="warning"> 确定 </el-button>
    </div> -->
  </Molde>
  <!-- 封装表格 -->
  <el-input v-model="data.order_sn" />
  <el-button @click="searchresult('查询')">查询</el-button>
  <el-button @click="searchresult('重置')">重置</el-button>
  <TableView
    ref="TableDom"
    :date="{
      headerTbale,
      maxHeight: '200',
      border: true,
      api: queryOrderList,
    }"
  >
    <el-table-column fixed label="操作">
      <template #default="{ row }">
        <el-tag
          class="tag-item"
          type="primary"
          @click="console.log(row, 'rowrowrow')"
        >
          修改
        </el-tag>
      </template>
    </el-table-column>
  </TableView>
</template>
