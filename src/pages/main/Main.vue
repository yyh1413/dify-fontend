<template>
  <div class="main">
    <!-- <button @click="onClickSignIn">Sign In</button> -->
    <!-- <button @click="onClickSignOut">Sign Out</button> -->

    <el-row :gutter="20">
      <el-col :span="6" v-for="(c, i) in list" :key="i">
        <div class="item">
          <div class="dis_ac mb_10">
            <img class="mr_10" :src="c.icon" alt="" />
            <span class="title">{{ c.title }}</span>
          </div>
          <div class="mb_10 t1">{{ c.content }}</div>
          <div class="dis_ac mb_10 but cup" @click="handleListing(c.url)">
            <img class="mr_10" src="@/assets/images/hf.png" alt="" />chat app
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang='ts'>
import { reactive, ref } from "vue";
import { main } from "@/constants/config";
import { useRouter, useRoute } from "vue-router";
import { LISTING } from "@/constants/routerUrl";
// import { useLogto } from "@logto/vue";
// // console.log(useLogto);

// const { signOut, isAuthenticated, fetchUserInfo, signIn } = useLogto();
// const onClickSignOut = async () => {
//   await signOut();
// };

const route = useRoute();
const router = useRouter();

//@ts-ignore
const list = main[route.path];

function handleListing(url: any) {
  router.push({
    name: LISTING.replace("/", ""),
    params: { url },
  });
}
</script>
<style lang="scss" scoped>
// iframe {
//   width: 100%;
//   height: 100%;
//   border-width: 0;
// }
.main {
  // height: 94%;

  // padding: 20px;
  .title {
    font-size: 16px;
    font-weight: 600;
  }
  .t1 {
    color: #868585;
  }
  .but {
    color: #868585;
    border: 1px solid #868585;
    padding: 3px 5px;
    width: 96px;
    border-radius: 9px;
    box-shadow: 0px 0px 5px rgb(0, 0, 0, 0.1);
  }
  .item {
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0px 0px 2px rgb(0, 0, 0, 0.1);
    background: #fff;
  }
  .item:hover {
    box-shadow: 0px 0px 2px rgb(0, 0, 0, 0.5);
  }
}
</style>


