<template>
  <div class="editor-container">
    <el-form :model="info.createClientModel" label-width="140px">
      <el-tabs v-model="info.activeName" @tab-click="handleClick">
        <el-tab-pane label="生成设备数据" name="newDeviceData">
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
        </el-tab-pane>
        <el-tab-pane label="设备绑定供应商" name="base"> </el-tab-pane>
        <el-tab-pane label="已生成文件" name="22">
          
        </el-tab-pane>
      </el-tabs>
      <div class="submit-btns">
        <el-button
          size="medium"
          type="primary"
          @click="createClient(info.createClientModel)"
        >
          开始生成
        </el-button>
      </div>
    </el-form>
  </div>
</template>
<script lang="ts">
import { ElMessage } from "element-plus";
import { defineComponent, reactive, ref, watch } from "vue";
import { createClient } from "./newData";
import { createClientInfoType } from "@/models";

export default defineComponent({
  components: {},
  setup() {
    let jsonEditor = ref(null);
    let info = reactive({
      activeName: "newDeviceData",
      formLoading: false,
      deviceTypesCheckbox: [],
      createClientModel: {
        start: 18900000,
        total: 3000,
        sqlFormat:
          "INSERT INTO `wz_main`.`wz_device_specification` ( `device_num`, `company_id`, `category_id`, `device_type`, `hardware_ver`, `hardware_cfg`, `software_ver`, `module_soft_ver`, `imei`,  `chip_id`) VALUES ('{0}', 2, 1, 0, '10', '0', '0.0.5.10', 'WZ_4G_CB_02_1.0.8_Luat_V0030_RDA8910', '{1}', '{2}');",
      } as createClientInfoType,
    });
    return {
      info,
      createClient,
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
</style>