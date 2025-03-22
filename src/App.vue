<script setup>
import Afterlogging from "./widgets/Afterlogging.vue";
import LoginRegistration from "./widgets/LoginRegistration.vue";
import { useBeginStore } from "@/store/contextmodel";
import zhCn from "element-plus/es/locale/lang/zh-cn";
</script>
<template>
  <el-config-provider :locale="zhCn">
    <Afterlogging v-if="useBeginStore().token"></Afterlogging>
    <LoginRegistration v-else></LoginRegistration>
  </el-config-provider>
</template>
