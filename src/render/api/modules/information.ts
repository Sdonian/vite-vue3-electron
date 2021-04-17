import request from '@/utils/request'
import { deviceListQueryInfoType } from "@/models";

/**
 * 缓存设备列表
 * @param serverId 模拟器Id
 * @returns request Promise 
 */
export function cacheDeviceList(serverId: string): Promise<any> {
    return request.httpGet('information/cacheDeviceList', { serverId });
}

/**
 * 获取设备列表
 * @param deviceListQueryInfo 获取数据条件
 * @returns request Promise 
 */
export function getDeviceList(deviceListQueryInfo: deviceListQueryInfoType): Promise<any> {
    return request.httpPost('information/getDeviceList', deviceListQueryInfo);
}