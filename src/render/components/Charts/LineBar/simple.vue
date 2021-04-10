<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from "vue";
import { initChart } from "./lineBarFuns";
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
    });
    watch(prop, (nprop, o) => {
      //   if (nprop.option.series) {
      //     nprop.option.series[0].data[0].name = nprop.title;
      //   }
      chart.echart.setOption(nprop.option);
    });
    return {
      chart,
    };
  },
});
</script>
