import { createClientInfoType, restResultType, clientFlieInfoType, bindAgentInfoType } from '@/models'
import api from '@/api'
import { disposeFixedRestResult, urlEncode } from '@/utils'
import { ElMessage } from 'element-plus';
import moment from "moment";
import request from "@/utils/request"
import { Store } from 'vuex'
import { qprogress } from '@/utils/request'
import stores from '@/store'
import store from '@/store';




export interface newDataInfoType {
    activeName: string;
}

export interface clientFileListInfoType {
    readTitle: string;
    readVisible: Boolean;
    readText: string;
    clientFileList: clientFlieInfoType[];
    selectRows: clientFlieInfoType[];
}

export interface bindAgentType {
    chooseVisible: Boolean;
    batchProg: number;
    batchStatus: string;
    autoRefresh: Boolean;
    agentGroups: any[];
    currentRow: any;
    progressLabel: string;
    bindAgentModel: bindAgentInfoType;
    clientFileList: clientFlieInfoType[];
}

// export interface newDataInfoType {
//     activeName: string;
//     readTitle: string;
//     readVisible: Boolean;
//     readText: string;
//     createClientModel: createClientInfoType;
//     clientFileList: clientFlieInfoType[];
//     bindAgentModel: bindAgentInfoType;
//     agentGroups: any[];
//     chooseVisible: Boolean;
//     currentRow: any;
//     batchProg: number;
//     batchStatus: string;
//     autoRefresh: Boolean;
//     selectRows: clientFlieInfoType[];
//     createConfigModel: any;
// }


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
export function getClientFlieList(info: clientFileListInfoType) {
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

export function getClientFiles() { return api.information.getClientFlieList(); }
/**
 * 清理设备信息文件
 */
export function clearClientFlie(info: clientFileListInfoType) {
    if (info.selectRows.length <= 0) {
        ElMessage.error("请先选择文件");
        return;
    }
    this.$confirm('此操作将永久删除文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        disposeFixedRestResult(api.information.clearClientFlie(info.selectRows.map(m => m.fileName)), "清理设备信息文件", (restResult: restResultType) => {
            getClientFlieList(info);
        });
    }).catch(() => {
    });

}


/**
 * 打包下载
 * @param info 
 */
export function zipDownload(info: clientFileListInfoType) {
    if (info.selectRows.length <= 0) {
        ElMessage.error("请先选择文件");
        return;
    }
    //const fileNames = info.selectRows.map(m => m.fileName);
    //, (restResult: restResultType) => {}
    disposeFixedRestResult(api.information.zipDownload(info.selectRows.map(m => m.fileName)), "打包下载", (restResult: restResultType) => {
        let baseUrl = request.getConfig().baseUrl;
        window.open(`${baseUrl}api/${restResult.data}`);
    });
}


/**
 * 获取设备信息文件文本
 */
export function getClientFileText(name: string, info: clientFileListInfoType) {
    disposeFixedRestResult(api.information.getClientFileText(name), "获取设备信息文件文本", (restResult: restResultType) => {
        info.readTitle = name;
        info.readText = restResult.data;
        info.readVisible = true;
    });
}

/**
 * 登录运营商获取token
 */
export function loginAgent(info: bindAgentType, store: Store<any>, refresh: Boolean = false) {
    //判断cookie中的token是否过期，过期则获取不到
    if (!store.getters.agentToken || refresh) {
        let { agentPhone, agentPwd, loginAgentUrl } = info.bindAgentModel;
        if (agentPhone && agentPwd) {
            qprogress.start();
            store.dispatch("setAgentLogin", { loginAgentUrl, agentPhone });
            //url拼接
            const paramStr = urlEncode({ password: agentPwd, company_id: 2, phone: agentPhone, type: 2 });
            //`https://agent-dev.wanzhuang-app.com/api/auth/agentLogin?password=${agentPwd}&company_id=2&phone=${agentPhone}&type=2`
            fetch(`${loginAgentUrl}?${paramStr}`)
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
export function getDeviceGroups(info: bindAgentType, store: Store<any>, refresh: Boolean = false) {
    let { agentAuthorization, getGroupsUrl } = info.bindAgentModel;
    if (agentAuthorization && (!info.agentGroups || refresh)) {
        if (!getGroupsUrl) {
            ElMessage.error("获取设备分组地址不能为空.");
            return;
        }
        store.dispatch("setGetGroupsUrl", getGroupsUrl);
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
export function refreshGroups(info: bindAgentType, store: Store<any>) {
    loginAgent(info, store, true);
}

/**
 * 选择设备编号
 * @param info 
 */

export function chooseDeviceNumber(info: bindAgentType) {
    //let {agentGroupId,agentAuthorization,} =   info.bindAgentModel;
    if (!info.currentRow) {
        ElMessage.error("请先选择设备编号文件.");
        return;
    }
    disposeFixedRestResult(api.information.getClientFileText(info.currentRow.fileName), "选择设备编号", (restResult: restResultType) => {
        info.bindAgentModel.batchDeviceNum = JSON.parse(restResult.data);
        info.chooseVisible = false;
    });
}

/**
 * 选择ImeiChipid
 * @param info 
 */

 export function chooseImeiChipid(info:any) {
    //let {agentGroupId,agentAuthorization,} =   info.bindAgentModel;
    if (!info.currentRow) {
        ElMessage.error("请先选择imeiChipid文件.");
        return;
    }
    disposeFixedRestResult(api.information.getClientFileText(info.currentRow.fileName), "选择imeiChipid", (restResult: restResultType) => {
        info.createConfigModel.imeiChipIds = restResult.data;
        info.chooseVisible = false;
    });
}


/**
 * 批量添加设备
 * @param info 
 */
export function batchAddDevice(info: bindAgentType,) {

    const { agentAuthorization, agentGroupId, batchDeviceNum, batchAddDeviceUrl } = info.bindAgentModel;
    if (agentAuthorization && agentGroupId && batchDeviceNum && batchAddDeviceUrl) {
        store.dispatch("setBatchAddDeviceUrl", batchAddDeviceUrl);
        disposeFixedRestResult(api.information.batchAddDevice({
            url: batchAddDeviceUrl,
            batchDeviceNum: batchDeviceNum.join(),
            groupId: agentGroupId,
            token: agentAuthorization
        }), "批量添加设备", (restResult: restResultType) => {
            //console.log(restResult);
            info.bindAgentModel.batchId = JSON.parse(restResult.data).data.batch_id;
            stores.dispatch("setBatchId", info.bindAgentModel.batchId);
            //保存当前批处理的设备总数
            localStorage.setItem(info.bindAgentModel.batchId, batchDeviceNum.length.toString());
            ElMessage.success("操作成功，后台添加中!");
        });
        //初始化fromdata
        //  const bodyData = new FormData();
        //  bodyData.append("batch_device_num", batchDeviceNum.join());
        //  bodyData.append("group_id", agentGroupId.toString()); 
        //fetch提交数据
        // fetch(batchAddDeviceUrl, {
        //     headers: {
        //         "authorization": `Bearer ${agentAuthorization}`,
        //         "content-type": "multipart/form-data"
        //     },
        //     method: "POST",
        //     body: bodyData
        // }).then(response => response.json()).then(result => {
        //     debugger;
        // }).catch(error => {
        //     console.log(error);
        //     ElMessage.error(`批量添加设备,${error.message}`);
        // });
    } else {
        ElMessage.error("批量添加设备参数错误。");
    }
}

/**
 * 查看批量添加进度
 * @param info 
 */
export function batchAddDeviceCheck(info: bindAgentType) {
    const { agentAuthorization, agentGroupId, batchAddDeviceUrl, batchId } = info.bindAgentModel;
    //查询当前批次保存的总数
    const batchTotal = localStorage.getItem(batchId);
    if (!batchTotal) {
        ElMessage.error("无法查询到当前批次添加的总数.");
        return;
    }
    if (agentAuthorization && agentGroupId && batchAddDeviceUrl && batchId) {
        disposeFixedRestResult(api.information.batchAddDevice({
            url: batchAddDeviceUrl,
            batchDeviceNum: '18900000',
            groupId: agentGroupId,
            token: agentAuthorization,
            batchId
        }), "查看批量添加进度", (restResult: restResultType) => {
            const batchTotal = localStorage.getItem(batchId);
            if (batchTotal) {
                const data = JSON.parse(restResult.data).data;
                const finishTotal = parseInt(data.success_num) + parseInt(data.failed_num);
                info.batchProg = parseFloat((finishTotal / parseInt(batchTotal) * 100).toFixed(2));
                info.batchStatus = info.batchProg == 100 ? "success" : "";
                info.progressLabel = `成功:${data.success_num}/失败:${data.failed_num}  进度`;
                if (info.batchProg == 100) {
                    info.batchStatus = "success";
                    ElMessage.success("批量添加已经完成.");
                } else {
                    info.batchStatus = "";
                    if (info.autoRefresh) setTimeout(() => { batchAddDeviceCheck(info) }, 2000);
                }

            }
        });
    } else {
        ElMessage.error("查看批量添加进度参数错误。");
    }
}
