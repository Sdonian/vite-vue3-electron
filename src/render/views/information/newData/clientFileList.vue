<template>
  <el-table :data="info.clientFileList" @selection-change="selectChange">
    <el-table-column type="selection" width="45"> </el-table-column>
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
      width="160"
      sortable
    ></el-table-column>
    <el-table-column label="操作" width="150" class="asdfasdf" align="center">
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
    <el-button size="medium" type="primary" @click="getClientFlieList(info)">
      刷新
    </el-button>
    <el-button size="medium" type="primary" @click="zipDownload(info)">
      打包下载
    </el-button>
    <el-button size="medium" type="danger" @click="clearClientFlie(info)">
      清理文件
    </el-button>
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
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";

import {
  createClient,
  clientFileListInfoType,
  getClientFlieList,
  zipDownload,
  clearClientFlie,
  getClientFileText,
} from "./newData";

export default defineComponent({
  setup() {
    let info = reactive<clientFileListInfoType>({
      readTitle: "",
      selectRows: [],
      readVisible: false,
      clientFileList: [],
      readText: "",
    });
    //读取已生成设备文件
    getClientFlieList(info);
    return {
      info,
      createClient,
      getClientFlieList,
      zipDownload,
      clearClientFlie,
      getClientFileText,
      selectChange(selection) {
        info.selectRows = selection;
      },
    };
  },
});
</script>
<style lang="scss" scoped>
.oper-cell-container {
  display: flex;
  justify-content: center;
  .oper-el {
    margin-right: 10px;
  }
}
</style>