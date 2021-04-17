import api from "@/api"
import { deviceListQueryInfoType, restResultType, clientViewInfoType } from "@/models";
import { disposeFixedRestResult, checkServer } from '@/utils'

export interface deviceInfoType {
    deviceListQuery: deviceListQueryInfoType;
    tableLoading: boolean;
    deviceList: any[] | clientViewInfoType[];
    serverOptions: any[];
    serverValue: string;
}

export function CacheDeviceList() {

}

/**
 * 获取设备列表
 * @param deviceListQueryInfo 获取数据条件
 */
export function getDeviceList(info: deviceInfoType) {
    if (checkServer(info.deviceListQuery.serverId)) {
        disposeFixedRestResult(api.information.getDeviceList(info.deviceListQuery), "获取设备列表错误", (restResult: restResultType) => {
            restResult.data.forEach((data: any) => {                
                info.deviceList.push(data);
            });
            info.tableLoading = false;
        });
    }
}