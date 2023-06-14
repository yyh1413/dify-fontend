<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="200px" class="main-el-aside">
        <Menu></Menu>
      </el-aside>
      <el-main>
        <router-view :key="$route.fullPath" />
      </el-main>
    </el-container>
  </el-container>
</template>


<script lang="ts">
import { computed, defineComponent } from "vue";
import Menu from "@/layout/components/Menu.vue";
import Header from "@/layout/components/headerMenu/Header.vue";
import { useLogto } from "@logto/vue";

export default defineComponent({
  name: "layout",
  components: { Menu, Header },
  setup() {
    const { signOut, isAuthenticated, fetchUserInfo, signIn } = useLogto();
    if (!isAuthenticated.value) {
      signIn("http://127.0.0.1:5173/callback");
    }
  },
});
</script>

<style lang="scss" scoped>
.el-main {
  height: 100vh;
}
.el-header {
  padding: 0;
  border-bottom: 1px solid #dcdfe6;
  // height: 70px;
}
.main-el-aside {
  padding: 20px 20px 20px 5px;
  border-right: 1px solid #dcdfe6;
}
</style>