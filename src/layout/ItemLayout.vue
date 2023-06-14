
<template>
  <router-view #default="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script  lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ItemLayout",
});
</script>

