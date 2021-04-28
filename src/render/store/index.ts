import { createStore } from 'vuex'
import getters from './getters';
import app from './modules/app';
import agentBind from './modules/agentBind'

var store = createStore({
    modules: {
        app,
        agentBind
    },
    getters
});

export default store;