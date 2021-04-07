<template>
  <div style="height: 100%">
    <el-row :gutter="15">
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>卡片名称</span>
            </div>
          </template>
          <div class="card-content"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>
<style lang="scss" scoped>
.card-content {
  min-height: 100px;
}
</style>