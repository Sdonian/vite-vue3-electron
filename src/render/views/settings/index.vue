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

    <!-- <el-input
      v-model="info.deviceListQuery.deviceNum"
      placeholder="设备编号"
      style="width: 200px"
      class="filter-item"
      clearable
    />
    <el-button
      class="filter-item"
      @click="handleQuery(info)"
      type="primary"
      icon="el-icon-search"
    >
      搜索
    </el-button> -->
  </div>
  <div class="editor-container">
    <el-form :model="info.formModel" label-width="140px">
      <el-tabs v-model="info.activeName" @tab-click="handleClick">
        <el-tab-pane label="基础设置" name="base">
          <el-form-item label="注册Key">
            <el-input v-model="info.formModel.registerKey"></el-input>
          </el-form-item>
          <el-form-item label="注册ID">
            <el-input v-model="info.formModel.registerId"></el-input>
          </el-form-item>
          <el-form-item label="默认AesKey">
            <el-input v-model="info.formModel.defaultAesKey"></el-input>
          </el-form-item>
          <el-form-item label="默认设备号">
            <el-input v-model="info.formModel.defaultDeviceNum"></el-input>
          </el-form-item>
          <el-form-item label="设备类型">
            <!-- <el-input v-model="info.formModel.deviceTypes"></el-input> -->
            <el-row>
              <el-col :span="8"><el-checkbox>普通慢充</el-checkbox></el-col>
              <el-col :span="8"><el-checkbox>功率慢充</el-checkbox></el-col>
              <el-col :span="8"><el-checkbox>电量慢充</el-checkbox></el-col>
              <el-col :span="8"><el-checkbox>快充</el-checkbox></el-col>
              <el-col :span="8">
                <el-checkbox>两路功率慢充</el-checkbox>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="Tcp服务器地址端口">
            <el-row>
              <el-col :span="20">
                <el-input v-model="info.formModel.serverAddress.ip"></el-input>
              </el-col>
              <el-col :span="4">
                <el-input
                  v-model="info.formModel.serverAddress.port"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="支付充电地址">
            <el-input v-model="info.formModel.payChargeUrl"></el-input>
          </el-form-item>
          <el-form-item label="用户Token地址">
            <el-input v-model="info.formModel.getTokenUrl"></el-input>
          </el-form-item>
          <el-form-item label="启用Elasticsearch">
            <!-- <el-input v-model="info.formModel.elasticsearch"></el-input> -->
            <el-switch
              v-model="info.formModel.elasticsearch"
              active-color="#13ce66"
            >
            </el-switch>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="Redis设置" name="redis">
          <el-form-item label="Redis连接字符串">
            <el-input
              v-model="info.formModel.redisSetting.connectionStr"
            ></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="Rabbitmq设置" name="rabbitmq">
          <el-form-item label="管理端Topic路由">
            <el-input
              v-model="info.formModel.rabbitMQSetting.managerTopicRoute"
            ></el-input>
          </el-form-item>
          <el-form-item label="系统消息队列名">
            <el-input
              v-model="info.formModel.rabbitMQSetting.systemMsgQueueName"
            ></el-input>
          </el-form-item>
          <el-form-item label="连接用户名">
            <el-input
              v-model="
                info.formModel.rabbitMQSetting.connectionConfiguration.userName
              "
            ></el-input>
          </el-form-item>
          <el-form-item label="连接密码">
            <el-input
              v-model="
                info.formModel.rabbitMQSetting.connectionConfiguration.password
              "
            ></el-input>
          </el-form-item>
          <el-form-item label="VirtualHost">
            <el-input
              v-model="
                info.formModel.rabbitMQSetting.connectionConfiguration
                  .virtualHost
              "
            ></el-input>
          </el-form-item>
          <el-form-item label="连接地址端口">
            <el-row>
              <el-col :span="20">
                <el-input
                  v-model="
                    info.formModel.rabbitMQSetting.connectionConfiguration.hosts
                      .host
                  "
                ></el-input
              ></el-col>
              <el-col :span="4">
                <el-input
                  v-model="
                    info.formModel.rabbitMQSetting.connectionConfiguration.hosts
                      .port
                  "
                ></el-input
              ></el-col>
            </el-row>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <el-row type="flex" justify="center">
        <el-col :span="4">
          <el-button size="medium" type="primary">确认</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue";
import { getServerOptions } from "../shortcut/index";

export default defineComponent({
  components: {},
  setup() {
    let jsonEditor = ref(null);
    let info = reactive({
      serverOptions: [],
      serverValue: "",
      serverConfig: {},
      activeName: "base",
      formLoading: false,
      formModel: {
        registerKey: "",
        registerId: "",
        defaultAesKey: "",
        defaultDeviceNum: "",
        deviceTypes: [],
        serverAddress: {
          ip: "",
          port: 6010,
        },
        payChargeUrl: "",
        getTokenUrl: "",
        elasticsearch: "",
        redisSetting: {
          connectionStr: "",
        },
        rabbitMQSetting: {
          managerTopicRoute: "",
          systemMsgQueueName: "",
          connectionConfiguration: {
            userName: "",
            password: "",
            virtualHost: "",
            hosts: {
              host: "",
              port: "",
            },
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
      }
    });
    return {
      info,
      jsonEditor,
    };
  },
});
</script>
<style scoped>
.editor-container {
  position: relative;
  height: 100%;
  width: 50%;
  min-width: 500px;
  margin: 0px auto;
}
</style>