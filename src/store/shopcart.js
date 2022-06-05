//引入vue
import Vue from "vue";
//引入 Vuex
import Vuex from "vuex"

import { reqShopCartInfo, reqCarList, reqUpdataCartIscheck, reqDeleteCartShop } from '@/api'
//安装插件
Vue.use(Vuex)

const state = {
    //存储数据
    cartListInfo: []
}
const mutations = {
    //修改数据
    RECEIVE_CARTLIST(state, cartListInfo) {
        state.cartListInfo = cartListInfo
    }
}
const actions = {
    //购物车添加商品
    async addShopCartInfo({ commit }, { skuId, skuNum }) {
        const result = await reqShopCartInfo(skuId, skuNum)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //购物车修改商品
    async getCartListInfo({ commit }) {
        const result = await reqCarList()
        if (result.code == 200) commit('RECEIVE_CARTLIST', result.data)
    },
    //购物车修改选择状态 单个
    async UpdataCartIscheck({ commit }, { skuId, isChecked }) {
        const result = await reqUpdataCartIscheck(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },

    //修改全选框的选中状态
    UpdataCartIscheckAll({ commit, getters, dispatch }, isChecked) {
        let promises = []
        getters.cartInfo.cartInfoList.forEach(item => {

            if (item.isChecked === isChecked) return
            let promise = dispatch('UpdataCartIscheck', {
                skuId: item.skuId, isChecked: isChecked
            })
            promises.push(promise)
        });
        return Promise.all(promises)
    },
    //删除购物车商品
    async DeleteCartShop({ commit }, skuId) {
        console.log(commit);
        console.log(skuId);
        const result = await reqDeleteCartShop(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //删除多个商品
    DeleteCartShopAll({ commit, getters, dispatch }) {
        let promises = []
        getters.cartInfo.cartInfoList.forEach((item) => {
            if (!item.isChecked) return
            let promise = dispatch("DeleteCartShop", item.skuId)
            promises.push(promise)
        })

        return Promise.all(promises)


    }
}
const getters = {
    cartInfo(state) {
        return state.cartListInfo[0] || {}
    }
}


export default {
    // namespaced: true,
    state,
    mutations,
    actions,
    getters
}