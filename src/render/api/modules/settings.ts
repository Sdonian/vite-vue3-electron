import request from '@/utils/request'

//获取故障信息
export function getMalfunctions() {
    return request.httpGet('settings/getMalfunctions');
}