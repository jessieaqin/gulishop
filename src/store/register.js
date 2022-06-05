//引入vue
import Vue from "vue";
//引入 Vuex
import Vuex from "vuex"

import { reqUserLogIn } from '@/api'
//安装插件
Vue.use(Vuex)

const state = {

}
const mutations = {}
const actions = {

    async getLogIn({ commit }, userInfo) {
        const result = await reqUserLogIn(userInfo)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
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