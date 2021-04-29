<template>
  <h2>服务器环境安装</h2>
  <p>
    住服务基于docker环境，<a
      class="el-link el-link--primary"
      href="https://www.cnblogs.com/yufeng218/p/8370670.html"
      >docker安装点击这里</a
    >，第三方中间件只要能访问都可以。
  </p>
  <h3>模拟器主程序</h3>
  <p>
    安装.NET5 Runtime
    <a
      class="el-link el-link--primary"
      href="https://hub.docker.com/_/microsoft-dotnet-runtime/"
      >.NET5 Runtime docker hub文档</a
    >
  </p>
  <div class="code">docker pull mcr.microsoft.com/dotnet/runtime:5.0</div>
  <p>
    rabbitmq和redis docker安装，或者其他安装都可。<br/>
    其中rabbitmq安装带监视器的版本
    <a
      class="el-link el-link--primary"
      href="https://hub.docker.com/_/rabbitmq?tab=description&page=1&ordering=last_updated"
      >rabbitmq docker hub文档</a
    >
  </p>
  <div class="code">docker pull redis</div>
  <div class="code">docker pull rabbitmq:management</div>
  
</template>
<script lang="ts">
import { defineComponent } from "vue";
import locale from "element-plus/lib/locale/lang/zh-cn";

export default defineComponent({
  setup() {},
});
</script>
<style lang="scss" scoped>
.code {
  line-height: 1.8;
  font-family: Menlo, Monaco, Consolas, Courier, monospace;
  font-size: 14px;
  padding: 18px 24px;
  background-color: #fafafa;
  border: 1px solid #eaeefb;
  margin-bottom: 25px;
  border-radius: 4px;
  -webkit-font-smoothing: auto;
  color: #000;
  display: block;
  overflow-x: auto;
  background: #fff;
}
</style>
