<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import FromDom from "@/components/FromDom.vue";
import { useBeginStore, useBearStore } from "@/store/contextmodel";

const formDomRef = ref(null);
const beginStore = useBeginStore(); //本地存储
const nonLocal = useBearStore(); //非本地存储
const date = reactive({
  seletctDate: [], //选择数据
});
const FromArr = computed(() => [
  //使用计算属性可以保持数据options: date?.seletctDate为响应式数据
  {
    name: "kaiguan",
    label: "开关",
    component: "el-switch",
  },
  {
    name: "timer",
    label: "时间选择",
    component: "el-date-picker",
    rules: [{ required: true, message: "请选择" }], ///验证未通过提示
    placeholder: "请选择内容",
  },
  {
    name: "numInput",
    label: "数字输入框",
    component: "el-input-number",
    rules: [{ required: true, message: "请输入" }], ///验证未通过提示
    placeholder: "请输入内容",
  },
  {
    name: "username",
    label: "输入框",
    component: "el-input", // 传递 element 的组件
    rules: [{ required: true, message: "请输入" }], //是否必填/验证未通过提示
    placeholder: "请输入内容",
    width: "200px", //定义宽度
  },
  {
    name: "password",
    label: "密码",
    component: "el-input",
    props: {
      type: "password",
      "show-password": true,
    },
    rules: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 6, message: "密码至少6位", trigger: "blur" },
    ],
  },
  {
    name: "dateRange",
    label: "日期范围",
    component: "el-date-picker",
    props: {
      type: "daterange",
      "range-separator": "至",
      "start-placeholder": "开始日期",
      "end-placeholder": "结束日期",
      "value-format": "YYYY-MM-DD",
    },
    rules: [
      {
        type: "array",
        required: true,
        message: "请选择日期范围",
        trigger: "change",
      },
    ],
  },
  {
    name: "mysleect", //表单验证后双向绑定的数据字段
    label: "下拉选择",
    component: "el-select", // 传递 element 的组件
    options: date?.seletctDate,
    rules: [{ required: true, message: "请选择" }],
    placeholder: "请输入内容",
  },
  {
    name: "radioType",
    label: "单选",
    component: "el-radio-group",
    rules: [{ required: true, message: "选择" }],
    options: date?.seletctDate,
  },
  {
    name: "checkType",
    label: "多选",
    component: "el-checkbox-group",
    rules: [{ required: true, message: "选择" }],
    options: [
      //下拉选择数据
      {
        value: "选择1",
        label: "选择1",
      },
      {
        value: "选择2",
        label: "选择2",
      },
    ],
  },
]);
onMounted(() => {
  setTimeout(() => {
    //模拟请求表单赋值
    formDomRef?.value?.setFormData({
      kaiguan: true,
      timer: "2025-03-22",
      numInput: 25,
      username: "输入输入",
      password: "123456",
      dateRange: ["2025-01-02", "2025-02-22"],
      mysleect: "Option1",
      radioType: "Option2",
      checkType: ["Option34"], // 多选示例
    });
    date.seletctDate = [
      {
        value: "Option34",
        label: "Option34",
      },
      {
        value: "Option29",
        label: "Option29",
      },
    ];
    console.log(FromArr, "ddddd");
  }, 1000);
});
const submit = (val) => {
  //提交验证成功通过后函数
  console.log(val, "vlavlavla");
};

const resetForm = (val) => {
  //取消与确认函数
  if (val == "取消") {
    formDomRef.value?.resetForm();
  } else {
    formDomRef.value?.handleSubmit();
  }
};
const setStore = () => {
  //改变状态机
  console.log(beginStore, nonLocal);
  nonLocal?.setStrongDom("我被改变了");
  beginStore?.setceshiDate("我被改变了（本地）");
};
</script>
<template>
  <p @click="console.log(FromArr, 'FromArrFromArr')">查看数据</p>
  <el-button @click="setStore">改变状态机</el-button>
  <p>状态机本地存储：{{ beginStore?.ceshiDate }}</p>
  <p>状态机非本地存储：{{ nonLocal?.strongDom }}</p>
  <!-- grid grid-cols-3 -->
  <FromDom
    ref="formDomRef"
    class=""
    :FromArr="FromArr"
    :position="'right'"
    @submit="submit"
  >
    <div class="flex justify-center w-full">
      <el-button @click="resetForm('取消')">清空表单</el-button>
      <el-button type="primary" @click="resetForm">提交</el-button>
    </div>
  </FromDom>
</template>
