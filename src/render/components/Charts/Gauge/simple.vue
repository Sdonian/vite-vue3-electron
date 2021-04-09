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
import resize from "../mixins/resize";

export default defineComponent({
  name: "SimpleChart",
  mixins: [resize],
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
    let chart = reactive({ echart: {} as ECharts });
    onMounted(() => {
      chart.echart = initChart(document.getElementById(prop.id));
      let option = prop.option;
      if (!option.series) {
        option.series = [{ data: [{ name: option.title, value: 0 }] }];
        //option.series[0].data[0].name = option.title;
      }
      chart.echart.setOption(option);
      //scontext.emit("test");
      // setTimeout(() => {
      //   option.series[0].max = 100;
      // }, 5000);
    });
    watch(prop, (nprop, o) => {
      if (nprop.option.series) {
        nprop.option.series[0].data[0].name = nprop.title;
      }
      chart.echart.setOption(nprop.option);
    });
    return {
      chart,
    };
  },
});
</script>
