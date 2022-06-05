//引入vue
import Vue from "vue";
import VueRouter from "vue-router";
//引入 Vuex
import Vuex from "vuex"
//安装插件
Vue.use(Vuex)
import home from './home'
import user from './user'
import search from './search'
import detail from './detail'
import shopcart from "./shopcart";
import register from "./register"
import trade from "./trade";




const state = {}
const mutations = {}
const actions = {}
const getters = {}


export default new Vuex.Store(
    {
        state,
        mutations,
        actions,
        getters,
        modules: {
            home,
            user,
            search,
            detail,
            shopcart,
            register,
            trade

        }
    }
)