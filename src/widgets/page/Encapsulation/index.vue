<script setup>
import { ref, reactive } from "vue";
import TableView from "@/components/TableView.vue";
import { headerTbale } from "@/store/tableDate";
import { queryOrderList } from "@/api/useApi";
import Molde from "@/components/Molde.vue";
import { debounce, throttle } from "@/store/utiles";
import FromDom from "@/components/FromDom.vue";
import { ElMessage, ElMessageBox } from "element-plus";
const formDomRef = ref(null); //查询表单组件
const MoldeDom = ref(null); //弹窗组件
const TableDom = ref(null); //表格DOM
const FromArr = [
  {
    name: "username",
    label: "输入框",
    component: "el-input", // 传递 element 的组件
    class: " mr-[10px] ", //可设置自定义类名
    width: "200px", //定义宽度
    placeholder: "请输入内容",
  },
  {
    name: "mysleect", //表单验证后双向绑定的数据字段
    label: "下拉选择",
    component: "el-select", // 传递 element 的组
    width: "130px", //定义宽度
    class: " mr-[10px] ", //可设置自定义类名
    options: [
      {
        value: "Option34",
        label: "Option34",
      },
      {
        value: "Option29",
        label: "Option29",
      },
    ],
  },
  {
    name: "dateRange",
    label: "日期范围",
    component: "el-date-picker",
    width: "230px", //定义宽度
    class: " mr-[10px] ", //可设置自定义类名
    props: {
      type: "daterange",
      "range-separator": "至",
      "start-placeholder": "开始日期",
      "end-placeholder": "结束日期",
      "value-format": "YYYY-MM-DD",
    },
  },
];
const data = reactive({
  username: "", //查询
});
const openShow = debounce(() => {
  console.log("防抖");
  MoldeDom?.value?.popupstate(true);
}, 500);
const open = throttle(() => {
  console.log("节流");
  ElMessageBox.confirm("是否继续操作?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "okok",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "e'w're'w'r'wewrewrw",
      });
    });
}, 500);

const confirm = () => {
  //弹窗确定函数
  console.log("我被子组件调用了");
};
const searchresult = (type) => {
  // console.log(TableDom.value);
  if (type == "重置") {
    data.username = "";
  }
  TableDom.value.getList(type, data);
};
const batchfun = () => {
  //批量删除查看选中后的数据
  console.log(TableDom.value.selectedRowKeys, "tababa");
};
const submit = (val) => {
  //提交验证成功通过后函数
  console.log({ ...val }, "vlavlavla");
  TableDom.value.getList("查询", { ...val }); //查询表格数据
};
const resetForm = (val) => {
  //取消与确认函数
  if (val == "重置") {
    formDomRef.value?.resetForm();
    TableDom.value.getList("重置", {}); //查询表格数据
  } else {
    formDomRef.value?.handleSubmit();
  }
};
</script>
<template>
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
  <el-button @click="openShow">打开弹窗（防抖）</el-button>
  <el-button @click="open">节流</el-button>
  <!-- 封装表格 -->
  <el-input v-model="data.username" />
  <el-button @click="searchresult('查询')">查询</el-button>
  <el-button @click="searchresult('重置')">重置</el-button>
  <el-button @click="batchfun">批量删除</el-button>
  <FromDom
    ref="formDomRef"
    class="flex items-end flex-wrap"
    :FromArr="FromArr"
    :position="'top'"
    @submit="submit"
  >
    <div class="flex justify-center w-full">
      <el-button @click="resetForm('重置')">重置</el-button>
      <el-button type="primary" @click="resetForm">查询</el-button>
    </div>
  </FromDom>
  <TableView
    ref="TableDom"
    :date="{
      maxHeight: '30vh',
      multiplechoice: '多选', //多选 / 单选
      headerTbale,
      border: true,
      api: queryOrderList,
      apiState: {
        //默认值
        id: '1',
      },
    }"
  >
    <el-table-column fixed label="操作">
      <template #default="{ row }">
        <el-button
          type="success"
          size="small"
          @click="console.log(row, 'rowrowrow')"
        >
          修改
        </el-button>
      </template>
    </el-table-column>
  </TableView>
</template>
