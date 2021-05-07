<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <el-card shadow="hover">
        <template #header>
          <div class="card-header">
            <span>延时回复</span>
            <el-button class="button" type="text"></el-button>
            <el-tooltip
              class="item"
              effect="dark"
              content="添加模拟器"
              placement="top"
            >
              <i class="el-icon-plus add"></i>
            </el-tooltip>
          </div>
        </template>
        <div class="malf-container">
            <el-check-tag effect="dark">0</el-check-tag>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>
<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.malf-container {
  height: 200px;
}
.el-icon-plus.add {
  cursor: pointer;
  color: #409eff;
  font-size:22px;
  &:hover {
    color: #66b1ff;
    transition: all 0.5s;
    transform: scale(1.2);
  }
}
</style>
