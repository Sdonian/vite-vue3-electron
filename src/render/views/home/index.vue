<template>
  <div style="height: 100%">
    <el-row :gutter="15">
      <el-col :span="8">
        <el-card shadow="hover" :body-style="{ padding: '4px' }">
          <template #header>
            <div class="card-header">
              <span>设备数据</span>
            </div>
          </template>
          <div class="card-content chart-list">
            <SimpleGauge
              height="50%"
              width="50%"
              :id="'clientQueue'"
              :title="'剩余设备'"
              v-model:option="info.queueCountOption"
            />
            <SimpleGauge
              height="50%"
              width="50%"
              :title="'启动设备'"
              :id="'clientStart'"
              v-model:option="info.startCountOption"
            />
            <SimpleGauge
              height="50%"
              width="50%"
              :title="'绑定设备'"
              :id="'bindCount'"
              v-model:option="info.bindCountOption"
            />
            <SimpleGauge
              height="50%"
              width="50%"
              :title="'确认上线'"
              :id="'afOnlineCount'"
              v-model:option="info.afOnlineCountOption"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" :body-style="{ padding: '4px' }">
          <template #header>
            <div class="card-header">
              <span>在线数据</span>
            </div>
          </template>
          <div class="card-content chart-list">
            <SimpleGauge
              height="50%"
              width="50%"
              :id="'onlineCount'"
              :title="'在线设备'"
              v-model:option="info.onlineCountOption"
            />
            <SimpleGauge
              height="50%"
              width="50%"
              :id="'offlineCount'"
              :title="'离线设备'"
              v-model:option="info.offlineCountOption"
            />
            <SimpleGauge
              height="50%"
              width="50%"
              :id="'connectCount'"
              :title="'链接数量'"
              v-model:option="info.connectCountOption"
            />
            <SimpleGauge
              height="50%"
              width="50%"
              :id="'settingCount'"
              :title="'同步数量'"
              v-model:option="info.settingCountOption"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" :body-style="{ padding: '4px' }">
          <template #header>
            <div class="card-header">
              <span>充电数据</span>
            </div>
          </template>
          <div class="card-content chart-list">
            <SimpleLineBar
              height="100%"
              width="100%"
              :id="'chargeDataCount'"
              :title="'充电设备'"
              v-model:option="info.chargeDataOption"
            />
            <!-- <SimpleGauge
              height="50%"
              width="50%"
              :id="'chargeCount'"
              :title="'充电设备'"
              v-model:option="info.chargeCountOption"
            />
            <SimpleGauge
              height="50%"
              width="50%"
              :id="'chargeChannelCount'"
              :title="'充电端口'"
              v-model:option="info.chargeChannelCountOption"
            />
            <SimpleGauge
              height="50%"
              width="50%"
              :id="'waitOrderCount'"
              :title="'待发送订单'"
              v-model:option="info.waitOrderCountOption"
            />
            <SimpleGauge
              height="50%"
              width="50%"
              :id="'afOrderCount'"
              :title="'待确认订单'"
              v-model:option="info.afOrderCountOption"
            /> -->
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import SimpleGauge from "@/components/Charts/Gauge/simple.vue";
import SimpleLineBar from "@/components/Charts/LineBar/simple.vue";
import api from "@/api";
import { ElMessage } from "element-plus";
import { allSourceInfoType, homeInfoType } from "@/models";
import { debounce } from "@/utils";

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
    } as homeInfoType);
    GetAllSourceInfo(info);
    onMounted(() => {
      const gas = debounce(() => {
        GetAllSourceInfo(info);
      }, 1000);
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
function CalcAllSourceInfo(info: homeInfoType) {
  let allInfo = info.allSourceInfo;
  // if (!allInfo.maxQueue) {
  //   allInfo.maxQueue = 0;
  // }
  //设备数据
  info.queueCountOption = {
    series: [{ max: allInfo.maxQueue, data: [{ value: allInfo.clientQueue }] }],
  };
  info.startCountOption = {
    series: [{ max: allInfo.maxQueue, data: [{ value: allInfo.startCount }] }],
  };
  info.bindCountOption = {
    series: [{ max: allInfo.startCount, data: [{ value: allInfo.bindCount }] }],
  };
  info.afOnlineCountOption = {
    series: [
      { max: allInfo.startCount, data: [{ value: allInfo.affirmOnlineCount }] },
    ],
  };
  //在线数据
  info.onlineCountOption = {
    series: [
      { max: allInfo.startCount, data: [{ value: allInfo.onlineCount }] },
    ],
  };
  info.offlineCountOption = {
    series: [
      { max: allInfo.startCount, data: [{ value: allInfo.offlineCount }] },
    ],
  };
  info.connectCountOption = {
    series: [
      { max: allInfo.startCount, data: [{ value: allInfo.connectCount }] },
    ],
  };
  info.settingCountOption = {
    series: [
      { max: allInfo.startCount, data: [{ value: allInfo.setingCount }] },
    ],
  };

  //充电数据
  if (!info.chargeDataOption) {
    info.chargeDataOption = {
      xAxis: [
        {
          type: "category",
          boundaryGap: true,
          data: (function () {
            var now = new Date();
            var res = [];
            var len = 10;
            while (len--) {
              res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
              now = new Date(now.valueOf() - 2000);
            }
            return res;
          })(),
        },
      ],
      legend: {
        data: ["充电设备", "充电通道", "待发送订单", "待确认订单"],
      },
      series: [
        {
          name: "充电设备",
          type: "line",
          data: (function () {
            var res = [];
            var len = 0;
            while (len < 10) {
              // res.push((Math.random() * 10 + 5).toFixed(1));
              res.push(0);
              len++;
            }
            return res;
          })(),
        },
        {
          name: "充电通道",
          type: "line",
          data: (function () {
            var res = [];
            var len = 0;
            while (len < 10) {
              // res.push((Math.random() * 10 + 5).toFixed(1));
              res.push(0);
              len++;
            }
            return res;
          })(),
        },
        {
          name: "待发送订单",
          type: "line",
          data: (function () {
            var res = [];
            var len = 0;
            while (len < 10) {
              // res.push((Math.random() * 10 + 5).toFixed(1));
              res.push(0);
              len++;
            }
            return res;
          })(),
        },
        {
          name: "待确认订单",
          type: "line",
          // smooth: true,
          data: (function () {
            var res = [];
            var len = 0;
            while (len < 10) {
              // res.push((Math.random() * 10 + 5).toFixed(1));
              res.push(0);
              len++;
            }
            return res;
          })(),
        },
      ],
    };
  }
  var axisData = new Date().toLocaleTimeString().replace(/^\D*/, "");
  var data0 = info.chargeDataOption.series[0].data;
  var data1 = info.chargeDataOption.series[1].data;
  data0.shift();
  data0.push(Math.round(Math.random() * 1000));
  data1.shift();
  data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

  option.xAxis[0].data.shift();
  option.xAxis[0].data.push(axisData);

  // info.chargeCountOption = {
  //   series: [
  //     { max: allInfo.startCount, data: [{ value: allInfo.setingCount }] },
  //   ],
  // };
  // info.chargeChannelCountOption = {
  //   series: [
  //     { max: allInfo.channelCount, data: [{ value: allInfo.setingCount }] },
  //   ],
  // };
  // info.waitOrderCountOption = {
  //   series: [
  //     { max: allInfo.channelCount, data: [{ value: allInfo.setingCount }] },
  //   ],
  // };
  // info.afOrderCountOption = {
  //   series: [
  //     { max: allInfo.channelCount, data: [{ value: allInfo.setingCount }] },
  //   ],
  // };
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