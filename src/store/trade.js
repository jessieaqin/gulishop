//引入vue
import Vue from "vue";
//引入 Vuex
import Vuex from "vuex"
//安装插件
Vue.use(Vuex)

import { reqTradeInfo } from "@/api";


const state = {
    tradeInfo: {}

}
const mutations = {
    REVEICE_TRADEINFO(state, tradeInfo) {
        state.tradeInfo = tradeInfo
    }
}
const actions = {
    async getTradeInfo({ commit }) {
        const result = await reqTradeInfo()
        if (result.code == 200) {
            commit('REVEICE_TRADEINFO', result.data)
        }
    }

}
const getters = {
    detailArrayList(state) {
        return state.tradeInfo.detailArrayList || []
    },
    tradeInfo(state) {
        return state.tradeInfo || {}
    }
}

export default {
    // namespaced: true,
    state,
    mutations,
    actions,
    getters
}