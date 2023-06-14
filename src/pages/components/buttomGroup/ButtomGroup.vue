<template>
  <div @click="handleClick">
    <el-button type="primary" class="mb-4" data-state="search">查询</el-button>
    <el-button type="primary" class="mb-4" data-state="add" v-if="!hideAdd"
      >新建</el-button
    >
    <el-button data-state="reset">重置</el-button>
  </div>
</template>

<script setup lang="ts">
const { hideAdd } = defineProps({ hideAdd: Boolean });
import { ref } from "vue";
import { onMounted } from "vue";
const emit = defineEmits(["handleClickEmit"]);
const handleClick = ({ target }) => {
  while (target && target.parentNode.tagName !== "DIV") {
    target = target.parentNode;
  }
  if (target.tagName === "BUTTON" && target.parentNode.tagName === "DIV") {
    const state: string = target.getAttribute("data-state");
    emit("handleClickEmit", state);
  }
};
</script>

<style scoped></style>

