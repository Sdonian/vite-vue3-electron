<template>
  <div class="editor-container">
    <el-tabs v-model="info.activeName" @tab-click="handleClick">
      <el-tab-pane label="生成设备数据" name="newDeviceData">
        <CreateClient></CreateClient>
      </el-tab-pane>
      <el-tab-pane label="已生成文件" name="clientFileList">
        <ClientFileList></ClientFileList>
      </el-tab-pane>
      <el-tab-pane label="设备绑定运营商" name="deviceBind">
        <BindAgent></BindAgent>
      </el-tab-pane>
      <el-tab-pane label="生成模拟器配置文件" name="iemiChipId">
        <CreateConfig></CreateConfig>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, onUnmounted, computed } from "vue";
import { newDataInfoType } from "./newData";
import { useStore } from "vuex";
import CreateClient from "./createClient.vue";
import ClientFileList from "./clientFileList.vue";
import BindAgent from "./bindAgent.vue";
import CreateConfig from "./createConfig.vue";

export default defineComponent({
  components: {
    CreateClient,
    ClientFileList,
    BindAgent,
    CreateConfig,
  },
  setup() {
    let store = useStore();

    let info: newDataInfoType = reactive<newDataInfoType>({
      activeName: "newDeviceData",
    });

    return {
      info,
    };
  },
});
</script>
<style>
.submit-btns {
  text-align: center;
  padding-top: 10px;
}
</style>
<style lang="scss" scoped>
.editor-container {
  position: relative;
  height: 100%;
  width: 50%;
  min-width: 600px;
  margin: 0px auto;
}
.el-skeleton__item {
  height: 30px;
  margin-bottom: 18px;
}
.el-input-number {
  width: 200px;
  input {
    text-align: right;
  }
}
.oper-cell-container {
  display: flex;
  justify-content: center;
  .oper-el {
    margin-right: 10px;
  }
}
</style>