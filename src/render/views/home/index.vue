<template>
  <div style="height: 100%">
    <el-row :gutter="15">
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>设备数据</span>
            </div>
          </template>
          <div class="card-content chart-list">
            <Gauge
              height="50%"
              width="50%"
              :id="'clientQueue'"
              :title="'剩余设备'"
              v-model:option="info.queueCountOption"
            />
            <Gauge
              height="50%"
              width="50%"
              :title="'启动设备'"
              :id="'clientStart'"
              v-model:option="info.startCountOption"
            />
            <Gauge
              height="50%"
              width="50%"
              :title="'绑定设备'"
              :id="'bindCount'"
              v-model:option="info.bindCountOption"
            />
            <Gauge
              height="50%"
              width="50%"
              :title="'确认上线'"
              :id="'afOnlineCount'"
              v-model:option="info.afOnlineCountOption"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>在线数据</span>
            </div>
          </template>
          <div class="card-content chart-list">
            <Gauge
              height="50%"
              width="50%"
              :id="'onlineCount'"
              :title="'在线设备'"
              v-model:option="info.onlineCountOption"
            />
            <Gauge
              height="50%"
              width="50%"
              :id="'offlineCount'"
              :title="'离线设备'"
              v-model:option="info.offlineCountOption"
            />
            <Gauge
              height="50%"
              width="50%"
              :id="'connectCount'"
              :title="'链接数量'"
              v-model:option="info.connectCountOption"
            />
            <Gauge
              height="50%"
              width="50%"
              :id="'settingCount'"
              :title="'同步数量'"
              v-model:option="info.settingCountOption"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>充电数据</span>
            </div>
          </template>
          <div class="card-content"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import Gauge from "@/components/Charts/Gauge/simple.vue";
import api from "@/api";
import { ElMessage } from "element-plus";
import AllSourceInfo from "@/models/AllSourceInfo";

export default defineComponent({
  components: {
    Gauge,
  },
  setup() {
    const info = reactive({
      allSourceInfo: {} as AllSourceInfo,
      queueCountOption: {},
      startCountOption: {},
      bindCountOption: {},
      afOnlineCountOption: {},
      connectCountOption: {},
      onlineCountOption: {},
      offlineCountOption: {},
      settingCountOption: {},
    });
    onMounted(() => {
      //GetAllSourceInfo(info);
      setInterval(() => {
        GetAllSourceInfo(info);
      }, 1000);
    });
    return {
      info,
    };
  },
});

function GetAllSourceInfo(info) {
  api.sourceInfo.GetAllSourceInfo().then(
    (data) => {
      info.allSourceInfo = { ...data.data };
      CalcAllSourceInfo(info);
    },
    (error) => {
      console.log(error);
      ElMessage.error(error);
    }
  );
}
function CalcAllSourceInfo(info) {
  let allInfo = info.allSourceInfo as AllSourceInfo;
  info.queueCountOption = {
    series: [{ max: 5000, data: [{ value: allInfo.clientQueue }] }],
  };
  info.connectCountOption = {
    series: [{ max: 5000, data: [{ value: allInfo.connectCount }] }],
  };
  info.startCountOption = {
    series: [{ max: 5000, data: [{ value: allInfo.startCount }] }],
  };
  info.afOnlineCountOption = {
    series: [{ max: 5000, data: [{ value: allInfo.affirmOnlineCount }] }],
  };
  info.bindCountOption = {
    series: [{ max: 5000, data: [{ value: allInfo.bindCount }] }],
  };
  info.onilineCountOption = {
    series: [{ max: 5000, data: [{ value: allInfo.onlineCount }] }],
  };
  info.offlineCountOption = {
    series: [{ max: 5000, data: [{ value: allInfo.offlineCount }] }],
  };
  info.settingCountOption = {
    series: [{ max: 5000, data: [{ value: allInfo.setingCount }] }],
  };
}
</script>
<style lang="scss" scoped>
.card-content {
  height: 500px;
}
.card-content.chart-list {
  display: flex;
  flex-flow: wrap;
}
.el-col {
  margin-bottom: 15px;
}
</style>