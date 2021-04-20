import api from "@/api";
import { ElMessage } from "element-plus";
import { allSourceInfoType, homeInfoType, restResultType } from "@/models";
import { HubConnection, HubConnectionState, HubConnectionBuilder } from '@microsoft/signalr'
import moment from 'moment'
import request from '@/utils/request'

//const baseUrl = "http://localhost:5000/"
//const baseUrl = 'http://132.232.34.148/'
const baseUrl = request.getConfig().baseUrl;

//http方式获取所有资源信息
export function GetAllSourceInfo(info: homeInfoType) {
    api.sourceInfo.GetAllSourceInfo().then(
        (data) => {
            info.allSourceInfo = { ...data.data };
            CalcAllSourceInfo(info);
        },
        (error) => {
            console.log(error);
            ElMessage.error(error);
        }
    );
}
//计算所有资源
function CalcAllSourceInfo(info: homeInfoType) {
    let allInfo = info.allSourceInfo;
    //设备数据
    info.queueCountOption = {
        series: [{ max: allInfo.maxQueue, data: [{ value: allInfo.clientQueue }] }],
    };
    info.startCountOption = {
        series: [{ max: allInfo.maxQueue, data: [{ value: allInfo.startCount }] }],
    };
    info.bindCountOption = {
        series: [{ max: allInfo.startCount, data: [{ value: allInfo.bindCount }] }],
    };
    info.afOnlineCountOption = {
        series: [
            { max: allInfo.startCount, data: [{ value: allInfo.affirmOnlineCount }] },
        ],
    };
    //在线数据
    info.onlineCountOption = {
        series: [
            { max: allInfo.startCount, data: [{ value: allInfo.onlineCount }] },
        ],
    };
    info.offlineCountOption = {
        series: [
            { max: allInfo.startCount, data: [{ value: allInfo.offlineCount }] },
        ],
    };
    info.connectCountOption = {
        series: [
            { max: allInfo.startCount, data: [{ value: allInfo.connectCount }] },
        ],
    };
    info.settingCountOption = {
        series: [
            { max: allInfo.startCount, data: [{ value: allInfo.setingCount }] },
        ],
    };

    //充电数据    
    var axisData = moment(new Date()).format("HH:mm:ss");
    var data0 = info.chargeDataOption.series[0].data;
    var data1 = info.chargeDataOption.series[1].data;
    var data2 = info.chargeDataOption.series[2].data;
    var data3 = info.chargeDataOption.series[3].data;
    data0.shift();
    data0.push(allInfo.chargeDeviceCount);
    data1.shift();
    data1.push(allInfo.chargeChannelCount);
    data2.shift();
    data2.push(allInfo.orderQueueCount);
    data3.shift();
    data3.push(allInfo.awaitOrderCount);
    info.chargeDataOption.xAxis.data.shift();
    info.chargeDataOption.xAxis.data.push(axisData);

    // info.chargeCountOption = {
    //   series: [
    //     { max: allInfo.startCount, data: [{ value: allInfo.setingCount }] },
    //   ],
    // };
    // info.chargeChannelCountOption = {
    //   series: [
    //     { max: allInfo.channelCount, data: [{ value: allInfo.setingCount }] },
    //   ],
    // };
    // info.waitOrderCountOption = {
    //   series: [
    //     { max: allInfo.channelCount, data: [{ value: allInfo.setingCount }] },
    //   ],
    // };
    // info.afOrderCountOption = {
    //   series: [
    //     { max: allInfo.channelCount, data: [{ value: allInfo.setingCount }] },
    //   ],
    // };
}

//初始化充电数据option
export function InitChargeDataOption(info: homeInfoType) {
    let linebarLen = 30;
    //初始化
    info.chargeDataOption = {
        tooltip: {
            trigger: "axis",
        },
        xAxis: {
            type: "category",
            data: (function () {
                var now = new Date();
                var res = [];
                var len = linebarLen;
                while (len--) {
                    res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
                    now = new Date(now.valueOf() - 1000);
                }
                return res;
            })(),
        },
        yAxis: {
            type: "value",
        },
        legend: {
            data: ["充电设备", "充电通道", "待发送订单", "待确认订单"],
        },
        series: [
            {
                name: "充电设备",
                type: "line",
                label: { show: true },
                data: (function () {
                    var res = [];
                    var len = 0;
                    while (len < linebarLen) {
                        // res.push((Math.random() * 10 + 5).toFixed(1));
                        res.push(0);
                        len++;
                    }
                    return res;
                })(),
            },
            {
                name: "充电通道",
                type: "line",
                label: { show: true },
                data: (function () {
                    var res = [];
                    var len = 0;
                    while (len < linebarLen) {
                        // res.push((Math.random() * 10 + 5).toFixed(1));
                        res.push(0);
                        len++;
                    }
                    return res;
                })(),
            },
            {
                name: "待发送订单",
                type: "line",
                label: { show: true },
                data: (function () {
                    var res = [];
                    var len = 0;
                    while (len < linebarLen) {
                        // res.push((Math.random() * 10 + 5).toFixed(1));
                        res.push(0);
                        len++;
                    }
                    return res;
                })(),
            },
            {
                name: "待确认订单",
                type: "line",
                label: { show: true },
                // smooth: true,
                data: (function () {
                    var res = [];
                    var len = 0;
                    while (len < linebarLen) {
                        // res.push((Math.random() * 10 + 5).toFixed(1));
                        res.push(0);
                        len++;
                    }
                    return res;
                })(),
            },
        ],
    };
}

let wsConnection: HubConnection = new HubConnectionBuilder().withUrl(`${baseUrl}sourceInfoHub`).withAutomaticReconnect().build();//signalr 链接对象
let registerGetSourceInfoCount = 5;//webSocket启动次数，
let homeInfo: homeInfoType = null;//home页面的数据
//注册获取资源信息
export async function RegisterGetSourceInfo(info: homeInfoType) {
    //ElMessage.error(wsConnection.state);
    homeInfo = info;
    //判断是否实例化
    if (wsConnection.state == HubConnectionState.Disconnected) {
        //开始连接
        try {
            await wsConnection.start();
            //正常则开始注册绑定
            bindFun();
        } catch (err) {
            if (registerGetSourceInfoCount == 0) {
                ElMessage.error("注册获取资源信息启动多次失败，请刷新页面.");
            } else {
                console.log(err);
                ElMessage.error(`注册获取资源信息启动失败，两秒后开始重新链接,${err}`);
                registerGetSourceInfoCount--;
                setTimeout(() => {
                    RegisterGetSourceInfo(info);
                }, 2000);
            }
        }
    } else {
        console.log("判断链接状态");
        //判断链接状态
        if (wsConnection.state == HubConnectionState.Connected) {

        }
    }
}

//绑定事件方法
function bindFun() {
    wsConnection.send("registerGetSourceInfo", "receiveSourceInfo", 2).then(() => {
        ElMessage.success(`注册获取资源信息成功！`);
        wsConnection.off("receiveSourceInfo");//移除之前的
        //处理服务器推送过来的数据
        wsConnection.on("receiveSourceInfo", (res) => {
            let { data, isPositive } = JSON.parse(res) as restResultType;
            if (isPositive) {
                // ElMessage(`执行了${new Date().valueOf()}`);
                //console.log(`执行了${new Date().valueOf()}`);
                homeInfo.allSourceInfo = data;
                CalcAllSourceInfo(homeInfo);
            }
        })
    });
}

//webSocket断开重连
wsConnection.onreconnecting(error => {
    console.error(error);
    ElMessage.error(`获取资源信息链接断开，开始自动重连`);
});
//webSocket重连失败后
wsConnection.onclose(error => {
    console.error(error);
    ElMessage.error(`获取资源信息链接关闭`);
});
//webSocket重连成功后
wsConnection.onreconnected(() => {
    ElMessage.success(`获取资源信息重连成功，重新注册获取资源！`);
    //重新绑定一遍
    bindFun();
});