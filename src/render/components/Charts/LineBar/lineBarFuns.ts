
import { init, ECharts, use } from "echarts/core";
import {
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    DataZoomComponent
} from "echarts/components";
import { LineChart, BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import moment from 'moment'

export const initChart = (el: HTMLElement, option: any): ECharts => {
    use([TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, DataZoomComponent, BarChart, LineChart, CanvasRenderer]);
    const chart = init(el);
    chart.setOption(option);    
    return chart;
};