<template>
  <el-dialog title="启动设备" width="65%" v-model="info.dialogVisible">
    <el-form :model="formModel">
      <el-form-item label="启动数量" :label-width="formLabelWidth">
        <el-input-number v-model="formModel.startCount"></el-input-number>
      </el-form-item>
      <el-form-item
        v-if="formModel.intervalSecond != null"
        label="启动间隔"
        :label-width="formLabelWidth"
      >
        <el-input-number v-model="formModel.intervalSecond"></el-input-number>
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
import { startDeviceInfoType, restResultType } from "@/models";
import api from "@/api";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "startDevice",
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
      startCount: 200,
      intervalSecond: 10,
    } as startDeviceInfoType);
    return {
      info,
      formModel,
      show: (interval) => {
        info.dialogVisible = true;
        //如果不是定时则置空间隔时间
        if (!interval) {
          formModel.intervalSecond = null;
        } else {
          formModel.intervalSecond = 10;
        }
      },
      submitForm,
    };
  },
});
//提交数据
function submitForm(formModel: startDeviceInfoType, info) {
  api.manager.startDevice(formModel).then(
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
