import { HubConnection, HubConnectionState, HubConnectionBuilder } from '@microsoft/signalr'
import { ElMessage } from "element-plus";
import request from '@/utils/request'
import { allSourceInfoType, homeInfoType, restResultType } from "@/models";
import moment from 'moment'


const baseUrl = request.getConfig().baseUrl;//服务器地址

//signalr Hub 链接信息
let wsConnection: HubConnection = new HubConnectionBuilder().withUrl(`${baseUrl}sourceInfoHub`).withAutomaticReconnect().build();//signalr 链接对象
let connectionMax = 5;//每次最大链接次数

/**
 * 建立链接
 * @param successFun 链接成功后回调
 */
export async function createConnection(successFun?: Function) {
    //判断是否断开状态
    if (wsConnection.state == HubConnectionState.Disconnected) {

        try {
            await wsConnection.start();
            if (successFun) successFun();
            //重连次数重置
            connectionMax = 5;
        } catch (err) {
            if (connectionMax == 0) {
                ElMessage.error(`建立websocket链接已达最大${connectionMax}次，请刷新页面.`);
                connectionMax = 5;
            } else {
                ElMessage.error(`建立websocket链接失败，两秒后开始重新链接,${err}`);
                connectionMax--;
                setTimeout(() => {
                    createConnection(successFun);
                }, 2000);
            }
        }
    }
}

/**
 * websocket断开链接，重新链接事件
 */
wsConnection.onreconnecting(error => {
    console.error(error);
    ElMessage.error(`websocket断开链接，开始自动重连`);
});
/**
 * webSocket链接关闭事件
 */
wsConnection.onclose(error => {
    console.error(error);
    ElMessage({
        message: `webSocket链接关闭`,
        type: "error",
        duration: 0,
        showClose: true
    });
});
/**
 * websocket 重连成功事件
 */
wsConnection.onreconnected(() => {
    ElMessage.success(`websocket 重连成功！`);
});


/**
 * 注册获取资源信息
 * @param receiveFun 接收消息回调,传入data
 */
export function registerGetSourceInfo(receiveFun: Function) {
    if (!receiveFun) {
        ElMessage.error("请传入接收消息回调");
        return;
    }
    if (wsConnection.state == HubConnectionState.Connected) {
        wsConnection.send("registerGetSourceInfo", "receiveSourceInfo", 2).then(() => {
            ElMessage.success(`注册获取资源信息成功！`);
            wsConnection.off("receiveSourceInfo");//移除之前的
            //处理服务器推送过来的数据
            wsConnection.on("receiveSourceInfo", (res) => {
                let { data, isPositive } = JSON.parse(res) as restResultType;
                if (isPositive) {
                    // ElMessage(`执行了${new Date().valueOf()}`);
                    //console.log(`执行了${new Date().valueOf()}`);              
                    receiveFun(data);
                }
            })
        });
    } else {
        //ElMessage.error("当前webscoket未连接，请刷新页面");
        createConnection(() => { registerGetSourceInfo(receiveFun); })
    }
}

/**
 * 计算所有资源信息
 * @param info 首页信息集合
 */
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
}


