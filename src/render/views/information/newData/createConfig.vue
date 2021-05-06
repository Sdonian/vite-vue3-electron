<template>
  <el-form :model="info.createConfigModel" label-width="140px">
    <el-form-item label="模拟器数量">
      <el-input-number v-model="info.createConfigModel.total"></el-input-number>
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
              @click="info.chooseVisible = true"
            ></el-button>
          </el-tooltip>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="支付用户ID">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input v-model="info.createConfigModel.payUserIdStart">
            <template #prepend>起始</template></el-input
          >
        </el-col>
        <el-col :span="12">
          <el-input v-model="info.createConfigModel.payUserIdEnd"
            ><template #prepend>结束</template></el-input
          >
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="docker镜像名称">
      <el-input v-model="info.createConfigModel.dockerImage"></el-input>
    </el-form-item>
    <el-form-item label="主程序路径">
      <el-input v-model="info.createConfigModel.appPath"></el-input>
    </el-form-item>
  </el-form>
  <div class="submit-btns">
    <el-button size="medium" type="primary" @click="batchAddDevice(info)">
      开始生成
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
        <el-button
          @click="chooseImeiChipid(info)"
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
import { defineComponent, reactive } from "vue";
import { restResultType } from "@/models";
import { ElMessage } from "element-plus";
import { getClientFiles,chooseImeiChipid } from "./newData";

export default defineComponent({
  setup() {
    let info = reactive({
      clientFileList: [],
      chooseVisible: false,
      createConfigModel: {
        total: 20,
        imeiChipIds:"",
        payUserIdStart: 0,
        payUserIdEnd: 1000,
        dockerImage: "mcr.microsoft.com/dotnet/runtime",
        appPath: "/home/wzConfig/wanzhuang/WanZhuang.Linux.dll",
      },
    });
    return {
      info,
      chooseImeiChipid,
      showChooseFile() {
        getClientFiles().then(
          (restResult: restResultType) => {
            if (restResult.isPositive) {
              info.clientFileList = restResult.data.filter((m) => {
                return m.fileName.indexOf("devNums") > -1;
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