import { createClientInfoType, restResultType } from '@/models'
import api from '@/api'
import { disposeFixedRestResult } from '@/utils'
import { ElMessage } from 'element-plus';

/**
 * 创建设备
 * @param info 
 */
export function createClient(info: createClientInfoType) {
    disposeFixedRestResult(api.information.createClient(info), "创建设备", (restResult: restResultType) => {
        console.log(restResult);
        ElMessage.success(`创建设备完成，文件下载地址是：${restResult.data}`);
    });
}