<template>  
  <div style="height: 100%">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-row>
          <el-col :span="12">
            <el-card shadow="hover" :body-style="{ padding: '4px' }">
              <template #header>
                <div class="card-header">
                  <span>
                    <spna class="wsStatedot" :class="info.wsStateClass"></spna>
                    设备数据
                    <time class="time">
                      {{ info.allSourceInfo.updateTime }}
                    </time>
                  </span>
                </div>
              </template>
              <div class="card-content chart-list">
                <SimpleGauge
                  height="100%"
                  width="25%"
                  :id="'clientQueue'"
                  :title="'剩余设备'"
                  v-model:option="info.queueCountOption"
                />
                <SimpleGauge
                  height="100%"
                  width="25%"
                  :title="'启动设备'"
                  :id="'clientStart'"
                  v-model:option="info.startCountOption"
                />
                <SimpleGauge
                  height="100%"
                  width="25%"
                  :title="'绑定设备'"
                  :id="'bindCount'"
                  v-model:option="info.bindCountOption"
                />
                <SimpleGauge
                  height="100%"
                  width="25%"
                  :title="'确认上线'"
                  :id="'afOnlineCount'"
                  v-model:option="info.afOnlineCountOption"
                />
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="hover" :body-style="{ padding: '4px' }">
              <template #header>
                <div class="card-header">
                  <span>
                    <spna class="wsStatedot" :class="info.wsStateClass"></spna>
                    在线数据
                    <time class="time">{{
                      info.allSourceInfo.updateTime
                    }}</time>
                  </span>
                </div>
              </template>
              <div class="card-content chart-list">
                <SimpleGauge
                  height="100%"
                  width="25%"
                  :id="'onlineCount'"
                  :title="'在线设备'"
                  v-model:option="info.onlineCountOption"
                />
                <SimpleGauge
                  height="100%"
                  width="25%"
                  :id="'offlineCount'"
                  :title="'离线设备'"
                  v-model:option="info.offlineCountOption"
                />
                <SimpleGauge
                  height="100%"
                  width="25%"
                  :id="'connectCount'"
                  :title="'链接数量'"
                  v-model:option="info.connectCountOption"
                />
                <SimpleGauge
                  height="100%"
                  width="25%"
                  :id="'settingCount'"
                  :title="'同步数量'"
                  v-model:option="info.settingCountOption"
                />
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-card shadow="hover" :body-style="{ padding: '4px' }">
              <template #header>
                <div class="card-header">
                  <span>
                    <spna class="wsStatedot" :class="info.wsStateClass"></spna>
                    充电数据
                    <time class="time">
                      {{ info.allSourceInfo.updateTime }}
                    </time>
                  </span>
                </div>
              </template>
              <div class="card-content chart-linebar">
                <SimpleLineBar
                  height="100%"
                  width="100%"
                  :id="'chargeDataCount'"
                  :title="'充电设备'"
                  v-model:option="info.chargeDataOption"
                />
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import SimpleGauge from "@/components/Charts/Gauge/simple.vue";
import SimpleLineBar from "@/components/Charts/LineBar/simple.vue";
import { allSourceInfoType, homeInfoType } from "@/models";
import { initChargeDataOption, calcAllSourceInfo } from "./index";
import { HubConnectionState } from "@microsoft/signalr";
import {
  registerGetSourceInfo,
  stateChangeFun,
} from "@/websocket/sourceInfoHub";
import { ElMessage, ElNotification } from "element-plus";

export default defineComponent({
  components: {
    SimpleGauge,
    SimpleLineBar,
  },
  setup() {
    const info = reactive({
      allSourceInfo: {} as allSourceInfoType,
      queueCountOption: {},
      startCountOption: {},
      bindCountOption: {},
      afOnlineCountOption: {},
      connectCountOption: {},
      onlineCountOption: {},
      offlineCountOption: {},
      settingCountOption: {},
      afOrderCountOption: {},
      waitOrderCountOption: {},
      chargeCountOption: {},
      chargeChannelCountOption: {},
      chargeDataOption: null,
      wsStateClass: "connecting",
    } as homeInfoType);

    //初始化充电数据
    initChargeDataOption(info);
    //GetAllSourceInfo(info);

    //状态改变时切换提示
    stateChangeFun.push((state: HubConnectionState) => {
      switch (state) {
        case HubConnectionState.Disconnected:
        case HubConnectionState.Disconnecting:
          info.wsStateClass = "disconnected";
          break;
        case HubConnectionState.Connected:
          info.wsStateClass = "connected";
          break;
        case HubConnectionState.Reconnecting:
        case HubConnectionState.Connecting:
          info.wsStateClass = "connecting";
          break;
        default:
          info.wsStateClass = "disconnected";
          break;
      }
    });

    //注册获取资源信息
    registerGetSourceInfo((data) => {
      info.allSourceInfo = data;
      calcAllSourceInfo(info);
    });
    onMounted(() => {});
    return {
      info,
    };
  },
});
</script>
<style lang="scss" scoped>
.card-content {
  height: 250px;
}
.card-content.chart-linebar {
  height: 400px;
}
.card-content.chart-list {
  display: flex;
  flex-flow: wrap;
}
.el-col {
  margin-bottom: 15px;
}
.card-content-shortcutCol {
  height: calc(100vh - 56px);
}
</style>