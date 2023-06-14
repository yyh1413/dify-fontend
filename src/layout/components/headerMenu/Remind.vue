
<template>
  <div class="remind">
    <el-badge :value="12" class="item">
      <img src="@/assets/images/system/small_bell.png" alt="" />
    </el-badge>
  </div>
</template>


<script  lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
export default defineComponent({
  setup(props) {
    return {};
  },
});
</script>


<style lang="scss" scoped>
.remind {
  cursor: pointer;
}
img {
  width: 20px;
  height: 20px;
}
</style>
