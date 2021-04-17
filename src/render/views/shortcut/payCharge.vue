<template>
  <el-dialog title="支付充电" width="80%" v-model="info.dialogVisible">
    <el-form :model="formModel">
      <el-form-item label="充电通道" :label-width="formLabelWidth">
        <el-select
          v-model="formModel.chargeChannel"
          multiple
          placeholder="请选择"
          :size="small"
          clearable
          popper-class="select-popper"
        >
          <el-option
            v-for="item in info.chargeChannel"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支付金额" :label-width="formLabelWidth">
        <el-input-number
          v-model="formModel.payMoney"
          :min="100"
        ></el-input-number>
      </el-form-item>
      <template v-if="formModel.intervalSecond != null">
        <el-form-item label="批次数量" :label-width="formLabelWidth">
          <el-input-number
            v-model="formModel.batchPayCount"
            :min="1"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="支付间隔" :label-width="formLabelWidth">
          <el-input-number
            v-model="formModel.intervalSecond"
            :min="1"
          ></el-input-number>
        </el-form-item>
      </template>
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
import { payChargeInfoType, restResultType } from "@/models";
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
      chargeChannel: [],
    });
    //初始化充电通道
    for (let index = 0; index < 10; index++) {
      info.chargeChannel.push({ value: index, label: index });
    }
    let formModel = reactive({
      serverList: prop.serverValue,
      chargeChannel: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      payMoney: 100,
      batchPayCount: 1,
      intervalSecond: 3,
    } as payChargeInfoType);
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
