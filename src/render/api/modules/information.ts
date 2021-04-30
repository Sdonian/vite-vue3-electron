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

/**
 * 获取设备信息文件列表
 * @returns request Promise 
 */
export function getClientFlieList(): Promise<any> {
    return request.httpGet('information/getClientFlieList');
}

/**
 * 清理设备信息文件
 * @param nameList 文件名list
 * @returns 
 */
export function clearClientFlie(nameList: string[]): Promise<any> {
    return request.httpPost('information/clearClientFlie', nameList);
}


/**
 * 获取设备信息文件文本
 * @param name 文件名
 * @returns 
 */
export function getClientFileText(name: string): Promise<any> {
    return request.httpGet('information/getClientFileText', { name });
}


/**
 * 获取设备分组
 * @param url 获取设备分组url
 * @param token 令牌
 * @returns 
 */
export function getDeviceGroups(url: string, token: string): Promise<any> {
    return request.httpGet('information/getDeviceGroups', { url, token });
}

/**
 * 批量添加设备
 * @param info 添加的信息
 * @returns 
 */
export function batchAddDevice(info): Promise<any> {
    return request.httpPost('information/batchAddDevice', info);
}

/**
 * 打包下载
 * @param fileNames  文件名集合
 * @returns 
 */
export function zipDownload(fileNames: string[]): Promise<any> {
    return request.httpPost('information/zipDownload', fileNames);
}