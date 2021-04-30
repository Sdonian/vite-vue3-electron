import api from "@/api"
import { deviceListQueryInfoType, restResultType, clientViewInfoType, pageListInfoType } from "@/models";
import { disposeFixedRestResult, checkServer } from '@/utils'
import { ElMessage } from 'element-plus';

let localDeviceList: clientViewInfoType[] = null;

/**
 * 设备页面信息类型
 */
export interface deviceInfoType {
    deviceListQuery: deviceListQueryInfoType;
    tableLoading: boolean;
    deviceList: any[] | clientViewInfoType[];
    serverOptions: any[];
    serverValue: string;
    pageSizes: number[];
    dataTotal: number;
}

//获取设备列表次数
let getDeviceListCount = 0;

/**
 * 获取设备列表
 * @param deviceListQueryInfo 获取数据条件
 */
export function getDeviceList(info: deviceInfoType) {
    info.tableLoading = true;
    if (checkServer(info.deviceListQuery.serverId)) {
        disposeFixedRestResult(api.information.getDeviceList(info.deviceListQuery), "获取设备列表错误", (restResult: restResultType) => {
            let pageList = restResult.data as pageListInfoType<clientViewInfoType>;
            info.dataTotal = pageList.total;
            info.deviceList = pageList.list.map(m => {
                let { VersionMain, VersionSub1, VersionSub2, VersionRc } = JSON.parse(m.softWareVer);
                m.softWareVer = `${VersionMain}.${VersionSub1}.${VersionSub2}.${VersionRc}`;
                return m;
            });
            // pageList.list.forEach((data: clientViewInfoType) => {
            //     info.deviceList.push(data);
            // });
            //由于每次进入页面都需要缓存，读取时可能获取不到，所有需要多读取几次
            if (getDeviceListCount < 5 && pageList.list.length <= 0) {
                getDeviceListCount++;
                setTimeout(() => {
                    getDeviceList(info);
                }, 1000);
            } else {
                info.tableLoading = false;
            }
        }, () => {
            if (getDeviceListCount < 5) {
                getDeviceListCount++;
                setTimeout(() => {
                    getDeviceList(info);
                }, 1000);
            } else {
                info.tableLoading = false;
            }
        });
    }
}

/**
 * 缓存设备列表
 * @param deviceListQueryInfo 获取数据条件
 */
export function cacheDeviceList(info: deviceInfoType) {
    info.tableLoading = true;
    getDeviceListCount = 0;
    if (checkServer(info.deviceListQuery.serverId)) {
        disposeFixedRestResult(api.information.cacheDeviceList(info.serverValue), "缓存设备列表错误", (restResult: restResultType) => {
            ElMessage.info("缓存成功开始获取设备列表.");
            getDeviceListCount = 0;
            info.tableLoading = false;
            getDeviceList(info);
        }, () => {
            info.tableLoading = false;
        });
    }
}

/**
 * 
 * @param info 
 */
export function handleQuery(info: deviceInfoType) {
    info.tableLoading = true;
    if (!localDeviceList) localDeviceList = info.deviceList;
    if (info.deviceListQuery.deviceNum) {
        info.deviceList = info.deviceList.filter((val: clientViewInfoType) => {
            return val.deviceNum == info.deviceListQuery.deviceNum;
        })
    } else {
        info.deviceList = localDeviceList;
    }
    info.tableLoading = false;
}