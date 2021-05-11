import api from '@/api'
import { restResultType } from "@/models";
import { disposeFixedRestResult } from '@/utils';
import { ElMessage } from 'element-plus'
import { MalfunctionTypeEnum } from '@/enums/MalfunctionTypeEnum'
/**
 * 获取故障
 */
export function getMalfunctions(info) {
    api.settings.getMalfunctions().then((restResult: restResultType) => {
        if (restResult.isPositive) {
            for (const key in MalfunctionTypeEnum) {
                info.malfList.push({
                    name: MalfunctionTypeEnum[key],
                    value: key,
                    operBtnText:"全选",
                    serversList: info.serversList.map(m => {
                        return {
                            servers: m,
                            checked: false
                        };
                    })
                });
            }
        } else {
            ElMessage.error(restResult.errorMsg)
        }
    }, error => {
        ElMessage.error(`获取故障信息错误${error.message}`)
    });
}

/**
 * 获取模拟器信息
 */
export function getServerList(info: any) {
    disposeFixedRestResult(api.manager.serverList(), "获取模拟器信息错误", (restResult: restResultType) => {
        //info.serversList = [];
        info.serversList.length = 0;
        restResult.data.forEach((data: string) => {
            info.serversList.push(data);           
        });
        getMalfunctions(info);
    });
}