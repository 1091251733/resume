<!-- RecursiveMenu 组件 -->
<template id="recursive-menu">
  <el-sub-menu v-if="item.children" :index="index">
    <template #title>
      <i class="material-icons cursor-pointer">{{ item.icon }}</i>
      <span>{{ item.label }}</span>
    </template>
    <template v-for="(child, i) in item.children">
      <RecursiveMenu :item="child" :index="child.key" />
    </template>
  </el-sub-menu>
  <el-menu-item v-else :index="index">
    <i class="material-icons cursor-pointer">{{ item.icon }}</i
    >&nbsp;
    <template #title>{{ item.label }}</template>
  </el-menu-item>
</template>
<script setup>
defineProps({
  item: Object,
  index: String,
});
</script>
