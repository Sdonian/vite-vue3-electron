import api from '@/api'
import { restResultType } from "@/models";
import { disposeFixedRestResult } from '@/utils';

/**
 * 获取故障
 */
export function getMalfunctions() {
    api.settings.getMalfunctions().then((restResult: restResultType) => {

    }, error => {

    });
}

/**
 * 获取模拟器信息
 */
export function getServerList(info: any) {
    disposeFixedRestResult(api.manager.serverList(), "获取模拟器信息错误", (restResult: restResultType) => {
        info.serverList = [];
        restResult.data.forEach((data: string) => {
            info.serverList.push({
                servers: data,
                checked:false,
            });            
        });
    });
}