<template>
  <div class="filter-container">
    <el-select
      v-model="info.serverValue"
      placeholder="请选择"
      class="filter-item"
      :size="small"
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
    <el-input
      v-model="info.deviceListQuery.deviceNum"
      placeholder="设备编号"
      style="width: 200px"
      class="filter-item"
    />
    <el-button class="filter-item" type="primary" icon="el-icon-search">
      搜索
    </el-button>
  </div>
  <el-table
    v-loading="info.tableLoading"
    max-height="700"
    style="width: 100%"
    border
    :data="info.deviceList"
  >
    <el-table-column
      label="设备编号"
      width="120"
      align="center"
      sortable
      prop="deviceNum"
    >
    </el-table-column>
    <el-table-column label="设备类型" width="120" sortable prop="deviceType">
    </el-table-column>
    <el-table-column
      label="是否在线"
      width="100"
      align="center"
      sortable
      prop="isOnline"
    >
    </el-table-column>
    <el-table-column
      label="在线时间"
      width="100"
      align="right"
      sortable
      prop="onlineTime"
    >
    </el-table-column>
    <el-table-column
      label="设置同步"
      width="100"
      align="center"
      sortable
      prop="syncSettings"
    >
    </el-table-column>
    <el-table-column
      label="检查设置时间"
      width="120"
      align="center"
      sortable
      prop="settingsCheckTime"
    >
    </el-table-column>
    <el-table-column
      label="校验设备"
      width="100"
      align="center"
      sortable
      prop="deviceSettings"
    >
    </el-table-column>
    <el-table-column
      label="校验时间"
      width="100"
      align="center"
      sortable
      prop="timeModeSetting"
    >
    </el-table-column>
    <el-table-column
      label="校验电量"
      width="100"
      align="center"
      sortable
      prop="workModeSetting"
    >
    </el-table-column>
    <el-table-column
      label="校验功率"
      width="100"
      align="center"
      sortable
      prop="powerModeSetting"
    >
    </el-table-column>
    <el-table-column label="充电通道" width="150" sortable prop="chargeChannel">
    </el-table-column>
    <el-table-column
      label="首次连接时间"
      width="120"
      align="center"
      sortable
      prop="firstConnectTime"
    >
    </el-table-column>
    <el-table-column
      label="最后连接时间"
      width="120"
      align="center"
      sortable
      prop="lastConnectTime"
    >
    </el-table-column>
    <el-table-column
      label="socket关闭时间"
      width="140"
      align="center"
      sortable
      prop="socketCloseTime"
    >
    </el-table-column>
    <el-table-column
      label="socket关闭原因"
      width="140"
      sortable
      prop="socketCloseMsg"
    >
    </el-table-column>
    <el-table-column label="离线原因" width="200" sortable prop="offlineMsg">
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="{ row }">
        <el-button
          @click.prevent="createQRCode(row.deviceNum)"
          type="text"
          size="small"
        >
          生成二维码
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <vueQR ref="vueQRRef"></vueQR>
</template>

<script lang="ts">
import { deviceListQueryInfoType, clientViewInfoType } from "@/models";
import { defineComponent, onMounted, reactive, watch, ref } from "vue";
import { getServerOptions } from "../shortcut/index";
import { getDeviceList, deviceInfoType } from "./index";
import vueQR from "@/components/QRcode/index.vue";

export default defineComponent({
  components: {
    vueQR,
  },
  setup() {
    const vueQRRef = ref(null);
    let info: deviceInfoType = reactive<deviceInfoType>({
      deviceListQuery: {
        deviceNum: 1,
        serverId: "",
        pageSize: 100,
        pageIndex: 1,
      },
      tableLoading: true,
      deviceList: [],
      serverOptions: [],
      serverValue: "",
    });

    //获取模拟器数据
    getServerOptions(info.serverOptions);
    //监听模拟器选项
    watch(info.serverOptions, (n, o) => {
      if (info.serverOptions.length > 0) {
        info.serverValue = info.serverOptions[0].value;
        info.deviceListQuery.serverId = info.serverValue;
        getDeviceList(info);
      }
    });
    onMounted(() => {});
    return {
      info,
      vueQRRef,
      createQRCode: (devicenNum) => {
        vueQRRef.value.show(
          `http://mini.webapp.wanzhuangkj.com/d/${devicenNum}`,
          devicenNum
        );
      },
    };
  },
});
</script>
<style lang="scss" scoped>
.device-table {
  height: calc(100% - 53px);
}
</style>