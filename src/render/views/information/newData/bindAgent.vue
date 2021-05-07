<template>
  <el-row>
    <el-col :span="24">
      <el-form :model="info.bindAgentModel" label-width="140px">
        <el-form-item label="运营商登录地址">
          <el-input v-model="info.bindAgentModel.loginAgentUrl"></el-input>
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
          <el-input v-model="info.bindAgentModel.agentAuthorization"></el-input>
        </el-form-item>
        <el-form-item label="批量添加地址">
          <el-input v-model="info.bindAgentModel.batchAddDeviceUrl"></el-input>
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
                  @click="showChooseFile"
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
              <span class="percentage-label" style="color: #606266">{{
                info.progressLabel
              }}</span>
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
  <!-- 选择设备编号dialog -->
  <el-dialog title="选择对应设备编号文件" v-model="info.chooseVisible">
    <el-scrollbar wrap-class="scrollbar-wrapper" ref="scrollbar">
      <div style="max-height: 600px">
        <el-table
          :data="info.clientFileList"
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
import { defineComponent, reactive, computed } from "vue";
import { bindAgentInfoType, restResultType } from "@/models";
import { ElMessage } from "element-plus";
import moment from "moment";
import {
  bindAgentType,
  chooseDeviceNumber,
  batchAddDevice,
  batchAddDeviceCheck,
  getClientFiles,
  refreshGroups,
} from "./newData";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    let store = useStore();
    let info: bindAgentType = reactive<bindAgentType>({
      batchProg: 0,
      batchStatus: "",
      chooseVisible: false,
      autoRefresh: true,
      currentRow: null,
      clientFileList: [],
      progressLabel: "",
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

    const deviceNumFileList = computed(() => {
      return info.clientFileList.filter((m) => {
        return m.fileName.indexOf("devNums") > -1;
      });
    });

    return {
      info,
      chooseDeviceNumber,
      batchAddDevice,
      batchAddDeviceCheck,
      agentGroupIdChange(val) {
        store.dispatch("setAgentGroupId", info.bindAgentModel.agentGroupId);
      },
      refreshGroups() {
        refreshGroups(info, store);
      },
      handleCurrentChange(val) {
        info.currentRow = val;
      },
      showChooseFile() {
        getClientFiles().then(
          (restResult: restResultType) => {
            if (restResult.isPositive) {
              info.clientFileList = restResult.data.filter((m) => {
                return m.fileName.indexOf("devNums") > -1;
              });
              info.clientFileList = info.clientFileList.map(m=>{
                m.createTime = moment(m.createTime).format("YYYY-MM-DD HH:mm:ss.SSS");
                return m;
              });
              info.chooseVisible = true;
            } else {
              ElMessage.error(`获取文件列表错误：${restResult.errorMsg}`);
            }
          },
          (error) => {
            ElMessage.error(`获取文件列表错误：${error.message}`);
          }
        );
      },
    };
  },
});
</script>

//  getGroupsUrl:
//           "https://agent-dev.wanzhuang-app.com/api/device/getDeviceGroupList?page=1&limit=20&need_count=1",
//         loginAgentUrl:
//           "https://agent-dev.wanzhuang-app.com/api/auth/agentLogin",
//         batchAddDeviceUrl:
//           "https://webapi.wanzhuang-app.com/device/batchAddDeviceOfOperator",