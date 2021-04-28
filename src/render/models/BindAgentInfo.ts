export default interface BindAgentInfo {
    agentPhone: number;
    agentPwd: string;
    agentGroupId: number;
    agentAuthorization: string;
    batchDeviceNum: number[];
    batchId: string;
    getGroupsUrl: string;
    loginAgentUrl: string;
    batchAddDevice: string; 
}