<template>
  <div class="main">
    <iframe :src="route.params.url"></iframe>
  </div>
</template>
<script setup lang='ts'>
import { useRoute, useRouter } from "vue-router";
import { L1 } from "@/constants/routerUrl";

const route = useRoute();
const router = useRouter();

if (!route.params.url) {
  router.push({ path: L1 });
}
// const
console.log(route);
</script>
<style lang="scss" scoped>
iframe {
  width: 100%;
  height: 100%;
  border-width: 0;
}
.main {
  height: 91%;
}
</style>


