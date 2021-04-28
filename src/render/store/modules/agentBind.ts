import Cookies from 'js-cookie'
import { ActionContext, Commit } from 'vuex/types/index.d';

interface stateType {
    agentPhone: number;
    agentToken: string;
    agentGroups: string[];
    agentGroupId: number;
    batchId: string;
}

const state: stateType = {
    agentPhone: parseInt(localStorage.getItem("agentPhone") ?? "18626226142"),
    agentToken: Cookies.get("agentToken") ?? "",
    agentGroups: JSON.parse(localStorage.getItem("agentGroups") ?? null),
    agentGroupId: parseInt(localStorage.getItem("agentGroupId") ?? null),
    batchId: localStorage.getItem("batchId"),
}

const mutations = {
    SET_AGENTPHONE: (state: stateType, agentPhone: number) => {
        state.agentPhone = agentPhone;
        localStorage.setItem("agentPhone", state.agentPhone.toString());
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
    setAgentPhone({ commit }: acType, agentPhone: number) {
        commit("SET_AGENTPHONE", agentPhone);
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
    }
}

export default {
    namespace: true,
    state,
    mutations,
    actions
}