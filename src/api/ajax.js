//对axios进行二次封装
//额外的让axios发请求的时候，具有其他功能

import store from '@/store'

import axios from 'axios'

import NProgress from 'nprogress'

import 'nprogress/nprogress.css'

//创建一个新的和axios具有相同功能的实例--配置基础路径和超时限制

const service = axios.create({
    //基础路径
    baseURL: '/api',
    //请求不超过20s
    timeout: 20000,
})


// 添加请求拦截器
service.interceptors.request.use((config) => {
    //开启进度条
    NProgress.start();

    //请求头内部需要添加临时标识，后期每个请求都会带上这个临时标识
    let userTempId = store.state.user.userTempId

    if (userTempId) {
        config.headers.userTempId = userTempId
    }
    //登录成功后，需要把token添加到请求头当中，从今往后所有的请求头都要带上这个token
    let token = store.state.user.token
    if (token) {
        config.headers.token = token
    }

    return config
});

// 添加响应拦截器
service.interceptors.response.use(
    (response) => {
        //关闭进度条
        NProgress.done();
        //响应的就是我们要的数据
        return response.data
    },
    (error) => {
        //关闭进度条
        NProgress.done();
        // 统一处理请求错误
        alert('ajax请求失败' + error.message || '未知错误')
        return new Promise(() => { })//返回的是pending状态的promise 不让后面继续处理这个错误，中断promise链
        // return Promise.reject(new Error('发送Ajax请求失败'))//后面想继续处理这个错误，返回失败的promise
    }

);


//最终需要对外暴露（不对外暴露外面模块没办法使用）
//这里的代码是暴露一个axios实例

export default service
