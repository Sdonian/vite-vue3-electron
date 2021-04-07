import Cookies from 'js-cookie'
import { ActionContext, Commit } from 'vuex/types/index.d';
interface stateType {
    sidebar: {
        opened: Boolean,
        withoutAnimation: Boolean
    },
    device: string
}

//app state
const state: stateType = {
    sidebar: {
        opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
        withoutAnimation: false
    },
    device: 'desktop'
}

const mutations = {
    TOGGLE_SIDEBAR: (state: stateType) => {
        state.sidebar.opened = !state.sidebar.opened;
        state.sidebar.withoutAnimation = false;
        if (state.sidebar.opened) {
            Cookies.set('sidebarStatus', "1")
        } else {
            Cookies.set('sidebarStatus', "0")
        }
    },
    CLOSE_SIDEBAR: (state: stateType, withoutAnimation: Boolean) => {
        Cookies.set('sidebarStatus', "0")
        state.sidebar.opened = false
        state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state: stateType, device: string) => {
        state.device = device
    }
}

interface acType {
    commit: Commit
}

const actions = {
    toggleSideBar({ commit }: acType) {
        commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }: acType, withoutAnimation: Boolean) {
        commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }: acType, device: string) {
        commit('TOGGLE_DEVICE', device)
    }
}


export default {
    namespace: true,
    state,
    mutations,
    actions
}