import request from '@/utils/request'
import { setMalfunctionsInfoType } from '@/models'

//获取故障信息
export function getMalfunctions() {
    return request.httpGet('settings/getMalfunctions');
}

/**
 * 设置故障
 * @param info 
 * @returns 
 */
export function setMalfunctions(info: setMalfunctionsInfoType) {
    return request.httpPost('settings/setMalfunctions', info);
}