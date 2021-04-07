<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from "vue";
import { compile } from "path-to-regexp";
import { useRoute, useRouter } from "vue-router";
import router from "../../router/index";

export default defineComponent({
  setup() {
    let levelList = reactive([]);
    const route = useRoute();
    const router = useRouter();
    watch(route, async (newParams, o) => {
      getBreadcrumb(newParams, levelList);
    });
    // onBeforeRouteLeave(() => {
    //   getBreadcrumb(route, levelList);
    // });
    onMounted(() => {
      getBreadcrumb(route, levelList);
    });

    return {
      levelList,
      handleLink: (item) => {
        handleLink(router, item);
      },
    };
  },
});
function getBreadcrumb(route, levelList: Array<any>) {
  // only show routes with meta.title
  levelList.splice(0, levelList.length);
  let matched = route.matched.filter((item) => item.meta && item.meta.title);
  const first = matched[0];

  if (!isDashboard(first)) {
    matched = [{ path: "/home", meta: { title: "首页" } }].concat(matched);
  }

  const ms = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  );
  ms.forEach((element) => {
    levelList.push(element);
  });
}

function isDashboard(route) {
  const name = route && route.name;
  if (!name) {
    return false;
  }
  return name.trim().toLocaleLowerCase() === "Home".toLocaleLowerCase();
}
function handleLink(router, item) {
  const { redirect, path } = item;
  if (redirect) {
    router.push(redirect);
    return;
  }
  router.push(path);
}
</script>
<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>