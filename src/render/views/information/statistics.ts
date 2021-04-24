import api from "@/api"
import { timeDataInfoType, restResultType, clientViewInfoType, pageListInfoType } from "@/models";
import { disposeFixedRestResult, checkServer } from '@/utils'
import { ElMessage } from 'element-plus';
import { nextTick } from 'vue'
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
import { initListener } from "@/components/Charts/mixins/resize";


/**
 * 设备页面信息类型
 */
export interface statisticsInfoType {
    serverOptions: any[];
    serverValue: string;
    dataLoading: Boolean;
    timeData: timeDataInfoType;
}

//获取设备列表次数
let getTimeDataCount = 0;

/**
 * 获取统计时间数据
 * @param deviceListQueryInfo 获取数据条件
 */
export function getTimeData(info: statisticsInfoType) {
    info.dataLoading = true;
    if (checkServer(info.serverValue)) {
        disposeFixedRestResult(api.information.getTimeData(info.serverValue), "获取统计时间数据", (restResult: restResultType) => {
            //由于每次进入页面都需要缓存，读取时可能获取不到，所有需要多读取几次
            if (getTimeDataCount < 5 && !restResult.data) {
                getTimeDataCount++;
                setTimeout(() => {
                    getTimeData(info);
                }, 1000);
            } else {
                info.timeData = JSON.parse(restResult.data);
                info.dataLoading = false;
                initEChart(info);

            }
        }, () => {
            if (getTimeDataCount < 5) {
                getTimeDataCount++;
                setTimeout(() => {
                    getTimeData(info);
                }, 1000);
            } else {
                info.dataLoading = false;
            }
        });
    }
}

/**
 * 缓存统计时间数据
 * @param deviceListQueryInfo 获取数据条件
 */
export function cacheTimeData(info: statisticsInfoType) {
    info.dataLoading = true;
    getTimeDataCount = 0;
    if (checkServer(info.serverValue)) {
        disposeFixedRestResult(api.information.cacheTimeData(info.serverValue), "缓存统计时间数据", (restResult: restResultType) => {
            ElMessage.info("缓存成功开始获取统计时间数据.");
            getTimeDataCount = 0;
            info.dataLoading = false;
            getTimeData(info);
        }, () => {
            info.dataLoading = false;
        });
    }
}

/**
 * 初始化图表
 */
function initEChart(info: statisticsInfoType) {
    nextTick(() => {
        use([TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, DataZoomComponent, BarChart, LineChart, CanvasRenderer]);
        let chartOptions = {
            title: {
                left: 'center',
                text: '设备绑定耗时',
                top: 10
            },
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 100
            }, {
                start: 0,
                end: 100
            }],
            xAxis: {
                type: 'category',
                data: info.timeData.devNumTime
                //data: []
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                type: 'line',
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                },
                markLine: {
                    data: [
                        { type: 'average', name: '平均值', label: { formatter: '平均值：{c}' } },
                        [{
                            symbol: 'none',
                            x: '90%',
                            yAxis: 'max'
                        }, {
                            symbol: 'circle',
                            label: {
                                position: 'start',
                                formatter: '最大值：{c}'
                            },
                            type: 'max',
                            name: '最高点'
                        }],
                        [{
                            symbol: 'none',
                            x: '90%',
                            yAxis: 'min'
                        }, {
                            symbol: 'circle',
                            label: {
                                position: 'start',
                                formatter: '最小值：{c}'
                            },
                            type: 'min',
                            name: '最高点'
                        }]
                    ]
                },
                data: info.timeData.devNumElapsed
            }]
        };
        //设备绑定耗时
        var devNumElapsedChart = init(document.getElementById('devNumElapsed'));
        devNumElapsedChart.setOption(chartOptions);
        initListener(devNumElapsedChart);
        //上线耗时
        var onlineElapsedChart = init(document.getElementById('onlineElapsed'));
        chartOptions.title.text = "上线耗时";
        chartOptions.xAxis.data = info.timeData.onlineTime;
        chartOptions.series[0].data = info.timeData.onlineElapsed;
        onlineElapsedChart.setOption(chartOptions);
        initListener(onlineElapsedChart);
        //同步耗时
        var syncElapsedChart = init(document.getElementById('syncElapsed'));
        chartOptions.title.text = "同步耗时";
        chartOptions.xAxis.data = info.timeData.syncTime;
        chartOptions.series[0].data = info.timeData.syncElapsed;
        syncElapsedChart.setOption(chartOptions);
        initListener(syncElapsedChart);
        //充电Http响应耗时
        var playChargeElapsedChart = init(document.getElementById('playChargeElapsed'));
        chartOptions.title.text = "充电Http响应耗时";
        chartOptions.xAxis.data = info.timeData.playChargeTime;
        chartOptions.series[0].data = info.timeData.playChargeElapsed;
        playChargeElapsedChart.setOption(chartOptions);
        initListener(playChargeElapsedChart);
        //充电指令耗时
        var amPlayChargeElapsedChart = init(document.getElementById('amPlayChargeElapsed'));
        chartOptions.title.text = "充电完整指令耗时";
        chartOptions.series[0].data = info.timeData.amPlayChargeElapsed;
        amPlayChargeElapsedChart.setOption(chartOptions);
        initListener(amPlayChargeElapsedChart);
        //qps
        var qpsChart = init(document.getElementById('qps'));
        chartOptions.title.text = "并发量";
        chartOptions.xAxis.data = info.timeData.qpsTime;
        chartOptions.series[0].data = info.timeData.qpsSum;
        qpsChart.setOption(chartOptions);
        initListener(qpsChart);
        //sendData
        var sendDataChart = init(document.getElementById('sendData'));
        chartOptions.title.text = "处理量";
        chartOptions.xAxis.data = info.timeData.sendTime;
        chartOptions.series[0].data = info.timeData.sendSum;
        sendDataChart.setOption(chartOptions);
        initListener(sendDataChart);

    });
}
