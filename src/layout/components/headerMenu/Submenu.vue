
<template>
  <el-sub-menu :index="menuItems.path">
    <template #title>
      <span>{{ menuItems.meta.title }}</span>
    </template>
    <template v-for="item in menuItems.children" :key="item.path">
      <template v-if="!item.children || item.children.length === 0">
        <router-link :to="item.path" @click="dian(item)">
          <el-menu-item class="subitem" :index="item.path">
            <span>{{ item.meta.title }}</span>
          </el-menu-item>
        </router-link>
      </template>
      <template v-else>
        <subMenuList :route-list="item" :key="item.path"></subMenuList>
      </template>
    </template>
  </el-sub-menu>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { RouteRecordRaw } from "vue-router";

export default defineComponent({
  name: "subMenuList",
  props: {
    routeList: {
      type: Object as PropType<RouteRecordRaw[]>,
      required: true,
    },
  },
  setup(props: any) {
    const menuItems = computed(() => {
      return props.routeList;
    });

    const dian = (e:any)=>{
      console.log('456',e)
    }

    return {
      menuItems,
      dian
    };
  },
});
</script>

<style scoped lang="sass">

</style>
