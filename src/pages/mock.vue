<template>
  <div>
    <el-button>222</el-button>
    <el-date-picker
      type="date"
      placeholder="Pick a day"
    />
    <h3>测试mock</h3>
    <div>{{ info }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import userApi from "@/api/user";
const info = ref<any>([]);
onMounted(() => {
  userApi.getTest().then((res) => {
    console.log("test info:", res);
    info.value = res.data;
  });
});
</script>

<style scoped lang="scss"></style>

