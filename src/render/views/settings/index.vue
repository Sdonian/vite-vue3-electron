<template>
  <div class="filter-container">
    <el-row type="flex" justify="end">
      <el-col :span="4">
        <el-select
          v-model="info.serverValue"
          placeholder="请选择"
          class="filter-item"
          :size="small"
          popper-class="select-popper"
          @change="serverChange"
        >
          <el-option
            v-for="item in info.serverOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="1"> </el-col>
    </el-row>
  </div>
  <!-- v-loading="info.formLoading" -->
  <div class="editor-container">
    <el-form :model="info.formModel" label-width="140px">
      <el-tabs v-model="info.activeName" @tab-click="handleClick">
        <el-tab-pane label="基础设置" name="base">
          <el-skeleton :loading="info.formLoading" animated>
            <template #template>
              <el-skeleton-item />
              <el-skeleton-item />
              <el-skeleton-item />
              <el-skeleton-item />
              <el-skeleton-item />
              <el-skeleton-item />
              <el-skeleton-item />
              <el-skeleton-item />
              <el-skeleton-item />
            </template>
            <template #default>
              <el-form-item label="注册Key">
                <el-input v-model="info.formModel.RegisterKey"></el-input>
              </el-form-item>
              <el-form-item label="注册ID">
                <el-input
                  v-model="info.formModel.RegisterId"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="默认AesKey">
                <el-input v-model="info.formModel.DefaultAesKey"></el-input>
              </el-form-item>
              <el-form-item label="默认设备号">
                <el-input v-model="info.formModel.DefaultDeviceNum"></el-input>
              </el-form-item>
              <el-form-item label="设备类型">
                <!-- <el-input v-model="info.formModel.deviceTypes"></el-input> -->
                <el-row>
                  <el-col
                    v-for="dtype in info.deviceTypesCheckbox"
                    :span="8"
                    :key="dtype.value"
                  >
                    <!-- :checked="info.formModel.DeviceTypes[dtype] != null" -->
                    <el-checkbox v-model="dtype.checked">{{
                      dtype.label
                    }}</el-checkbox>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="Tcp服务器地址端口">
                <el-row>
                  <el-col :span="20">
                    <el-input
                      v-model="info.formModel.ServerAddress.Ip"
                    ></el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-input
                      v-model="info.formModel.ServerAddress.Port"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="支付充电地址">
                <el-input v-model="info.formModel.PayChargeUrl"></el-input>
              </el-form-item>
              <el-form-item label="用户Token地址">
                <el-input v-model="info.formModel.GetTokenUrl"></el-input>
              </el-form-item>
              <el-form-item label="启用Elasticsearch">
                <!-- <el-input v-model="info.formModel.elasticsearch"></el-input> -->
                <el-switch
                  v-model="info.formModel.Elasticsearch"
                  active-color="#13ce66"
                >
                </el-switch>
              </el-form-item>
            </template>
          </el-skeleton>
        </el-tab-pane>
        <el-tab-pane label="Redis设置" name="redis">
          <el-skeleton :loading="info.formLoading" animated>
            <template #template>
              <el-skeleton-item />
            </template>
            <template #default>
              <el-form-item label="Redis连接字符串">
                <el-input
                  v-model="info.formModel.RedisSetting.ConnectionStr"
                ></el-input>
              </el-form-item>
            </template>
          </el-skeleton>
        </el-tab-pane>
        <el-tab-pane label="Rabbitmq设置" name="rabbitmq">
          <el-skeleton :loading="info.formLoading" animated>
            <template #template>
              <el-skeleton-item />
              <el-skeleton-item />
              <el-skeleton-item />
              <el-skeleton-item />
              <el-skeleton-item />
              <el-skeleton-item />
            </template>
            <template #default>
              <el-form-item label="管理端Topic路由">
                <el-input
                  v-model="info.formModel.RabbitMQSetting.ManagerTopicRoute"
                ></el-input>
              </el-form-item>
              <el-form-item label="系统消息队列名">
                <el-input
                  v-model="info.formModel.RabbitMQSetting.SystemMsgQueueName"
                ></el-input>
              </el-form-item>
              <el-form-item label="连接用户名">
                <el-input
                  v-model="
                    info.formModel.RabbitMQSetting.ConnectionConfiguration
                      .UserName
                  "
                ></el-input>
              </el-form-item>
              <el-form-item label="连接密码">
                <el-input
                  v-model="
                    info.formModel.RabbitMQSetting.ConnectionConfiguration
                      .Password
                  "
                ></el-input>
              </el-form-item>
              <el-form-item label="VirtualHost">
                <el-input
                  v-model="
                    info.formModel.RabbitMQSetting.ConnectionConfiguration
                      .VirtualHost
                  "
                ></el-input>
              </el-form-item>
              <el-form-item label="连接地址端口">
                <el-row>
                  <el-col :span="20">
                    <el-input
                      v-model="
                        info.formModel.RabbitMQSetting.ConnectionConfiguration
                          .Hosts[0].Host
                      "
                    ></el-input
                  ></el-col>
                  <el-col :span="4">
                    <el-input
                      v-model="
                        info.formModel.RabbitMQSetting.ConnectionConfiguration
                          .Hosts[0].Port
                      "
                    ></el-input
                  ></el-col>
                </el-row>
              </el-form-item>
            </template>
          </el-skeleton>
        </el-tab-pane>
      </el-tabs>
      <div class="submit-btns">
        <el-button size="medium" type="primary" @click="saveConfig(info)"
          >保存当前</el-button
        >
        <el-button size="medium" type="danger" @click="saveConfigAll(info)"
          >保存所有</el-button
        >
      </div>
    </el-form>
  </div>
</template>
<script lang="ts">
import { ElMessage } from "element-plus";
import { defineComponent, reactive, ref, watch } from "vue";
import { getServerOptions } from "../shortcut/index";
import {
  serverSettingInfoType,
  cacheServerConfig,
  saveConfig,
  saveConfigAll,
} from "./index";

export default defineComponent({
  components: {},
  setup() {
    let jsonEditor = ref(null);
    let info: serverSettingInfoType = reactive({
      serverOptions: [],
      serverValue: "",
      activeName: "base",
      formLoading: false,
      deviceTypesCheckbox: [],
      formModel: {
        RegisterKey: "",
        RegisterId: "",
        DefaultAesKey: "",
        DefaultDeviceNum: "",
        DeviceTypes: [],
        ServerAddress: {
          Ip: "",
          Port: 6010,
        },
        PayChargeUrl: "",
        GetTokenUrl: "",
        Elasticsearch: "",
        RedisSetting: {
          ConnectionStr: "",
        },
        RabbitMQSetting: {
          ManagerTopicRoute: "",
          SystemMsgQueueName: "",
          ConnectionConfiguration: {
            UserName: "",
            Password: "",
            VirtualHost: "",
            Hosts: [
              {
                Host: "",
                Port: "",
              },
            ],
          },
        },
      },
    });
    //获取模拟器数据
    getServerOptions(info.serverOptions);
    //监听模拟器选项
    watch(info.serverOptions, (n, o) => {
      if (info.serverOptions.length > 0) {
        info.serverValue = info.serverOptions[0].value;
        cacheServerConfig(info);
      }
    });
    return {
      info,
      jsonEditor,
      saveConfig,
      saveConfigAll,
      serverChange(val) {
        cacheServerConfig(info);
      },
    };
  },
});
</script>
<style lang="scss" scoped>
.editor-container {
  position: relative;
  height: 100%;
  width: 50%;
  min-width: 500px;
  margin: 0px auto;
}
.submit-btns {
  text-align: center;
}

.el-skeleton__item {
  height: 30px;
  margin-bottom: 18px;
}
</style>