<template>
  <div class="filter-container">
    <el-select
      v-model="info.serverValue"
      placeholder="请选择"
      class="filter-item"
      :size="small"
      popper-class="select-popper"
      @change="cacheTimeData(info)"
    >
      <el-option
        v-for="item in info.serverOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-button
      class="filter-item"
      @click="cacheTimeData(info)"
      type="primary"
      icon="el-icon-refresh"
    >
      刷新
    </el-button>
  </div>
  <div class="stat-container">
    <el-card shadow="hover">
      <el-skeleton :loading="info.dataLoading" animated>
        <template #template>
          <el-skeleton-item />
          <el-skeleton-item />
          <el-skeleton-item />
          <el-skeleton-item />
          <el-skeleton-item />
        </template>
        <template #default>
          <div id="devNumElapsed" class="chart"></div>
          <div id="onlineElapsed" class="chart"></div>
          <div id="syncElapsed" class="chart"></div>
          <div id="playChargeElapsed" class="chart"></div>
          <div id="amPlayChargeElapsed" class="chart"></div>
          <div id="qps" class="chart"></div>
          <div id="sendData" class="chart"></div>
        </template>
      </el-skeleton>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, watch, ref } from "vue";
import { getServerOptions } from "../shortcut/index";
import { cacheTimeData, statisticsInfoType, getTimeData } from "./statistics";

export default defineComponent({
  components: {},
  setup() {
    let info: statisticsInfoType = reactive({
      serverOptions: [],
      serverValue: "",
      dataLoading: true,
      timeData: null,
    });

    //获取模拟器数据
    getServerOptions(info.serverOptions);
    //监听模拟器选项
    watch(info.serverOptions, (n, o) => {
      if (info.serverOptions.length > 0) {
        info.serverValue = info.serverOptions[0].value;
        cacheTimeData(info);
      }
    });
    onMounted(() => {});
    return {
      info,
      cacheTimeData,
      serverChange(val) {
        cacheTimeData(info);
      },
    };
  },
});
</script>
<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 360px;
  border-radius: 20px;
  margin-bottom: 10px;
}
.stat-container {
  .el-skeleton__item {
    height: 30px;
  }
}
</style>