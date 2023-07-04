<template>
  <el-container v-if="isAuthenticated">
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside :width="width" class="main-el-aside">
        <Menu></Menu>
      </el-aside>
      <el-main>
        <router-view :key="$route.fullPath" />
      </el-main>
    </el-container>
  </el-container>
</template>


<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import Menu from "@/layout/components/Menu.vue";
import Header from "@/layout/components/headerMenu/Header.vue";
import { useLogto } from "@logto/vue";

export default defineComponent({
  name: "layout",
  components: { Menu, Header },
  setup() {
    const { signOut, isAuthenticated, fetchUserInfo, signIn } = useLogto();
    const screenWidth = window.innerWidth;
    const width = ref(Number(screenWidth) < 768 ? "80px" : "200px");
    onMounted(() => {
      window.addEventListener("resize", function () {
        const j = window.innerWidth;
        console.log("当前屏幕宽度：" + j);
        if (Number(j) < 768) {
          width.value = "80px";
        } else {
          width.value = "200px";
        }
      });
    });
    if (!isAuthenticated.value) {
      signIn(import.meta.env.VITE_APP_INDEX + "/callback");
    }
    return { isAuthenticated, width };
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