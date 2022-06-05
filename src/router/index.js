//引入并声明使用插件
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

//需要引入route
import store from '@/store'
import { Form } from 'element-ui'
Vue.use(VueRouter)

//需要重写VueRouter.prototype原型对象身上的push|replace方法
//先把VueRouter.prototype身上的push|replace方法进行保存一份

const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

//重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function (location, onReslove, onJected) {
    //第一个形参：路由跳转的配置对象（query|params）
    //第二个参数：undefined|箭头函数（成功的回调）
    //第三个参数:undefined|箭头函数（失败的回调）
    //push方法第二个参数|第三个参数为undefined
    if (onReslove === undefined && onJected === undefined) {
        return originPush.call(this, location).catch(() => { })
    } else {
        //push方法第二个参数|第三个参数有参数
        //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
        return originPush.call(this, location, onReslove, onJected)
    }
}

//重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function (location, onReslove, onJected) {
    if (onReslove === undefined && onJected === undefined) {
        return originReplace.call(this, location).catch(() => { })
    } else {
        return originReplace.call(this, location, onReslove, onJected)
    }
}

//需要向外暴露一个路由器对象
//配置路由
//第一:路径的前面需要有/(不是二级路由)
//路径中单词都是小写的
//component右侧V别给我加单引号【字符串：组件是对象（VueComponent类的实例）】
const router = new VueRouter({
    routes,
    //配置滚动行为，跳转新的路由界面滚动条的位置
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },

})
router.beforeEach(async (to, from, next) => {
    //获取token和userInfo
    let token = store.state.user.token
    let userInfo = store.state.user.userInfo.name
    //如果token存在，表示已经登录了
    if (token) {
        //路由还在登录页面，应进行跳转首页
        if (to.path === '/login') {
            next('/')
        } else {
            //看他的userInfo是否有获取
            if (userInfo) {
                //有用户信息无条件放行
                next()
            } else {
                //没有用过获取用户信息
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    //获取用户信息失败，可能是token过期，清空token 跳转登录页面
                    alert('获取用户信息失败，正在条状登录页')
                    store.dispatch('clearUserToken')
                    next('/login')
                }
            }
        }
    } else {
        //用户根本没登录
        //目前先直接放行，后面新增功能
        //如果没有登陆，访问（交易相关、支付相关、用户中心相关）跳转到登陆页面
        let targetPath = to.path
        if (targetPath.indexOf('/trade') !== -1 || targetPath.indexOf('/pay') !== -1 || targetPath.startsWith('/center') || targetPath.startsWith('/shopcart')) {

            next('/login?redirect=' + targetPath)
        } else {
            next()
        }

    }
})



export default router











