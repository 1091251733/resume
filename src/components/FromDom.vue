<template>
  <el-form ref="formRef" :model="formData" :label-position="props?.position">
    <el-form-item
      :label="field.label"
      :prop="field.name"
      :rules="field.rules"
      v-for="(field, index) in props.FromArr"
      :key="index"
    >
      <component
        :is="field.component"
        v-model="formData[field.name]"
        v-bind="field.props || {}"
        :placeholder="field.placeholder"
        :style="{ width: field.width || '100%' }"
      >
        <template v-if="field.component == 'el-select'">
          <el-option
            v-for="option in field.options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </template>
        <!-- 单选组 -->
        <template v-if="field.component == 'el-radio-group'">
          <!-- :value="option.value" -->
          <el-radio
            v-for="option in field.options"
            :key="option.value"
            :value="option.label"
          >
            {{ option.label }}
          </el-radio>
        </template>
        <!-- 多选组 -->
        <template v-if="field.component === 'el-checkbox-group'">
          <el-checkbox
            v-for="option in field.options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </el-checkbox>
        </template>
      </component>
    </el-form-item>
    <!-- 底部确认与取消 -->
    <el-form-item>
      <slot />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from "vue";
import { debounce } from "@/store/utiles";
// 定义 props
const props = defineProps(["FromArr", "position"]);
const emit = defineEmits(["submit", "reset"]);
// 响应式数据
const formData = ref({});
const formRef = ref(null);

const handleSubmit = debounce(() => {
  //验证表单
  formRef.value.validate((valid) => {
    if (valid) {
      emit("submit", formData.value);
    }
  });
}, 500);
// 清空表单
const resetForm = () => {
  formRef.value.resetFields();
  emit("reset");
};
// 新增：设置表单值
const setFormData = (data) => {
  Object.assign(formData.value, data);
};

// 暴露方法
defineExpose({
  handleSubmit,
  resetForm,
  setFormData,
  formData,
});
</script>

<style>
.el-form-item__label {
  min-width: 96px;
}
</style>
