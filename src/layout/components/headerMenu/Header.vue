
<template>
  <div class="header">
    <div class="header_left dis_ac">
      <img
        src="https://cloud.dify.ai/_next/static/media/logo.b3fb6116.png"
        alt=""
      />
    </div>
    <PersonalCenter />
    <!-- <div class="header_right dis_ac">
      <span class="ml_15"> 杨宇豪 </span>
      <img src="@/assets/images/yonghu.png" width="20" height="20" />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { Fold, StarFilled } from "@element-plus/icons";
import PersonalCenter from "./PersonalCenter.vue";
</script>


<style lang="scss" scoped>
.header {
  height: 100%;
  // background-color: $cbg;
  background-color: #fff;
  padding: 10px 20px;
  box-shadow: 3px 3px 3px #dfdfdf;
  display: flex;
  &_left {
    flex: 1;
  }
  &_right {
    width: 200px;

    flex-direction: row-reverse;
  }
}
</style>
