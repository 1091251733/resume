<script setup>
import Afterlogging from "./widgets/Afterlogging.vue";
import LoginRegistration from "./widgets/LoginRegistration.vue";
import { useBeginStore } from "@/store/contextmodel";
</script>
<template>
  <Afterlogging v-if="useBeginStore().token"></Afterlogging>
  <LoginRegistration v-else></LoginRegistration>
</template>
