import Cookies from 'js-cookie'
import { ActionContext, Commit } from 'vuex/types/index.d';

interface stateType {
    agentPhone: string;
    agentToken: string;
    agentGroups: string[];
    agentGroupId: number;
    batchId: string;
    loginAgentUrl: string;
    getGroupsUrl: string;
    batchAddDeviceUrl: string;
}

const state: stateType = {
    agentPhone: localStorage.getItem("agentPhone"),
    agentToken: Cookies.get("agentToken") ?? null,
    agentGroups: JSON.parse(localStorage.getItem("agentGroups")),
    agentGroupId: localStorage.getItem("agentGroupId") ? parseInt(localStorage.getItem("agentGroupId")) : null,
    batchId: localStorage.getItem("batchId"),
    loginAgentUrl: localStorage.getItem("loginAgentUrl"),
    getGroupsUrl: localStorage.getItem("getGroupsUrl"),
    batchAddDeviceUrl: localStorage.getItem("batchAddDeviceUrl")
}

const mutations = {
    SET_GETGROUPSURL: (state: stateType, getGroupsUrl: string) => {
        state.getGroupsUrl = getGroupsUrl;
        localStorage.setItem("getGroupsUrl", state.getGroupsUrl);
    },
    SET_BATCHADDDEVICEURL: (state: stateType, batchAddDeviceUrl: string) => {
        state.batchAddDeviceUrl = batchAddDeviceUrl;
        localStorage.setItem("batchAddDeviceUrl", state.batchAddDeviceUrl);
    },
    SET_AGENTLOGIN: (state: stateType, { loginAgentUrl, agentPhone }) => {
        state.agentPhone = agentPhone;
        state.loginAgentUrl = loginAgentUrl;
        localStorage.setItem("agentPhone", state.agentPhone);
        localStorage.setItem("loginAgentUrl", state.loginAgentUrl);
    },
    SET_AGENTTOKEN: (state: stateType, { agentToken, expires }: { agentToken: string, expires: number | Date }) => {
        state.agentToken = agentToken;
        // localStorage.setItem("agentToken", state.agentToken);
        Cookies.set("agentToken", state.agentToken, { expires: expires })
    },
    SET_AGENTGROUPS: (state: stateType, agentGroups: string[]) => {
        state.agentGroups = agentGroups;
        localStorage.setItem("agentGroups", JSON.stringify(state.agentGroups));
    },
    SET_AGENTGROUPID: (state: stateType, agentGroupId: number) => {
        state.agentGroupId = agentGroupId;
        localStorage.setItem("agentGroupId", state.agentGroupId.toString());
    },
    SET_BATCHID: (state: stateType, batchId: string) => {
        state.batchId = batchId;
        localStorage.setItem("batchId", state.batchId);
    }
}

interface acType {
    commit: Commit
}

const actions = {
    setAgentLogin({ commit }: acType, data: { loginAgentUrl: string, agentPhone: string }) {
        commit("SET_AGENTLOGIN", data);
    },
    setAgentToken({ commit }: acType, data: { agentToken: string, expires: number | Date }) {
        commit("SET_AGENTTOKEN", data);
    },
    setAgentGroups({ commit }: acType, agentGroups: string[]) {
        commit("SET_AGENTGROUPS", agentGroups);
    },
    setAgentGroupId({ commit }: acType, agentGroupId: number) {
        commit("SET_AGENTGROUPID", agentGroupId);
    },
    setBatchId({ commit }: acType, batchId: string) {
        commit("SET_BATCHID", batchId);
    },
    setBatchAddDeviceUrl({ commit }: acType, batchAddDeviceUrl: string) {
        commit("SET_BATCHADDDEVICEURL", batchAddDeviceUrl);
    },
    setGetGroupsUrl({ commit }: acType, getGroupsUrl: string) {
        commit("SET_GETGROUPSURL", getGroupsUrl);
    }

}

export default {
    namespace: true,
    state,
    mutations,
    actions
}