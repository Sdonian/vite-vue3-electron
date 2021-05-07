<template>
  <el-form :model="info.createConfigModel" label-width="140px">
    <el-form-item label="模拟器数量">
      <el-input-number
        v-model="info.createConfigModel.serversTotal"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="imeiChipIds">
      <el-input v-model="info.createConfigModel.imeiChipIds">
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
    <el-form-item label="支付用户ID">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input v-model="info.createConfigModel.userIdStart">
            <template #prepend>起始</template></el-input
          >
        </el-col>
        <el-col :span="12">
          <el-input v-model="info.createConfigModel.userIdEnd"
            ><template #prepend>结束</template></el-input
          >
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="docker镜像名称">
      <el-input v-model="info.createConfigModel.dockerImageName"></el-input>
    </el-form-item>
    <el-form-item label="主程序路径">
      <el-input v-model="info.createConfigModel.appPath"></el-input>
    </el-form-item>
  </el-form>
  <div class="submit-btns">
    <el-button size="medium" type="primary" @click="createConfig(info)">
      开始生成并下载
    </el-button>
  </div>
  <!-- 选择设备编号dialog -->
  <el-dialog title="选择对应imeiChipid文件" v-model="info.chooseVisible">
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
        <el-button @click="chooseImeiChipid(info)" size="medium" type="primary"
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
import { defineComponent, reactive } from "vue";
import { restResultType } from "@/models";
import { ElMessage } from "element-plus";
import {
  getClientFiles,
  chooseImeiChipid,
  createConfigType,
  createConfig,
} from "./newData";
import moment from "moment";
export default defineComponent({
  setup() {
    let info = reactive<createConfigType>({
      clientFileList: [],
      chooseVisible: false,
      currentRow: null,
      createConfigModel: {
        serversTotal: 20,
        imeiChipIds: "",
        userIdStart: 0,
        userIdEnd: 1000,
        dockerImageName: "mcr.microsoft.com/dotnet/runtime",
        appPath: "/home/wzConfig/wanzhuang/WanZhuang.Linux.dll",
      },
    });
    return {
      info,
      chooseImeiChipid,
      createConfig,
      handleCurrentChange(val) {
        info.currentRow = val;
      },
      showChooseFile() {
        getClientFiles().then(
          (restResult: restResultType) => {
            if (restResult.isPositive) {
              info.clientFileList = restResult.data.filter((m) => {
                return m.fileName.indexOf("iemiChipId") > -1;
              });
              info.clientFileList = info.clientFileList.map((m) => {
                m.createTime = moment(m.createTime).format(
                  "YYYY-MM-DD HH:mm:ss.SSS"
                );
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