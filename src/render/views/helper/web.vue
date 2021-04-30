<template>
  <div class="helper-container">
    <section id="web端环境">
      <h3>
        <a href="#web端环境"> web端环境 </a>
      </h3>
      <p>
        安装.NET5 ASP.NET Core Runtime
        <a href="https://hub.docker.com/_/microsoft-dotnet-aspnet/"
          >ASP.NET Core Runtime hub文档</a
        >
      </p>
      <div class="code">docker pull mcr.microsoft.com/dotnet/aspnet</div>
      <p>
        安装rabbitmq和redis docker，其中rabbitmq安装带监视器的版本
        <a
          target="_blank"
          href="https://hub.docker.com/_/rabbitmq?tab=description&page=1&ordering=last_updated"
        >
          rabbitmq docker hub文档
        </a>
      </p>
      <div class="code">docker pull redis</div>
      <div class="code">docker pull rabbitmq:management</div>
    </section>
    <section id="功能讲解">
      <h3>
        <a href="#功能讲解"> 功能讲解 </a>
      </h3>
      <div class="code menu-list">
        <span class="menuName">首页：</span>聚合数据展示<br />
        <span class="menuName">数据信息：</span><br />
        <span class="menuName sub">设备信息：</span
        >查看指定模拟器已启动的设备数据<br />
        <span class="menuName sub">统计信息：</span>查看指定模拟器统计数据<br />
        <span class="menuName sub">数据管理：</span
        >生成模拟器基础数据，和绑定到供应商平台的分组下<br />
      </div>
    </section>
    <section id="配置文件">
      <h3>
        <a href="#配置文件"> 配置文件 </a>
      </h3>
    </section>
  </div>
  <helperRightNav v-model:rightNavList="info.rightNavList"></helperRightNav>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRoute } from "vue-router";
import helperRightNav from "@/components/Helper/helperRightNav.vue";

export default defineComponent({
  components: {
    helperRightNav,
  },
  setup() {
    const route = useRoute();
    const info = reactive({
      rightNavList: [
        {
          href: `${route.path}#web端环境`,
          text: "web端环境",
        },
        {
          href: `${route.path}#功能讲解`,
          text: "功能讲解",
        },
        {
          href: `${route.path}#配置文件`,
          text: "配置文件",
        },
      ],
    });
    return {
      info,
    };
  },
});
</script>
<style lang="scss" scoped>
.menu-list {
  color: #5e6d82;
  .menuName {
    font-weight: bold;
    font-size: 16px;
    color: #000;
  }
  .menuName.sub {
    font-size: 14px;
    display: inline-block;
    padding-left: 20px;
  }
}
</style>