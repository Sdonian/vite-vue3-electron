<template>
  <el-dialog title="延时回复" width="300px" v-model="info.dialogVisible">
    <el-form :model="info.delayModel" label-width="80px">
      <el-form-item label="执行次数">
        <el-input-number
          v-model="info.delayModel.executeTotal"
          :min="100"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="延迟(秒)">
        <el-input-number
          v-model="info.delayModel.secend"
          :min="100"
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
import { defineComponent, reactive } from "vue";
import { payChargeInfoType, restResultType } from "@/models";
import api from "@/api";
import { ElMessage } from "element-plus";
export default defineComponent({
  naem: "delayReply",
  props: {
    serverValue: {
      type: Array,
      default: [],
    },
  },
  setup(prop, context) {
    let info = reactive({
      dialogVisible: false,
      delayModel: {
        executeTotal: 1,
        secend: 20,
      },
    });
    return {
      info,
      show: (interval) => {
        info.dialogVisible = true;
      },
      submitForm,
    };
  },
});
//提交数据
function submitForm(formModel: payChargeInfoType, info) {
  api.manager.payCharge(formModel).then(
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
