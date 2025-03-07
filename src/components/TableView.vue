<script setup>
/**
 * maxHeight  表格最大高度 string
 * border  是否边框表格 boolean
 * headerTbale  表格标题数据
 * apiState   后端需要的默认值
 */
import { reactive, onMounted } from "vue";
import { headerTbale } from "@/store/tableDate";
import zhCn from 'element-plus/es/locale/lang/zh-cn';
let props = defineProps(["date"]); //接收父组件传来的数据
console.log(props.date);
const information = reactive({
  page: 1, //页码
  size: 10, //默认多少条
  total: 0, //总条数
  tableData: [], //表格数据
});
onMounted(() => {
  getList();
});
const getList = (type, state) => {
  //初始化表格数据  //更具项目不同更改不同参数
  if (type == "查询" || type == "重置") {
    information.page = 1;
  }
  const apidate =
    type == "查询"
      ? {
          pageNum: 1,
          pageSize: information.size,
          ...props?.date?.apiState,
          ...state,
        }
      : type == "重置"
      ? {
          pageNum: 1,
          pageSize: 10,
        }
      : {
          pageNum: information.page,
          pageSize: information.size,
          ...props?.date?.apiState,
          ...state,
        };
  props?.date?.api(apidate).then((result) => {
    console.log(result, "rrwrwrwrwrwr");
    if (result.code == 200) {
      information.tableData = result?.data?.rows;
      information.total = result?.data?.total;
    }
  });
};
const handleSizeChange = (value) => {
  //点击切换每页多少条
  console.log(value, "vlsvlsvlslv");
  information.size = value;
  information.page = 1;
};
const handleCurrentChange = (value) => {
  //点击翻页
  console.log(value, "handleCurrentChange");
  information.page = value;
};
defineExpose({
  getList,
});
</script>
<template>
  <el-table
    :border="props?.date?.border"
    :max-height="props?.date?.maxHeight"
    :data="information.tableData"
  >
    <!-- 选择列 -->
    <el-table-column type="selection" />
    <slot></slot>
    <!-- 动态生成列 -->
    <el-table-column
      v-for="column in headerTbale"
      :key="column.prop"
      :prop="column.prop"
      :label="column.label"
      :width="column.width"
      :show-overflow-tooltip="column.showOverflowTooltip"
    >
      <template #default="scope">
        <!-- 如果有 render 函数，使用自定义渲染；否则显示原始值 -->
        {{
          column.render
            ? column.render(scope.row[column.prop])
            : scope.row[column.prop]
        }}
      </template>
    </el-table-column>
  </el-table>
  <el-config-provider :locale="zhCn">
    <el-pagination
      v-model:current-page="information.page"
      v-model:page-size="information.size"
      :page-sizes="[10, 20, 50, 100]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="information.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-config-provider>
</template>
<style>
.el-table__cell {
  text-align: center !important;
}
</style>
