<template>
  <div class="editor-container">
    <el-tabs v-model="info.activeName" @tab-click="handleClick">
      <el-tab-pane label="生成设备数据" name="newDeviceData">
        <el-form :model="info.createClientModel" label-width="140px">
          <el-form-item label="起始设备号">
            <el-input-number
              v-model="info.createClientModel.start"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="生成总数">
            <el-input-number
              v-model="info.createClientModel.total"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="插入Sql语句">
            <el-row>
              <el-col :span="23">
                <el-input
                  type="textarea"
                  autosize
                  v-model="info.createClientModel.sqlFormat"
                ></el-input>
              </el-col>
              <el-col :span="1">
                <el-popover
                  placement="top-start"
                  :width="500"
                  trigger="hover"
                  content="采用string.Format格式化，其中{0}=device_num，{1}=imei，{2}=chip_id"
                >
                  <template #reference>
                    <i
                      class="el-icon-question"
                      style="font-size: 20px; cursor: pointer"
                    ></i>
                  </template>
                </el-popover>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <div class="submit-btns">
          <el-button
            size="medium"
            type="primary"
            @click="createClient(info.createClientModel)"
          >
            开始生成
          </el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="已生成文件" name="clientFileList">
        <el-table :data="info.clientFileList">
          <el-table-column
            label="文件名称"
            sortable
            prop="fileName"
          ></el-table-column>
          <el-table-column
            label="文件大小(KB)"
            width="120"
            sortable
            prop="fileSize"
            align="right"
          ></el-table-column>
          <el-table-column
            label="创建时间"
            prop="createTime"
            align="center"
            sortable
          ></el-table-column>
          <el-table-column label="操作" class="asdfasdf" align="center">
            <template #default="{ row }">
              <div class="oper-cell-container">
                <el-link type="primary" :href="row.downloadUrl" class="oper-el"
                  >下载</el-link
                >
                <el-button
                  @click.prevent="getClientFileText(row.fileName, info)"
                  type="text"
                  size="small"
                  class="oper-el"
                >
                  查看
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="submit-btns">
          <el-button
            size="medium"
            type="primary"
            @click="getClientFlieList(info)"
          >
            刷新
          </el-button>
          <el-button size="medium" type="danger" @click="clearClientFlie(info)">
            清理所有文件
          </el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="设备绑定运营商" name="deviceBind">
        <el-row>
          <el-col :span="24">
            <el-form :model="info.bindAgentModel" label-width="140px">
              <el-form-item label="运营商登录地址">
                <el-input
                  v-model="info.bindAgentModel.loginAgentUrl"
                ></el-input>
              </el-form-item>
              <el-form-item label="运营商手机号">
                <el-input v-model="info.bindAgentModel.agentPhone"></el-input>
              </el-form-item>
              <el-form-item label="运营商密码">
                <el-input
                  show-password
                  v-model="info.bindAgentModel.agentPwd"
                ></el-input>
              </el-form-item>
              <el-form-item label="运营商分组地址">
                <el-input v-model="info.bindAgentModel.getGroupsUrl"></el-input>
              </el-form-item>
              <el-form-item label="选择分组">
                <el-select
                  :size="small"
                  placeholder="请选择"
                  v-model="info.bindAgentModel.agentGroupId"
                  style="width: calc(100% - 24px)"
                  @change="agentGroupIdChange"
                >
                  <el-option
                    v-for="item in info.agentGroups"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>

                <i
                  class="el-icon-refresh"
                  style="font-size: 24px; cursor: pointer"
                  @click="refreshGroups"
                ></i>
              </el-form-item>
              <el-form-item label="授权Token">
                <el-input
                  v-model="info.bindAgentModel.agentAuthorization"
                ></el-input>
              </el-form-item>
              <el-form-item label="批量添加地址">
                <el-input
                  v-model="info.bindAgentModel.batchAddDeviceUrl"
                ></el-input>
              </el-form-item>
              <el-form-item label="设备编号">
                <el-input v-model="info.bindAgentModel.batchDeviceNum">
                  <template #append>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="搜索文件选取"
                      placement="top"
                    >
                      <el-button
                        icon="el-icon-search"
                        @click="info.chooseVisible = true"
                      ></el-button>
                    </el-tooltip>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="批处理Id">
                <el-input v-model="info.bindAgentModel.batchId"></el-input>
              </el-form-item>
              <el-form-item label="批处理进度">
                <el-progress
                  :stroke-width="32"
                  :percentage="info.batchProg"
                  :text-inside="true"
                  :indeterminate="true"
                  :status="info.batchStatus"
                >
                  <template #default="{ percentage }">
                    <span class="percentage-label" style="color: #606266"
                      >当前进度：</span
                    >
                    <span class="percentage-value" style="color: #606266">
                      {{ percentage }}%
                    </span>
                  </template>
                </el-progress>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <div class="submit-btns">
          <el-button size="medium" type="primary" @click="batchAddDevice(info)">
            开始绑定
          </el-button>
          <el-button
            size="medium"
            type="primary"
            @click="batchAddDeviceCheck(info, true)"
          >
            绑定进度查询
          </el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
  <!-- 查看文件内容Dialog -->
  <el-dialog
    :title="info.readTitle"
    width="90%"
    top="7vh"
    v-model="info.readVisible"
  >
    <el-scrollbar wrap-class="scrollbar-wrapper" ref="scrollbar">
      <div style="max-height: 600px">{{ info.readText }}</div>
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          @click="clip(info.readText, $event)"
          size="medium"
          type="primary"
          >复制</el-button
        >
        <el-button @click="info.readVisible = false" size="medium"
          >关闭</el-button
        >
      </span>
    </template>
  </el-dialog>
  <!-- 选择设备编号dialog -->
  <el-dialog title="选择对应设备编号文件" v-model="info.chooseVisible">
    <el-scrollbar wrap-class="scrollbar-wrapper" ref="scrollbar">
      <div style="max-height: 600px">
        <el-table
          :data="deviceNumFileList"
          highlight-current-row
          @row-click="handleCurrentChange"
        >
          <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
          <el-table-column
            label="文件名称"
            sortable
            prop="fileName"
          ></el-table-column>
          <el-table-column
            label="文件大小(KB)"
            width="120"
            sortable
            prop="fileSize"
            align="right"
          ></el-table-column>
          <el-table-column
            label="创建时间"
            prop="createTime"
            align="center"
            sortable
          ></el-table-column>
        </el-table>
      </div>
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          @click="chooseDeviceNumber(info)"
          size="medium"
          type="primary"
          >确认</el-button
        >
        <el-button @click="info.chooseVisible = false" size="medium"
          >关闭</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { ElMessage } from "element-plus";
import { defineComponent, reactive, ref, onUnmounted, computed } from "vue";
import {
  createClient,
  getClientFlieList,
  newDataInfoType,
  clearClientFlie,
  getClientFileText,
  loginAgent,
  refreshGroups,
  chooseDeviceNumber,
  batchAddDevice,
  batchAddDeviceCheck,
} from "./newData";
import { createClientInfoType, bindAgentInfoType } from "@/models";
import clip from "@/utils/clipboard";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    let store = useStore();

    let info: newDataInfoType = reactive<newDataInfoType>({
      activeName: "newDeviceData",
      batchProg: 0,
      batchStatus: "",
      currentRow: null,
      readTitle: "",
      readVisible: false,
      chooseVisible: false,
      readText: "",
      autoRefresh: true,
      createClientModel: {
        start: 18900000,
        total: 3000,
        sqlFormat:
          "INSERT INTO `wz_main`.`wz_device_specification` ( `device_num`, `company_id`, `category_id`, `device_type`, `hardware_ver`, `hardware_cfg`, `software_ver`, `module_soft_ver`, `imei`,  `chip_id`) VALUES ('{0}', 2, 1, 0, '10', '0', '0.0.5.10', 'WZ_4G_CB_02_1.0.8_Luat_V0030_RDA8910', '{1}', '{2}');",
      } as createClientInfoType,
      clientFileList: [],
      bindAgentModel: {
        agentPhone: store.getters.agentPhone,
        agentPwd: "sdonian",
        agentGroupId: store.getters.agentGroupId,
        agentAuthorization: store.getters.agentToken,
        batchDeviceNum: [],
        getGroupsUrl: store.getters.getGroupsUrl,
        loginAgentUrl: store.getters.loginAgentUrl,
        batchAddDeviceUrl: store.getters.batchAddDeviceUrl,
        batchId: store.getters.batchId,
      } as bindAgentInfoType,
      agentGroups: store.getters.agentGroups,
    });
    //读取已生成设备文件
    getClientFlieList(info);
    //登录运营商平台获取token
    loginAgent(info, store);

    const deviceNumFileList = computed(() => {
      return info.clientFileList.filter((m) => {
        return m.fileName.indexOf("devNums") > -1;
      });
    });

    onUnmounted(() => {
      info.autoRefresh = false;
    });
    return {
      info,
      createClient,
      getClientFlieList,
      clearClientFlie,
      getClientFileText,
      deviceNumFileList,
      chooseDeviceNumber,
      batchAddDevice,
      batchAddDeviceCheck,
      clip,
      agentGroupIdChange(val) {
        store.dispatch("setAgentGroupId", info.bindAgentModel.agentGroupId);
      },
      refreshGroups() {
        refreshGroups(info, store);
      },
      handleCurrentChange(val) {
        info.currentRow = val;
      },
    };
  },
});
</script>
<style lang="scss" scoped>
.editor-container {
  position: relative;
  height: 100%;
  width: 50%;
  min-width: 600px;
  margin: 0px auto;
}
.submit-btns {
  text-align: center;
  padding-top: 10px;
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


//  getGroupsUrl:
//           "https://agent-dev.wanzhuang-app.com/api/device/getDeviceGroupList?page=1&limit=20&need_count=1",
//         loginAgentUrl:
//           "https://agent-dev.wanzhuang-app.com/api/auth/agentLogin",
//         batchAddDeviceUrl:
//           "https://webapi.wanzhuang-app.com/device/batchAddDeviceOfOperator",