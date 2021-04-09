import request from '@/utils/request'

//获取所有资源信息
export function GetAllSourceInfo() {
    return request.httpGet('SourceInfo/allSourceInfo');
}