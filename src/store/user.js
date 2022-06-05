//引入vue
import Vue from "vue";
//引入 Vuex
import Vuex from "vuex"

import { getUserTempId } from '@/utils/userabout'
import { reqUserCode, reqLogin, reqUserInfo, reqUserLogout, reqUserAddress } from '@/api'
//安装插件
Vue.use(Vuex)

const state = {
    userTempId: getUserTempId(),
    code: '',
    token: localStorage.getItem('TOKEN_KEY'),
    userInfo: {},
    addressList: []

}
const mutations = {
    REVEICE_CODE(state, code) {
        state.code = code
    },
    REVEICE_TOKEN(state, token) {
        state.token = token
    },
    REVEICE_USERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    RESET_USERINFO(state) {
        state.token = ''
        state.userInfo = {}
    },
    REVEICE_ADDRESSLIST(state, addressList) {
        state.addressList = addressList
    }
}
const actions = {
    //获取验证码
    async getCode({ commit }, phoner) {
        const result = await reqUserCode(phoner)
        if (result.code == 200) {
            commit('REVEICE_CODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //获取登录获取token
    async getUserToken({ commit }, userInfo) {
        const result = await reqLogin(userInfo)
        if (result.code == 200) {
            commit('REVEICE_TOKEN', result.data.token)
            localStorage.setItem('TOKEN_KEY', result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        const result = await reqUserInfo()
        if (result.code == 200) {
            commit('REVEICE_USERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },

    //清除token值
    clearUserToken({ commit }) {
        commit('RESET_USERINFO')
        localStorage.removeItem('TOKEN_KEY')
    },

    //退出登陆
    async userLogout({ commit }) {
        const result = await reqUserLogout()
        if (result.code == 200) {
            //清空state里面的token和用户数据，并且清空localStorage里面的token
            commit('RESET_USERINFO')
            localStorage.removeItem('TOKEN_KEY')
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //获取用户收货信息
    async getaddressList({ commit }) {
        const result = await reqUserAddress()
        if (result.code == 200) {
            commit('REVEICE_ADDRESSLIST', result.data)
        }
    }
}
const getters = {}


export default {
    // namespaced: true,
    state,
    mutations,
    actions,
    getters
}