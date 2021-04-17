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
import { initListener } from "../mixins/resize";

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
      let dc = nprop.option.series[0].data.length;
      let startX = 0;
      if (dc % 2 == 0) {
        //双数则中间左边第一个-20%起步
        //计算起始位置
        startX = (dc / 2 - 1) * -30 + -15;
      } else {
        //单数则中间0%起步
        startX = parseInt((dc / 2).toString()) * -20;
      }
      nprop.option.series[0].title = { fontWeight: "normal", fontSize: 14 };
      nprop.option.series[0].detail = {
        width: 40,
        height: 14,
        fontSize: 12,
        color: "#fff",
        backgroundColor: "auto",
        borderRadius: 3,
      };
      //循环设置所有水平位置
      nprop.option.series[0].data.forEach((element) => {
        // let tOffsetCenter = [`${startX}%`, "80%"];
        // let dOffsetCenter = [`${startX}%`, "80%"];
        if (!element.title) element.title = {};
        element.title.offsetCenter = [`${startX}%`, "80%"];
        if (!element.detail) element.detail = {};
        element.detail.offsetCenter = [`${startX}%`, "90%"];
        startX = startX + 30;
      });
      chart.setOption(nprop.option);
    });
    return {
      chart,
    };
  },
});
</script>
