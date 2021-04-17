<template>
  <el-dialog title="定时下线" width="65%" v-model="info.dialogVisible">
    <el-form :model="formModel">
      <el-form-item label="在线分钟" :label-width="formLabelWidth">
        <el-input-number
          v-model="formModel.onlineMinute"
          :min="1"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="下线间隔" :label-width="formLabelWidth">
        <el-input-number
          v-model="formModel.intervalSecond"
          :min="1"
        ></el-input-number>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="info.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm(formModel, info)">
          确 定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue";
import { timingOfflineInfoType, restResultType } from "@/models";
import api from "@/api";
import { ElMessage } from "element-plus";
export default defineComponent({
  naem: "payCharge",
  props: {
    serverValue: {
      type: Array,
      default: [],
    },
  },
  setup(prop, context) {
    let info = reactive({
      dialogVisible: false,
      formLabelWidth: "80px",
    });
    let formModel = reactive({
      serverList: prop.serverValue,
      onlineMinute: 10,
      intervalSecond: 600,
    } as timingOfflineInfoType);
    return {
      info,
      formModel,
      show: () => {
        info.dialogVisible = true;
      },
      submitForm,
    };
  },
});
//提交数据
function submitForm(formModel: timingOfflineInfoType, info) {
  api.manager.timingOffline(formModel).then(
    (restResult: restResultType) => {
      if (restResult.isPositive) {
        ElMessage.success(restResult.data);
        info.dialogVisible = false;
      } else {
        ElMessage.error(restResult.errorMsg);
      }
    },
    (error) => {
      ElMessage.error(`提交数据错误：${error.message}`);
    }
  );
}
</script>

<style lang="scss" scoped>
</style>
