interface gettersTypes {
    slider: string
}
const getters = {
    sidebar: (state: any) => state.app.sidebar,
    device: (state: any) => state.app.device,
    agentPhone: (state: any) => state.agentBind.agentPhone,
    agentToken: (state: any) => state.agentBind.agentToken,
    agentGroups: (state: any) => state.agentBind.agentGroups,
    agentGroupId: (state: any) => state.agentBind.agentGroupId,
    bindBtachId: (state: any) => state.agentBind.batchId,
}

export default getters;