import { HubConnection, HubConnectionState, HubConnectionBuilder } from '@microsoft/signalr'
import { ElMessage } from "element-plus";
import request from '@/utils/request'
import { allSourceInfoType, homeInfoType, restResultType } from "@/models";
import moment from 'moment'


const baseUrl = request.getConfig().baseUrl;//服务器地址

//signalr Hub 链接信息
let wsConnection: HubConnection = new HubConnectionBuilder().withUrl(`${baseUrl}sourceInfoHub`).withAutomaticReconnect().build();//signalr 链接对象
let connectionMax = 5;//每次最大链接次数
export let stateChangeFun = [] as Function[];//状态改变事件


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
            activeStateChangeFun();
        } catch (err) {
            if (connectionMax == 0) {
                activeStateChangeFun();
                ElMessage.error(`建立websocket链接已达最大次数，请刷新页面.`);
                connectionMax = 5;
            } else {
                ElMessage.error(`建立websocket链接失败，两秒后开始重新链接,${err}`);
                connectionMax--;
                setTimeout(() => {
                    createConnection(successFun);
                }, 2000);
            }
        }
    } else if (wsConnection.state == HubConnectionState.Connecting) {
        setTimeout(() => {
            if (successFun) successFun();
        }, 1000);
    }
}

/**
 * websocket断开链接，重新链接事件
 */
wsConnection.onreconnecting(error => {
    activeStateChangeFun();
    console.error(error);
    ElMessage.error(`websocket断开链接，开始自动重连`);
});
/**
 * webSocket链接关闭事件
 */
wsConnection.onclose(error => {
    activeStateChangeFun();
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
    activeStateChangeFun();
    ElMessage.success(`websocket 重连成功！`);
});

/**
 * 激活状态转换事件
 */
function activeStateChangeFun() {
    stateChangeFun.forEach(scFun => {
        scFun(wsConnection.state);
    });
}

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
                    //ElMessage(`执行了${new Date().valueOf()}`);
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
 * 注册获取模拟器信息
 * @param receiveFun 接收消息回调,传入data
 * @returns 
 */
export function registerGetServerMsg(receiveFun: Function) {
    if (!receiveFun) {
        ElMessage.error("请传入接收消息回调");
        return;
    }
    if (wsConnection.state == HubConnectionState.Connected) {
        wsConnection.send("registerGetServerMsg", "receiveServerMsg").then(() => {
            ElMessage.success(`注册获取模拟器信息成功！`);
            wsConnection.off("receiveServerMsg");//移除之前的
            //处理服务器推送过来的数据
            wsConnection.on("receiveServerMsg", (res: restResultType) => {
                let { data, isPositive } = res;
                if (isPositive) {
                    // ElMessage(`执行了${new Date().valueOf()}`);
                    //console.log(`执行了${new Date().valueOf()}`);              
                    receiveFun(data);
                }
            })
        });
    } else {
        //ElMessage.error("当前webscoket未连接，请刷新页面");
        createConnection(() => { registerGetServerMsg(receiveFun); })
    }
}
