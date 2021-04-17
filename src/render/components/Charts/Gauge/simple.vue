<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>
<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  watch,
} from "vue";
import { initChart } from "./gaugeFuns";
import { ECharts } from "echarts/core";
import  {initListener}  from "../mixins/resize";

export default defineComponent({
  name: "SimpleChart",
  props: {
    className: {
      type: String,
      default: "chart",
    },
    id: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "200px",
    },
    height: {
      type: String,
      default: "200px",
    },
    title: {
      type: String,
      defautl: "",
    },
    option: {
      type: Object,
      default: {},
    },
  },
  methods: {},
  setup(prop, context) {
    let chart = reactive({} as ECharts);
    onMounted(() => {
      chart = initChart(document.getElementById(prop.id));
      initListener(chart);
    });
    watch(prop, (nprop, o) => {
      if (nprop.option.series) {
        nprop.option.series[0].data[0].name = nprop.title;
      }
      chart.setOption(nprop.option, { lazyUpdate: true });
    });
    return {
      chart,
    };
  },
});
</script>
