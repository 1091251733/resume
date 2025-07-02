<script setup>
/**
 * maxHeight       表格最大高度 string
 * border          是否边框表格 boolean
 * headerTbale     表格标题数据
 * multiplechoice  表格多选与单选配置
 * apiState        后端需要的默认值
 * dataList:[]     直接传递表格内容(如果传递了apiState就不用传递)
 *
 */
import { reactive, onMounted, ref } from "vue";
import { useWindowWidth } from "@/store/utiles";
import zhCn from "element-plus/es/locale/lang/zh-cn";
let props = defineProps(["date"]); //接收父组件传来的数据
const windowWidth = useWindowWidth(); //监听页面宽度
const selectedRowKeys = ref(null); //多选或单选选中后
const information = reactive({
  loadingtype: false,
  page: 1, //页码
  size: 10, //默认多少条
  total: 0, //总条数
  tableData: [], //表格数据
  demandDate: {}, //查询数据
});
onMounted(() => {
  getList();
});
const getList = (type, state) => {
  //初始化表格数据  //更具项目不同更改不同参数
  if (type == "重置") {
    information.page = 1;
    information.demandDate = {};
  } else if (type == "查询") {
    information.page = 1;
    information.demandDate = { ...state };
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
          ...props?.date?.apiState,
        }
      : {
          pageNum: information.page,
          pageSize: information.size,
          ...props?.date?.apiState,
          ...information.demandDate,
        };
  information.loadingtype = true;
  if (props?.date?.api) {
    props?.date?.api(apidate).then((result) => {
      information.loadingtype = false;
      if (result.code == 200) {
        information.tableData = result?.data?.rows;
        information.total = result?.data?.total;
      }
    });
  } else {
    information.tableData = props?.date?.dataList;
    information.loadingtype = false;
  }
};
const handleSizeChange = (value) => {
  //点击切换每页多少条
  //   console.log(value, "vlsvlsvlslv");
  getList();
  information.size = value;
  information.page = 1;
};
const handleCurrentChange = (value) => {
  //点击翻页
  //console.log(value, "handleCurrentChange");
  getList();
  information.page = value;
};
const handleSelectionChange = (value) => {
  //   console.log(value, "vlvalvlalval", props?.date?.multiplechoice);
  if (props?.date?.multiplechoice) {
    selectedRowKeys.value = { ...value };
  }
};
defineExpose({
  getList,
  selectedRowKeys,
});
</script>
<template>
  <el-table
    @selection-change="handleSelectionChange"
    @current-change="handleSelectionChange"
    v-loading="information.loadingtype"
    element-loading-text="拼命加载中..."
    :border="props?.date?.border"
    :max-height="props?.date?.maxHeight ? props?.date?.maxHeight : '65vh'"
    :data="information.tableData"
    :highlight-current-row="
      props?.date?.multiplechoice == '单选' ? true : false
    "
  >
    <!-- 选择列 -->
    <el-table-column
      v-if="props?.date?.multiplechoice == '多选'"
      type="selection"
    />
    <slot></slot>
    <!-- 动态生成列 -->
    <el-table-column
      v-for="column in props?.date?.headerTbale"
      :key="column.prop"
      :prop="column.prop"
      :label="column.label"
      :width="column.width"
      :min-width="column.minWidth"
      :show-overflow-tooltip="column.showOverflowTooltip"
    >
      <template #default="scope">
        <!-- 如果有 render 函数，使用自定义渲染；否则显示原始值 -->
        <el-tag
          v-if="column.render && column?.render(scope.row[column.prop])?.isTag"
          :type="column.render(scope.row[column.prop]).type"
        >
          {{ column.render(scope.row[column.prop]).content }}
        </el-tag>
        <span v-else>{{
          column.render
            ? column.render(scope.row[column.prop])
            : scope.row[column.prop]
        }}</span>
      </template>
    </el-table-column>
  </el-table>
  <el-config-provider v-if="props?.date?.api" :locale="zhCn">
    <div class="flex justify-center mt-[30px]">
      <el-pagination
        v-model:current-page="information.page"
        v-model:page-size="information.size"
        :page-sizes="[10, 20, 50, 100]"
        :background="windowWidth < 600 ? false : true"
        :layout="
          windowWidth > 1000
            ? 'total, sizes, prev, pager, next, jumper'
            : '  prev, pager, next'
        "
        :total="information.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-config-provider>
</template>
<style>
.el-table__cell {
  text-align: center !important;
}
</style>
