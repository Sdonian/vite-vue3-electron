import api from "@/api"
import { appsettingsInfoType, restResultType } from "@/models";
import { disposeFixedRestResult, checkServer } from '@/utils'
import { JsonHubProtocol } from "@microsoft/signalr";
import { ElMessage } from 'element-plus';
import { DeviceTypeEnum } from "@/enums/DeviceTypeEnum";



/**
 * 设备页面信息类型
 */
export interface serverSettingInfoType {
    serverOptions: any[];
    serverValue: string;
    activeName: string;
    formLoading: boolean;
    deviceTypesCheckbox: any[];
    formModel: appsettingsInfoType;

}

//获取模拟器配置次数
let getServerConfigCount = 0;

/**
 * 获取模拟器配置
 * @param deviceListQueryInfo 获取数据条件
 */
export function getServerConfig(info: serverSettingInfoType) {
    info.formLoading = true;
    if (checkServer(info.serverValue)) {
        disposeFixedRestResult(api.information.getServerConfig(info.serverValue), "获取模拟器配置",
            (restResult: restResultType) => {
                let appsettingsJsonStr = restResult.data as string;

                // pageList.list.forEach((data: clientViewInfoType) => {
                //     info.deviceList.push(data);
                // });
                //由于每次进入页面都需要缓存，读取时可能获取不到，所有需要多读取几次
                if (getServerConfigCount < 5 && !appsettingsJsonStr) {
                    getServerConfigCount++;
                    setTimeout(() => {
                        getServerConfig(info);
                    }, 1000);
                } else if (appsettingsJsonStr) {
                    let appSettings = JSON.parse(appsettingsJsonStr);
                    //form表单赋值
                    info.formModel = { ...appSettings.AppSettings };
                    info.deviceTypesCheckbox = [];
                    //设备类型赋值
                    for (const key in DeviceTypeEnum) {
                        info.deviceTypesCheckbox.push({
                            checked: info.formModel.DeviceTypes.includes(key),
                            value: key,
                            label: DeviceTypeEnum[key],
                        });
                    }
                    info.formLoading = false;
                } else {
                    info.formLoading = false;
                }
            }, () => {
                if (getServerConfigCount < 5) {
                    getServerConfigCount++;
                    setTimeout(() => {
                        getServerConfig(info);
                    }, 1000);
                } else {
                    info.formLoading = false;
                }
            });
    }
}

/**
 * 缓存模拟器配置
 * @param serverSettingInfoType 获取数据条件
 */
export function cacheServerConfig(info: serverSettingInfoType) {
    info.formLoading = true;
    if (checkServer(info.serverValue)) {
        disposeFixedRestResult(api.information.cacheServerConfig(info.serverValue), "缓存模拟器配置", (restResult: restResultType) => {
            ElMessage.info("缓存成功开始获取模拟器配置.");
            getServerConfigCount = 0;
            info.formLoading = false;
            getServerConfig(info);
        }, () => {
            info.formLoading = false;
        });
    }
}


/**
 * 保存当前配置
 * @param info 
 */
export function saveConfig(info: serverSettingInfoType) {
    if (checkServer(info.serverValue)) {
        //处理设备类型数据
        info.formModel.DeviceTypes = info.deviceTypesCheckbox.filter(type => type.checked).map(type => type.value);
        let serverAppsetting = JSON.stringify({ AppSettings: info.formModel });//生成appsetting字符串        
        //合成post数据
        let postInfo = {
            serverList: [info.serverValue],
            serverAppsetting
        }
        disposeFixedRestResult(api.information.saveServerConfig(postInfo), "保存当前配置", (restResult: restResultType) => {
            ElMessage.success(restResult.data);
            info.formLoading = false;
        }, () => {
            info.formLoading = false;
        });
    }
}
/**
 * 保存配置到所有
 * @param info 
 */
export function saveConfigAll(info: serverSettingInfoType) {
    if (checkServer(info.serverValue)) {
        //处理设备类型数据
        info.formModel.DeviceTypes = info.deviceTypesCheckbox.filter(type => type.checked).map(type => type.value);
        let serverAppsetting = JSON.stringify({ AppSettings: info.formModel });//生成appsetting字符串        
        //合成post数据
        let postInfo = {
            serverList: info.serverOptions.map(o => o.value),
            serverAppsetting
        }
        disposeFixedRestResult(api.information.saveServerConfig(postInfo), "保存当前配置", (restResult: restResultType) => {
            ElMessage.success(restResult.data);
            info.formLoading = false;
        }, () => {
            info.formLoading = false;
        });
    }
}
