<!--
 * @description: 
 * @author: YANGYuHao
 * @date: Do not edit
-->
<template>
  <el-dropdown size="medium" @command="dropdownChange">
    <div class="center">
      <span>{{ info.name }}</span>
      <img :src="info.picture ? info.picture : yonghu" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item>更换密码</el-dropdown-item>
        <el-dropdown-item command="退出">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>


<script  lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
// import api from "@/api/login/login";
import { authUtils } from "@/utils";
import { useLogto } from "@logto/vue";
import { userinfo } from "@/store/user"; //路径别名，引入store
import { storeToRefs } from "pinia";
import yonghu from "@/assets/images/yonghu.png";

export default defineComponent({
  setup() {
    const { info } = userinfo();

    const { signOut } = useLogto();
    // console.log(useLogto, signOut);
    // const info = authUtils.getUserInfo();
    //  console.log(info);

    const dropdownChange = (e: any) => {
      if (e === "退出") {
        signOut(import.meta.env.VITE_APP_INDEX + "/logout");
      }
    };
    return { dropdownChange, info, yonghu };
  },
});
</script>


<style lang="scss" scoped>
.center {
  margin-left: 30px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.dropdown_menu {
  transform: scale(1.2);
}
img {
  margin-left: 5px;
  width: 20px;
  height: 20px;
}
</style>
