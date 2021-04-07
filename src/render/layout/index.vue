<template>
  <el-container>
    <el-aside width="none">
      <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
      <el-menu
        :uniqueOpened="true"
        default-active="2"
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
              <i class="el-icon-menu"></i>
              <template #title>{{ route.children[0].meta.title }}</template>
            </el-menu-item>

            <el-submenu v-else :index="route.path" :key="route.path">
              <template #title>
                <i class="el-icon-menu"></i>
                <span>{{ route.meta.title }}</span>
              </template>
              <el-menu-item
                v-for="cr in route.children"
                :index="route.path + '/' + cr.path"
                :key="cr.path"
              >
                <i class="el-icon-menu"></i>
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
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, nextTick, computed } from "vue";
import variables from "@/style/variables.module.scss";
import Hamburger from "@/components/Hamburger/index.vue";
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import { useStore, mapGetters } from "vuex";
import { useRouter } from "vue-router";
import SidebarItem from "./components/Sidebar/SidebarItem.vue";

export default defineComponent({
  name: "Layout",
  components: {
    Hamburger,
    SidebarItem,
    Breadcrumb,
  },
  computed: {
    ...mapGetters(["sidebar"]),
  },

  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
  },
  setup() {
    let store = useStore();
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

    return {
      variab: variables,
      toggleClick,
      isCollapse,
      routes,
    };
  },
});
</script>
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
</style>
