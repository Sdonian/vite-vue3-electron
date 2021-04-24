import request from '@/utils/request'
import { deviceListQueryInfoType, createClientInfoType } from "@/models";

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

/**
 * 缓存模拟器配置信息
 * @param serverId 模拟器Id
 * @returns request Promise 
 */
export function cacheServerConfig(serverId: string): Promise<any> {
    return request.httpGet('information/cacheServerConfig', { serverId });
}

/**
 * 获取模拟器配置信息
 * @param serverId 模拟器Id
 * @returns request Promise 
 */
export function getServerConfig(serverId: string): Promise<any> {
    return request.httpGet('information/getServerConfig', { serverId });
}

/**
 * 保存模拟器配置信息
 * @param  info  {serverList:string[],jsonStr:string}
 * @returns request Promise 
 */
export function saveServerConfig(info: any): Promise<any> {
    return request.httpPost('information/saveServerConfig', info);
}

/**
 * 创建设备数据
 * @param  info  
 * @returns request Promise 
 */
export function createClient(info: createClientInfoType): Promise<any> {
    return request.httpPost('information/createClient', info);
}


/**
 * 缓存统计时间数据
 * @param serverId 模拟器Id
 * @returns request Promise 
 */
export function cacheTimeData(serverId: string): Promise<any> {
    return request.httpGet('information/cacheTimeData', { serverId });
}

/**
 * 获取统计时间数据
 * @param serverId 模拟器Id
 * @returns request Promise 
 */
export function getTimeData(serverId: string): Promise<any> {
    return request.httpGet('information/getTimeData', { serverId });
}

