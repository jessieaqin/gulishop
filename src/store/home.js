//引入vue
import Vue from "vue";
//引入 Vuex
import Vuex from "vuex"
//安装插件
Vue.use(Vuex)

import { reqCategoryList, reqBannerList, reqFloorList } from "@/api";


const state = {
    categoryList: [],
    bannerList: [],
    floorList: []
}
const mutations = {
    RECEIVE_CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    RECEIVE_BANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    RECEIVE_FLOORLIST(state, floorList) {
        state.floorList = floorList
    }
}
const actions = {
    async GetCategoryList({ commit }) {
        const result = await reqCategoryList()
        if (result.code == 200) commit('RECEIVE_CATEGORYLIST', result.data)

    },
    async GetBannerList({ commit }) {
        const result = await reqBannerList()
        if (result.code == 200) commit('RECEIVE_BANNERLIST', result.data)


    },
    async GetFloorList({ commit }) {
        const result = await reqFloorList()
        if (result.code == 200) commit('RECEIVE_FLOORLIST', result.data)

    }
}
const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}