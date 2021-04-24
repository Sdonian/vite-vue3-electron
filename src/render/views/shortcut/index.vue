<template>
  <div class="drawer-container">
    <div class="drawer-title">快捷操作</div>
    <div class="drawer-item">
      <el-row>
        <el-select
          v-model="info.serverValue"
          multiple
          placeholder="请选择"
          :size="small"
          clearable
          popper-class="select-popper"
        >
          <el-option
            v-for="item in info.serverOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-row>
      <el-row>
        <StartDevice
          ref="startDeviceRef"
          :serverValue="info.serverValue"
        ></StartDevice>
        <div class="pan-btn tiffany-btn" @click="openStartDevice(false)">
          启动设备
        </div>
        <div class="pan-btn tiffany-btn" @click="openStartDevice(true)">
          定时启动
        </div>
        <div class="pan-btn tiffany-btn" @click="stopStart(info.serverValue)">
          定时启动取消
        </div>
      </el-row>
      <el-row>
        <PayCharge
          ref="payChargeRef"
          :serverValue="info.serverValue"
        ></PayCharge>
        <div class="pan-btn tiffany-btn" @click="openPayCharge(false)">
          钱包支付
        </div>
        <div class="pan-btn tiffany-btn" @click="openPayCharge(true)">
          定时支付
        </div>
        <div
          class="pan-btn tiffany-btn"
          @click="cancelTimePay(info.serverValue)"
        >
          定时支付取消
        </div>
      </el-row>
      <el-row>
        <TimingOffline
          ref="timingOfflineRef"
          :serverValue="info.serverValue"
        ></TimingOffline>
        <div class="pan-btn tiffany-btn" @click="coinCharge">投币充电</div>
        <div class="pan-btn tiffany-btn" @click="openTimingOffline">
          定时下线
        </div>
        <div
          class="pan-btn tiffany-btn"
          @click="cancelTimingOffline(info.serverValue)"
        >
          定时下线取消
        </div>
      </el-row>

      <el-row>
        <div class="pan-btn tiffany-btn" @click="autoRun(info.serverValue)">
          开启自动运行
        </div>
        <div
          class="pan-btn tiffany-btn"
          @click="cancelAutoRun(info.serverValue)"
        >
          取消自动运行
        </div>
        <div
          class="pan-btn tiffany-btn"
          @click="saveSettings(info.serverValue)"
        >
          保存同步设置
        </div>
      </el-row>

      <el-row>
        <div class="pan-btn green-btn" @click="refreshServer">刷新模拟器</div>
        <div class="pan-btn green-btn" @click="deviceBind(info.serverValue)">
          设备绑定
        </div>
        <div class="pan-btn green-btn" @click="deviceOnline(info.serverValue)">
          设备上线
        </div>
      </el-row>
      <el-row>
        <div class="pan-btn red-btn" @click="stopCharge(info.serverValue)">
          停止充电
        </div>
        <div
          class="pan-btn red-btn"
          @click="restartSysServer(info.serverValue)"
        >
          重启服务
        </div>
        <div class="pan-btn red-btn" @click="clearDataLog(info.serverValue)">
          清理数据日志
        </div>
      </el-row>
    </div>
    <div class="drawer-title">
      <spna class="wsStatedot" :class="info.wsStateClass"></spna>
      模拟器消息
    </div>
    <div class="drawer-item">
      <el-card shadow="hover" :body-style="{ padding: '2px' }">
        <div class="server-msgs">
          <el-scrollbar wrap-class="scrollbar-wrapper" ref="scrollbar">
            <div
              class="server-msgs-item"
              v-for="msgInfo in info.msgList"
              :key="msgInfo.createDateTime"
            >
              <span class="time">{{
                moment(msgInfo.createDateTime).format("YYYY-MM-DD HH:mm:ss.SSS")
              }}</span>
              <span class="oper">{{ msgInfo.registerId }}</span>
              <span class="text">{{ msgInfo.msg }}</span>
            </div>
          </el-scrollbar>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick, reactive } from "vue";
import StartDevice from "./startDevice.vue";
import PayCharge from "./payCharge.vue";
import TimingOffline from "./timingOffline.vue";
import { checkServer } from "@/utils";
import { HubConnectionState } from "@microsoft/signalr";
import {
  registerGetServerMsg,
  stateChangeFun,
} from "@/websocket/sourceInfoHub";
import moment from "moment";

import * as funs from "./index";
import { ElMessage } from "element-plus";

export default defineComponent({
  components: {
    StartDevice,
    PayCharge,
    TimingOffline,
  },
  setup(prop, context) {
    const startDeviceRef = ref(null);
    const payChargeRef = ref(null);
    const timingOfflineRef = ref(null);
    const scrollbar = ref(null);
    const info = reactive({
      serverOptions: [],
      serverValue: [],
      msgList: [],
      wsStateClass: "connecting",
    });

    //获取options数据
    funs.getServerOptions(info.serverOptions, info.serverValue);

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
    registerGetServerMsg((data) => {
      if (info.msgList.length > 50) info.msgList = [];
      info.msgList.push(data);
      nextTick(() => {
        //toTop(scrollbar.value.wrap);
        scrollbar.value.wrap.scrollTop = scrollbar.value.resize.offsetHeight;
        //console.log(scrollbar.value.wrap.scrollTop);
        //console.log(scrollbar.value.resize.offsetHeight);
        //moveScrollTop(scrollbar.value);
      });
    });
    onMounted(() => {});
    return {
      info,
      ...funs,
      moment,
      startDeviceRef,
      payChargeRef,
      timingOfflineRef,
      scrollbar,
      openStartDevice: (interval) => {
        if (checkServer(info.serverValue)) {
          startDeviceRef.value.show(interval);
        }
      },
      openPayCharge: (interval) => {
        if (checkServer(info.serverValue)) {
          payChargeRef.value.show(interval);
        }
      },
      refreshServer: () => {
        funs.getServerOptions(info.serverOptions, info.serverValue);
      },
      openTimingOffline: () => {
        if (checkServer(info.serverValue)) {
          timingOfflineRef.value.show();
        }
      },
      coinCharge: () => {
        ElMessage.warning("功能暂未实现");
      },
    };
  },
});

// function moveScrollTop(scrollbar) {
//   const maxTop = scrollbar.resize.offsetHeight;

//   let interval =
//     (scrollbar.resize.offsetHeight - scrollbar.wrap.scrollTop) / 1000;
//   const plusTop = function () {
//     scrollbar.wrap.scrollTop++;
//   };
//   setTimeout(() => {
//     plusTop();
//   }, interval);
// }
</script>
<style>
.select-popper {
  z-index: 99999 !important;
}
</style>

<style lang="scss" scoped>
.pan-btn {
  padding: 12px 0px;
  text-align: center;
  width: 105px;
  margin-right: 10px;
  cursor: pointer;
}
.drawer-container {
  padding: 12px 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
    font-weight: bold;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    // padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }

  .job-link {
    display: block;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
  }
}
.el-row {
  margin-bottom: 20px;
}
.el-row .div {
  width: 110px;
}
.el-select {
  width: calc(100% - 18px);
}
.server-msgs {
  height: 300px;
  .server-msgs-item {
    margin: 5px;
    color: #000;
    font-size: 14px;
    padding: 5px;
    border-left: 3px solid rgb(85, 185, 216);
    span {
      display: inline-block;
    }
    .time {
      color: rgb(66, 65, 65);
    }
    .oper {
      padding-left: 20px;
      font-size: 15px;
      font-weight: bold;
    }
    .text {
      display: block;
      font-size: 16px;
    }
  }
}
</style>
