<template>
  <div v-if="!item.meta.hidden">
    <el-submenu
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template v-slot:="title">
        <!-- <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        /> -->
        <i class="el-icon-menu" />
        <span>{{ item.meta.title }}</span>
      </template>
    </el-submenu>
  </div>
</template>
<script lang="ts">
//import path from "path";
//import { resolve } from "path";
import { defineComponent } from "vue";
import { isExternal } from "@/utils/validate";

export default defineComponent({
  name: "SidebarItem",
  components: {},
  props: {
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: "",
    },
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
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return `${this.basePath}${routePath}`;
    },
  },
  setup(prop) {},
});
</script>
