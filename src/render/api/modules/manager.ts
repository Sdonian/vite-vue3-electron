import request from '@/utils/request'
import { startDeviceInfoType, payChargeInfoType, timingOfflineInfoType } from "@/models";

/**
 * 启动设备，携带间隔时间则为定时启动
 * @param data 启动设备数量和间隔
 * @returns request Promise 
 */
export function startDevice(data: startDeviceInfoType): Promise<any> {
    return request.httpPost('manager/startDevice', data);
}

/**
 * 模拟器列表
 * @returns request Promise 
 */
export function serverList(): Promise<any> {
    return request.httpGet('manager/serverList');
}
/**
 * 重启模拟器
 * @param serverList 模拟器
 * @returns request Promise 
 */
export function restartServer(serverList: string[]): Promise<any> {
    return request.httpPost('manager/restartServer', serverList);
}
/**
 * 停止启动
 * @param serverList 模拟器
 * @returns request Promise 
 */
export function stopStart(serverList: string[]): Promise<any> {
    return request.httpPost('manager/stopStart', serverList);
}

/**
 * 停止充电
 * @param serverList 模拟器
 * @returns request Promise 
 */
export function stopCharge(serverList: string[]): Promise<any> {
    return request.httpPost('manager/stopCharge', serverList);
}

/**
 * 清理数据/日志
 * @param serverList 模拟器
 * @returns request Promise 
 */
export function clearDataLog(serverList: string[]): Promise<any> {
    return request.httpPost('manager/clearDataLog', serverList);
}
/**
 * 取消定时下线
 * @param serverList 模拟器
 * @returns request Promise 
 */
export function cancelTimingOffline(serverList: string[]): Promise<any> {
    return request.httpPost('manager/cancelTimingOffline', serverList);
}

/**
 * 取消定时支付
 * @param serverList 模拟器
 * @returns request Promise 
 */
export function cancelTimePay(serverList: string[]): Promise<any> {
    return request.httpPost('manager/cancelTimePay', serverList);
}

/**
 * 定时下线
 * @param data 数据
 * @returns request Promise 
 */
export function timingOffline(data: timingOfflineInfoType): Promise<any> {
    return request.httpPost('manager/timingOffline', data);
}

/**
 * 支付充电
 * @param data 数据
 * @returns request Promise 
 */
export function payCharge(data: payChargeInfoType): Promise<any> {
    return request.httpPost('manager/payCharge', data);
}


/**
 * 设备绑定
 * @param serverList 模拟器
 * @returns request Promise 
 */
export function deviceBind(serverList: string[]): Promise<any> {
    return request.httpPost('manager/deviceBind', serverList);
}

/**
 * 设备上线
 * @param serverList 模拟器
 * @returns request Promise 
 */
export function deviceOnline(serverList: string[]): Promise<any> {
    return request.httpPost('manager/deviceOnline', serverList);
}


/**
 * 自动运行
 * @param data 数据
 * @returns request Promise 
 */
export function autoRun(serverList: string[]): Promise<any> {
    return request.httpPost('manager/autoRun', serverList);
}


/**
 * 取消自动运行
 * @param serverList 模拟器
 * @returns request Promise 
 */
export function cancelAutoRun(serverList: string[]): Promise<any> {
    return request.httpPost('manager/cancelAutoRun', serverList);
}

/**
 * 保存同步设置
 * @param serverList 模拟器
 * @returns request Promise 
 */
export function saveSettings(serverList: string[]): Promise<any> {
    return request.httpPost('manager/saveSettings', serverList);
}
