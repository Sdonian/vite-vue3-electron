import api from "@/api";
import { restResultType } from "@/models";
import { disposeFixedRestResult, checkServer } from '@/utils'



/**
 * 获取服务器选项
 * @param serverOptions 下拉框options对象
 * @param serverValue 下拉框存储的值
 *  @param multiple 是否多选
 */
export function getServerOptions(serverOptions: any[], serverValue: string[] = null): void {
    if (serverValue != null) serverValue.splice(0, serverValue.length);
    disposeFixedRestResult(api.manager.serverList(), "获取模拟器信息错误", (restResult: restResultType) => {
        serverOptions.splice(0,serverOptions.length);
        restResult.data.forEach((data: string) => {
            serverOptions.push({
                value: data,
                label: data,
            });
            if (serverValue != null) serverValue.push(data);
        });
    });
}

//重启服务
export function restartSysServer(serverValue: string[]): void {
    if (checkServer(serverValue)) {
        disposeFixedRestResult(api.manager.restartServer(serverValue), "重启服务错误");
    }
}

//停止启动
export function stopStart(serverValue: string[]): void {
    if (checkServer(serverValue)) {
        disposeFixedRestResult(api.manager.stopStart(serverValue), "停止启动错误");
    }
}

//取消定时支付
export function cancelTimePay(serverValue: string[]): void {
    if (checkServer(serverValue)) {
        disposeFixedRestResult(api.manager.cancelTimePay(serverValue), "取消定时支付");
    }
}

//取消定时下线
export function cancelTimingOffline(serverValue: string[]): void {
    if (checkServer(serverValue)) {
        disposeFixedRestResult(api.manager.cancelTimingOffline(serverValue), "取消定时下线");
    }
}

//停止充电
export function stopCharge(serverValue: string[]): void {
    if (checkServer(serverValue)) {
        disposeFixedRestResult(api.manager.stopCharge(serverValue), "停止充电错误");
    }
}

//清理数据/日志
export function clearDataLog(serverValue: string[]): void {
    if (checkServer(serverValue)) {
        disposeFixedRestResult(api.manager.clearDataLog(serverValue), "清理数据/日志");
    }
}

//设备绑定
export function deviceBind(serverValue: string[]): void {
    if (checkServer(serverValue)) {
        disposeFixedRestResult(api.manager.deviceBind(serverValue), "设备绑定");
    }
}

//设备上线
export function deviceOnline(serverValue: string[]): void {
    if (checkServer(serverValue)) {
        disposeFixedRestResult(api.manager.deviceOnline(serverValue), "设备上线");
    }
}
//自动运行
export function autoRun(serverValue: string[]): void {
    if (checkServer(serverValue)) {
        disposeFixedRestResult(api.manager.autoRun(serverValue), "自动运行");
    }
}
//取消自动运行
export function cancelAutoRun(serverValue: string[]): void {
    if (checkServer(serverValue)) {
        disposeFixedRestResult(api.manager.cancelAutoRun(serverValue), "取消自动运行");
    }
}
//保存同步设置
export function saveSettings(serverValue: string[]): void {
    if (checkServer(serverValue)) {
        disposeFixedRestResult(api.manager.saveSettings(serverValue), "保存同步设置");
    }
}


