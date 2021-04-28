import { createClientInfoType, restResultType, clientFlieInfoType, bindAgentInfoType } from '@/models'
import api from '@/api'
import { disposeFixedRestResult, urlEncode } from '@/utils'
import { ElMessage } from 'element-plus';
import moment from "moment";
import request from "@/utils/request"
import { Store } from 'vuex'
import { qprogress } from '@/utils/request'




export interface newDataInfoType {
    activeName: string;
    readTitle: string;
    readVisible: Boolean;
    readText: string;
    createClientModel: createClientInfoType;
    clientFileList: clientFlieInfoType[];
    bindAgentModel: bindAgentInfoType;
    agentGroups: any[];
    chooseVisible: Boolean;
    currentRow: any;
}


/**
 * 创建设备
 * @param info 
 */
export function createClient(info: createClientInfoType) {
    disposeFixedRestResult(api.information.createClient(info), "创建设备");
}

/**
 * 获取设备信息文件列表
 */
export function getClientFlieList(info: newDataInfoType) {
    disposeFixedRestResult(api.information.getClientFlieList(), "获取设备信息文件列表", (restResult: restResultType) => {
        let baseUrl = request.getConfig().baseUrl;
        let list = restResult.data.map(d => {
            d.createTime = moment(d.createTime).format("YYYY-MM-DD HH:mm:ss.SSS");
            d.downloadUrl = `${baseUrl}api/${d.downloadUrl}`;
            d.fileSize = d.fileSize;
            return d;
        });
        info.clientFileList = list;
    });
}
/**
 * 清理设备信息文件
 */
export function clearClientFlie(info: newDataInfoType) {
    disposeFixedRestResult(api.information.clearClientFlie(info.clientFileList.map(f => f.fileName)), "清理设备信息文件", (restResult: restResultType) => {
        getClientFlieList(info);
    });
}

/**
 * 获取设备信息文件文本
 */
export function getClientFileText(name: string, info: newDataInfoType) {
    disposeFixedRestResult(api.information.getClientFileText(name), "获取设备信息文件文本", (restResult: restResultType) => {
        info.readTitle = name;
        info.readText = restResult.data;
        info.readVisible = true;
    });
}

/**
 * 登录运营商获取token
 */
export function loginAgent(info: newDataInfoType, store: Store<any>, refresh: Boolean = false) {
    //判断cookie中的token是否过期，过期则获取不到
    if (!store.getters.agentToken || refresh) {
        let { agentPhone, agentPwd } = info.bindAgentModel;
        if (agentPhone && agentPwd) {
            qprogress.start();
            store.dispatch("setAgentPhone", agentPhone);
            //url拼接
            const paramStr = urlEncode({ password: agentPwd, company_id: 2, phone: agentPhone, type: 2 });
            //`https://agent-dev.wanzhuang-app.com/api/auth/agentLogin?password=${agentPwd}&company_id=2&phone=${agentPhone}&type=2`
            fetch(`${info.bindAgentModel.loginAgentUrl}?${paramStr}`)
                .then(response => response.json())
                .then(data => {
                    let { token, expire_at } = data.data;
                    store.dispatch("setAgentToken", { agentToken: token, expires: moment.unix(expire_at).toDate() });
                    info.bindAgentModel.agentAuthorization = token;
                    getDeviceGroups(info, store, refresh);
                })
                .catch(error => {
                    ElMessage.error(` 登录运营商获取token,${error}.`);
                }).finally(() => {
                    qprogress.finish();
                });
        }
    } else {
        info.bindAgentModel.agentAuthorization = store.getters.agentToken;
        getDeviceGroups(info, store, refresh);
    }
}


/**
 * 获取设备分组
 * @param info 
 */
export function getDeviceGroups(info: newDataInfoType, store: Store<any>, refresh: Boolean = false) {
    let { agentAuthorization, getGroupsUrl } = info.bindAgentModel;
    if (agentAuthorization && (!info.agentGroups || refresh)) {
        if (!getGroupsUrl) {
            ElMessage.error("获取设备分组地址不能为空.");
            return;
        }
        disposeFixedRestResult(api.information.getDeviceGroups(getGroupsUrl, agentAuthorization),
            "获取设备分组", (restResult: restResultType) => {
                let list = JSON.parse(restResult.data);
                info.agentGroups = list.data.list.map((m: { groupName: any; groupId: any; }) => {
                    return {
                        label: m.groupName,
                        value: m.groupId
                    };
                });
                info.bindAgentModel.agentGroupId = info.agentGroups[0].value;
                store.dispatch("setAgentGroups", info.agentGroups)
                store.dispatch("setAgentGroupId", info.bindAgentModel.agentGroupId)
            });
    }
}

/**
 * 刷新分组
 * @param info 
 * @param store 
 */
export function refreshGroups(info: newDataInfoType, store: Store<any>) {
    loginAgent(info, store, true);
}

/**
 * 选择设备编号
 * @param info 
 */

export function chooseDeviceNumber(info: newDataInfoType) {
    //let {agentGroupId,agentAuthorization,} =   info.bindAgentModel;
    if (!info.currentRow) {
        ElMessage.error("请先选择设备编号文件.");
        return;
    }
    disposeFixedRestResult(api.information.getClientFileText(info.currentRow.fileName), "选择设备编号", (restResult: restResultType) => {
        info.bindAgentModel.batchDeviceNum = restResult.data;
        info.chooseVisible = false;
    });
}

/**
 * 批量添加设备
 * @param info 
 */
export function batchAddDevice(info: newDataInfoType,) {
    const { agentAuthorization, agentGroupId, batchDeviceNum } = info.bindAgentModel;
    if (agentAuthorization && agentGroupId && batchDeviceNum) {
        
    } else {
        ElMessage.error("批量添加设备数据错误。");
    }
}

