//引入vue
import Vue from "vue";
//引入 Vuex
import Vuex from "vuex"

import { reqDetailInfo } from '@/api'
//安装插件
Vue.use(Vuex)

const state = {
    detailInfo: {}
}
const mutations = {
    RECEIVE_DETAILINFO(state, detailInfo) {
        state.detailInfo = detailInfo
    }
}
const actions = {
    async getDeatailInfo({ commit }, skuId) {
        const result = await reqDetailInfo(skuId)
        if (result.code == 200) commit('RECEIVE_DETAILINFO', result.data)
    }
}
const getters = {
    categoryView(state) {
        return state.detailInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.detailInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.detailInfo.spuSaleAttrList || []

    }
}


export default {
    // namespaced: true,
    state,
    mutations,
    actions,
    getters
}