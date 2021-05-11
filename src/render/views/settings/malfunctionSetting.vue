<template>
  <el-row :gutter="20">
    <el-col :span="6" v-for="malf in info.malfList" :key="malf.value">
      <el-card shadow="hover">
        <template #header>
          <div class="card-header">
            <span>{{ malf.name }}</span>
            <div>
              <el-button
                class="button"
                @click="operBtnClick(malf.serversList)"
                type="text"
                >{{ malf.operBtnText }}</el-button
              >
              <el-button
                class="button"
                @click="operBtnClick(malf.serversList)"
                type="text"
                >保存</el-button
              >
            </div>
          </div>
        </template>
        <el-scrollbar wrap-class="scrollbar-wrapper" ref="scrollbar">
          <div class="malf-container">
            <el-space wrap size="large">
              <el-check-tag
                v-for="servers in malf.serversList"
                :key="servers.servers"
                :checked="servers.checked"
                @change="malfChange(servers, malf.value)"
                >{{ servers.servers }}</el-check-tag
              >
            </el-space>
          </div>
        </el-scrollbar>
      </el-card>
    </el-col>
  </el-row>
  <DelayReply ref="delayReply"></DelayReply>
</template>
<script lang="ts">
import { checkServer } from "@/utils";
import { defineComponent, reactive, watch, computed, ref } from "vue";
import { getServerList } from "./malfunctionSetting";
import DelayReply from "./malfunction/malfDelayReply.vue";
import { MalfunctionTypeEnum } from "@/enums/MalfunctionTypeEnum";
export default defineComponent({
  components: {
    DelayReply,
  },
  setup() {
    const delayReply = ref(null);
    const info = reactive({
      operBtnText: "全选",
      checkServers: [],
      serversList: [],
      malfList: [],
    });
    getServerList(info);
    //监听checked变化
    watch(info.serversList, () => {
      info.checkServers = info.serversList
        .filter((m) => m.checked)
        .map((m) => m.servers);
    });
    let operBtnText = computed(() => {
      return info.checkServers.length == info.serversList.length
        ? "取消全选"
        : "全选";
    });
    return {
      info,
      delayReply,
      operBtnText,
      malfChange(servers, value) {
        // info.serversList.some((m) => {
        //   if (m.servers == servers) {
        //     m.checked = !m.checked;
        //     return true;
        //   }
        // });
        if (!servers.checked) {
          switch (MalfunctionTypeEnum[value]) {
            case MalfunctionTypeEnum.DelayReply:
              delayReply.value.show();
              break;
            case MalfunctionTypeEnum.IntervalOffline:
              break;
            default:
              break;
          }
        }
        servers.checked = !servers.checked;
      },
      operBtnClick(serversList) {
        const ck = serversList.length == info.checkServers.length;
        serversList.forEach((m) => {
          m.checked = !ck;
        });
      },
    };
  },
});
</script>
<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.malf-container {
  min-height: 100px;
  max-height: 300px;
  //display: flex;
  // flex-direction: row;
  // flex-wrap: wrap;
  .el-check-tag {
    //display: block;
    //height: 28px;
    //   margin-right: 15px;
    // margin-bottom: 20px;
  }
}
.el-icon-plus.add {
  cursor: pointer;
  color: #409eff;
  font-size: 22px;
  &:hover {
    color: #66b1ff;
    transition: all 0.5s;
    transform: scale(1.2);
  }
}
</style>
