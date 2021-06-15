<template>
  <el-form :model="info" label-width="140px">
    <el-form-item label="起始设备号">
      <el-input-number v-model="info.start"></el-input-number>
    </el-form-item>
    <el-form-item label="生成总数">
      <el-input-number v-model="info.total"></el-input-number>
    </el-form-item>
    <el-form-item label="插入Sql语句">
      <el-row>
        <el-col :span="23">
          <el-input
            type="textarea"
            autosize
            v-model="info.sqlFormat"
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
    <el-button size="medium" type="primary" @click="createClient(info)">
      开始生成
    </el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { createClientInfoType } from "@/models";
import { createClient } from "./newData";

export default defineComponent({
  setup() {
    let info: createClientInfoType = reactive<createClientInfoType>({
      WZCPType:0,
      start: 18933000,
      total: 3000,
      sqlFormat:
        "INSERT INTO `wz_main`.`wz_device_specification` ( `device_num`, `company_id`, `category_id`, `device_type`, `hardware_ver`, `hardware_cfg`, `software_ver`, `module_soft_ver`, `imei`,  `chip_id`) VALUES ('{0}', 2, 1, 0, '10', '0', '0.0.5.10', 'WZ_4G_CB_02_1.0.8_Luat_V0030_RDA8910', '{1}', '{2}');",
    });
    return {
      info,
      createClient,
    };
  },
});
</script>