<template>
  <div class="desktop-container helper-container">
    <section>
      <h3 id="桌面端环境">
        <a href="#桌面端环境"> 桌面端环境 </a>
      </h3>
      <p>
        运行在windos系统上，需要安装.NET5 运行时，
        <a href="https://dotnet.microsoft.com/download/dotnet/5.0/runtime">
          点击这里下载 </a
        >根据系统下载。
      </p>
      <p>同时需要redis和rabbitmq服务，提供访问地址即可，可以安装在任意位置。</p>
    </section>
    <section>
      <h3 id="功能讲解">
        <a href="#功能讲解"> 功能讲解 </a>
      </h3>
      <img class="desktop" alt="桌面端图片" src="@/assets/desktop.png" />
      <div class="code fun-list">
        <span class="name">重启：</span>程序重启，模拟器恢复初始状态<br />
        <span class="name">启动设备：</span>根据启动数量启动对应的设备<br />
        <span class="name">绑定设备：</span>绑定当前还未绑定的设备<br />
        <span class="name">设备上线：</span>上线当前还未上线的设备<br />
        <span class="name">全选：</span>选中数据列表中的所有设备<br />
        <span class="name">打开设备：</span
        >打开选中的设备，查看所有端口详情<br />
        <span class="name">投币充电：</span
        >模拟用户投币充电，根据投币数据默认所有通道充电<br />
        <span class="name">停止充电：</span>停止所有充电，并上报充电订单<br />
        <span class="name">定时支付：</span
        >根据端口号，批量支付总数，支付间隔，支付金额进行间隔钱包支付充电<br />
        <span class="name">定时支付取消：</span>取消定时支付<br />
        <span class="name">定时启动：</span
        >根据设置的启动数量和启动间隔进行间隔启动设备<br />
        <span class="name">定时启动取消：</span>取消定时启动<br />
        <span class="name">查看数据：</span
        >查看当前模拟器已经启动的设备数据，显示在下方<br />
        <span class="name">钱包支付：</span>根据端口和支付金额进行钱包支付<br />
        <span class="name">生成图表：</span
        >统计当前模拟器中的各种数据，自动打开浏览器进行图表查看<br />
        <span class="name">定时下线：</span
        >根据系统设定的好的配置，进行定时下线<br />
        <span class="name">定时下线取消：</span>取消定时下线<br />
        <span class="name">保存设置：</span
        >持久化保存当前所有已经同步的设备数据<br />
      </div>
    </section>
    <section>
      <h3 id="配置文件">
        <a href="#配置文件"> 配置文件 </a>
      </h3>
      <p>模拟器桌面端配置文件</p>
      <div class="code">
        <pre class="language-markup">
            <code>
{
  "AppSettings": {
    "RedisSetting": {
      "ConnectionStr": "132.232.34.148:6379,abortConnect=false,password=wagnzhuang.SocketMultiple"
    },
    "RegisterKey": "WanZhuang.Register",
    "RegisterId": "dev",
    "DefaultAesKey": "2be55c82f2126b3a2be9e3b78d58fcba",
    "DefaultDeviceNum": 4294967295,
    //Default Power Electric FastCharge
    //FastCharge Electric Power Default
    //"DeviceTypes": [ "Default", "Power", "Electric", "FastCharge", "TwoWay" ],
    "DeviceTypes": [ "TwoWay" ],
    "ServerAddress": {
      "Ip": "114.55.139.53",
      "Port": 6010
    },
    //"PayChargeUrl": "https://webapi.wanzhuangkj.com/pay/request",
    "PayChargeUrl": "https://webapi.wanzhuang-app.com/pay/request",
    "GetTokenUrl": "https://webapi.wanzhuang-app.com/auth/genUser",
    "Elasticsearch": false,
    "RabbitMQSetting": {
      "ManagerTopicRoute": "ManagerLip#",
      "SystemMsgQueueName": "ManagerLip",
      "ConnectionConfiguration": {
        "UserName": "admin",
        "Password": "wagnzhuang.SocketMultiple",
        "VirtualHost": "wanzhuang",
        "Hosts": [
          {
            "Host": "132.232.34.148",
            "Port": 5672
          }
        ]
      }
    }
  }
}
  </code>
          </pre>
      </div>
    </section>
  </div>
  <helperRightNav v-model:rightNavList="info.rightNavList"></helperRightNav>
</template>
<script lang="ts">
import "@/styles/helper.scss";
import { defineComponent, reactive } from "vue";
import helperRightNav from "@/components/Helper/helperRightNav.vue";
import { useRoute } from "vue-router";
export default defineComponent({
  components: {
    helperRightNav,
  },
  setup() {
    const route = useRoute();
    const info = reactive({
      rightNavList: [
        {
          href: `${route.path}#桌面端环境`,
          text: "桌面端环境",
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
img.desktop {
  height: 400px;
  width: 100%;
  max-width: 800px;
  margin-bottom: 10px;
}
.fun-list {
  color: #5e6d82;
  .name {
    font-weight: bold;
    font-size: 16px;
    color: #000;
  }
}
</style>
