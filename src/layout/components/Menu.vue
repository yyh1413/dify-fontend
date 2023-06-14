
<template>
  <div class="head">
    <!-- 路由 -->
    <div class="head_center">
      <el-menu
        :default-active="route.path"
        class="el-menu-demo"
        background-color="#3C3D5D"
        text-color="#fff"
        active-text-color="#fff"
        router
        :ellipsis="false"
      >
        <template v-for="item in routes" :key="item.path">
          <router-link
            :to="item.path"
            v-if="!item.children || item.children.length === 0"
            class="per_router"
          >
            <el-menu-item :index="item.path.toString()">
              <!-- <el-icon v-if="!!getIcon(item.meta.icon)">
                <component :is="getIcon(item.meta.icon)" />
              </el-icon> -->
              <img
                :style="{ width: '25px' }"
                class="mr_10"
                :src="getIcon(item.path)"
                alt=""
              />
              <template #title>{{ item.meta.title }}</template>
            </el-menu-item>
          </router-link>
          <SubMenuList v-else :route-list="item" :key="item.path"></SubMenuList>
        </template>
      </el-menu>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRouter, useRoute, RouteRecordRaw } from "vue-router";
import SubMenuList from "./headerMenu/Submenu.vue";
import PersonalCenter from "./headerMenu/PersonalCenter.vue";
import Remind from "./headerMenu/Remind.vue";
import { routes as subRouteList } from "@/router";
import { getIcon } from "./common";

export default defineComponent({
  components: {
    SubMenuList,
    Remind,
    PersonalCenter,
  },
  props: {
    collapse: {
      type: String,
    },
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const routes = computed(() => {
      let roterArr: Array<RouteRecordRaw> = subRouteList;

      roterArr =
        roterArr.find((item) => item.name === "layout")?.children || [];

      const result: Array<RouteRecordRaw> = [];

      roterArr.forEach((item: any) => {
        if (!item.meta.hide) {
          result.push(item);
        }
      });
      return result;
    });

    //
    const dian = (e: any) => {
      console.log("123", e);
    };
    return {
      routes,
      route,
      dian,
      getIcon,
    };
  },
});
</script>


<style lang="scss" scoped>
.el-menu {
  // background-color: $cbg;
  --el-menu-bg-color: $cbg !important;
  --el-menu-hover-bg-color: none !important;
  border-right: 0 !important;
}
.el-menu :hover {
}
.el-menu-item {
  color: rgb(67, 66, 66);
  height: 40px;
}
.is-active,
.el-menu :hover {
  background: #fff;
  padding: 10px;
  border-radius: 15px;
  color: #476cec !important;
}
</style>
