import api from "@/api"
import { appsettingsInfoType, restResultType } from "@/models";
import { disposeFixedRestResult, checkServer } from '@/utils'
import { ElMessage } from 'element-plus';



/**
 * 设备页面信息类型
 */
export interface serverSettingInfoType {
    serverOptions: any[];
    serverValue: string;
    activeName: string;
    formLoading:boolean;
    formModel: appsettingsInfoType;

}

//获取模拟器配置次数
let getDeviceListCount = 0;

/**
 * 获取模拟器配置
 * @param deviceListQueryInfo 获取数据条件
 */
export function getDeviceList(info: serverSettingInfoType) {
    info.formLoading = true;
    if (checkServer(info.serverValue)) {
        disposeFixedRestResult(api.information.getServerConfig(info.serverValue), "获取模拟器配置",
            (restResult: restResultType) => {
                let appsettingsJsonStr = restResult.data as string;

                // pageList.list.forEach((data: clientViewInfoType) => {
                //     info.deviceList.push(data);
                // });
                //由于每次进入页面都需要缓存，读取时可能获取不到，所有需要多读取几次
                if (getDeviceListCount < 5 && appsettingsJsonStr.length <= 0) {
                    getDeviceListCount++;
                    setTimeout(() => {
                        getDeviceList(info);
                    }, 1000);
                } else {
                    
                    info.formLoading = false;
                }
            }, () => {
                if (getDeviceListCount < 5) {
                    getDeviceListCount++;
                    setTimeout(() => {
                        getDeviceList(info);
                    }, 1000);
                } else {
                    info.formLoading = false;
                }
            });
    }
}

/**
 * 缓存模拟器配置
 * @param deviceListQueryInfo 获取数据条件
 */
export function cacheDeviceList(info: serverSettingInfoType) {
    info.formLoading = true;
    if (checkServer(info.serverValue)) {
        disposeFixedRestResult(api.information.cacheServerConfig(info.serverValue), "缓存模拟器配置", (restResult: restResultType) => {
            ElMessage.info("缓存成功开始获取设备列表.");
            getDeviceListCount = 0;
            info.formLoading = false;
            getDeviceList(info);
        }, () => {
            info.formLoading = false;
        });
    }
}
