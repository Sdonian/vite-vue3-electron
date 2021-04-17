
import { init, ECharts, use } from "echarts/core";
import { TooltipComponent } from "echarts/components";
import { GaugeChart, GaugeSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

export const initChart = (el: HTMLElement, option?: object): ECharts => {
    use([TooltipComponent, GaugeChart, CanvasRenderer]);
    const chart = init(el);
    chart.setOption({
        tooltip: {
            show: true
        },
        series: [
            {
                type: "gauge",
                progress: {
                    show: true,
                },
                anchor: {
                    show: true,
                    showAbove: true,
                    size: 18,
                    itemStyle: {
                        borderWidth: 5,
                    },
                },
                radius: '100%',
                title: {
                    offsetCenter: [0, '70%']
                },
                detail: {
                    valueAnimation: true,
                    formatter: "{value}",
                    fontSize: 20,
                    offsetCenter: [0, '90%']
                },
                data: [
                    {
                        value: 0,
                        splitNumber: 100
                    },
                ],
            },
        ],
    });
    return chart;
};