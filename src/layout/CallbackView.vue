<!-- CallbackView.vue -->
<script setup lang="ts">
import { useHandleSignInCallback } from "@logto/vue";
import router from "@/router";
import { useLogto } from "@logto/vue";
import { userinfo } from "@/store/user"; //路径别名，引入store

const { signIn, isAuthenticated, fetchUserInfo } = useLogto();
const { isLoading } = useHandleSignInCallback(async () => {
  const info = await fetchUserInfo();
  const store = userinfo();
  store.setInfo(info);
  router.push("/");
});
</script>
<!-- 
<template>
  <p></p>
</template>
<style scoped>
p {
  width: 100vh !important;
  height: 100vh !important;
  /* background: #fff !important; */
}
</style> -->
