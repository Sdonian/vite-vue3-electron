<template>
  <div class="helper-right-nav">
    <ul>
      <li v-for="(nav, index) in rightNavList" :key="nav.text">
        <a
          :href="nav.href"
          :name="'#' + nav.text"
          :class="index == 0 ? 'active' : ''"
          >{{ nav.text }}</a
        >
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  watch,
  onUnmounted,
  nextTick,
} from "vue";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "helperRightNav",
  props: {
    rightNavList: {
      type: Array,
      default: [],
    },
  },
  setup(props, context) {
    let route = useRoute();
    let router = useRouter();

    //滚动条事件
    const changeHelperHash = (evt: Event) => {
      //加载完成监听滚动条事件
      let headerHeight = document.querySelector(".el-header").clientHeight;
      const sc = evt.target as Element;
      const top = headerHeight + sc.scrollTop;
      let curNav;
      props.rightNavList.forEach((m: any) => {
        if (top >= document.getElementById(`${m.text}`).offsetTop) {
          curNav = m.text;
        }
      });
      if (curNav) router.push(`${route.path}#${curNav}`);
    };

    onMounted(() => {
      let elMain = document.querySelector(".el-main");
      elMain.scrollTop = 0;
      nextTick(() => {
        elMain.addEventListener("scroll", changeHelperHash);
      });
    });
    watch(route, () => {
      //监听路由新
      var routeAList = document.querySelectorAll(`.helper-right-nav a`);
      for (let i = 0; i < routeAList.length; i++) {
        let ele = routeAList[i];
        ele.className = "";
        if (ele.getAttribute("name") == route.hash) ele.className = "active";
      }
    });
    onUnmounted(() => {
      //页面销毁取消滚动条监听
      document
        .querySelector(".el-main")
        .removeEventListener("scroll", changeHelperHash);
    });
    return {};
  },
});
</script>
<style scoped>
</style>
