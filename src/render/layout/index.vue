<template>
  <el-container>
    <el-aside width="none">
      <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
      <el-menu
        :uniqueOpened="true"
        :default-active="route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :background-color="variab.menuBg"
        :text-color="variab.menuText"
        :active-text-color="variab.menuActiveText"
        :collapse="isCollapse"
        router
      >
        <template v-for="route in routes">
          <template v-if="!route.meta.hidden">
            <el-menu-item
              v-if="route.children.length == 1"
              :index="route.children[0].path"
              :key="route.children[0].path"
            >
              <i class="iconfont" :class="route.children[0].meta.icon"></i>
              <template #title>{{ route.children[0].meta.title }}</template>
            </el-menu-item>

            <el-submenu v-else :index="route.path" :key="route.path">
              <template #title>
                <i class="iconfont" :class="route.meta.icon"></i>
                <span>{{ route.meta.title }}</span>
              </template>
              <el-menu-item
                v-for="cr in route.children"
                :index="route.path + '/' + cr.path"
                :key="cr.path"
              >
                <i class="iconfont" :class="cr.meta.icon"></i>
                <template #title>{{ cr.meta.title }}</template>
              </el-menu-item>
            </el-submenu>
          </template>
        </template>
      </el-menu>
      <!-- </el-scrollbar> -->
    </el-aside>
    <el-container>
      <el-header height="56px">
        <Hamburger
          :isActive="sidebar.opened"
          class="hamburger-container"
          @toggleClick="toggleClick"
        />

        <breadcrumb class="breadcrumb-container" />
      </el-header>
      <el-main>
        <router-view></router-view>
        <RightPanel>
          <Shortcut></Shortcut>
        </RightPanel>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  nextTick,
  onMounted,
  computed,
} from "vue";
import variables from "@/styles/variables.module.scss";
import Hamburger from "@/components/Hamburger/index.vue";
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import { useStore, mapGetters } from "vuex";
import { useRouter, useRoute } from "vue-router";
import RightPanel from "@/components/RightPanel/index.vue";
import Shortcut from "@/views/shortcut/index.vue";
import { SidebarItem, Settings } from "./components";

export default defineComponent({
  name: "Layout",
  components: {
    Hamburger,
    SidebarItem,
    RightPanel,
    Shortcut,
    Breadcrumb,
  },
  computed: {
    ...mapGetters(["sidebar"]),
  },
  setup() {
    let store = useStore();
    let route = useRoute();
    let router = useRouter();
    //const variab = ref(variables);

    const toggleClick = () => {
      store.dispatch("toggleSideBar");
    };

    const isCollapse = computed(() => {
      return store.getters.sidebar.opened;
    });
    const routes = computed(() => {
      return router.options.routes;
    });
    onMounted(() => {});

    return {
      variab: variables,
      toggleClick,
      isCollapse,
      routes,
      route,
    };
  },
});
</script>
<style>
.el-menu-item {
  display: flex;
}
.el-submenu .el-submenu__title {
  display: flex;
  color: red;
}
</style>
<style lang="scss" scoped>
body .el-container {
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.hamburger-container {
  line-height: 46px;
  height: 100%;
  float: left;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}
.el-main {
  background-color: #f0f2f5;
}
.el-menu {
  .iconfont {
    margin-right: 10px;
  }
}
</style>
