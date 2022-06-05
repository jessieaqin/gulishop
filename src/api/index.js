//接口请求函数--我们的每个接口都对应一个函数 如果想要拿相关接口的数据，只需要调用相关的请求函数

import request from './ajax'
import mock from './mockAjax'


//请求地址：/api/product/getBaseCategoryList GET

//对外暴露一个函数，只要外部调用这个函数，就想服务器发起ajax请求、获取咱们的三级菜单数据。当前咱们这个函数只需要把服务器返回结果返回即可。
export const reqCategoryList = () => {
    return request({
        method: 'get',
        url: '/product/getBaseCategoryList'
    })
}

// //验证请求是否成功
// reqCategoryList()

//切记:当前函数执行需要把服务器返回结果返回
//获取banner（Home首页轮播图接口）
export const reqBannerList = () => {
    return mock({
        method: 'get',
        url: '/banner'
    })
}
//获取floor数据
export const reqFloorList = () => {
    return mock({
        method: 'get',
        url: '/floor'
    })
}

// 请求获取search页面的数据
//获取搜索模块数据 地址:/api/list  请求方式:post  参数:需要带参数
//当前这个函数需不需要接受外部传递参数
//当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数【至少是一个空对象】
export const reqSearchInfo = (searchParams) => {
    return request({
        url: '/list',
        method: 'post',
        data: searchParams
    })
}
//请求获取detail页面的数
//获取产品详情信息的接口  URL: /api/item/{ skuId }  请求方式：get 
export const reqDetailInfo = (skuId) => {
    return request({
        url: `/item/${skuId}`,
        method: 'get'
    })
}

//添加到购物车(对已有物品进行数量改动)
///api/cart/addToCart/{ skuId }/{ skuNum }
export const reqShopCartInfo = (skuId, skuNum) => {
    return request({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: 'post'
    })
}

//请求获取购物车页面数据函数
///api/cart/cartList
export const reqCarList = () => {
    return request({
        url: '/cart/cartList',
        method: 'get'
    })
}
//修改购物车的选择状态
///api/cart/checkCart/{skuId}/{isChecked}
export const reqUpdataCartIscheck = (skuId, isChecked) => {
    return request({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: 'get'
    })
}
//删除购物车商品
///api/cart/deleteCart/{skuId}
export const reqDeleteCartShop = (skuId) => {
    return request({
        url: `/cart/deleteCart/${skuId}`,
        method: 'DELETE'
    })
}

//登录接口函数
// /api/user / passport / register
export const reqUserLogIn = (userInfo) => {
    return request({
        url: `/user / passport / register`,
        method: 'POST',
        data: userInfo
    })
}

//获取验证码接口
// /api/user/passport/sendCode/{phoner}
export const reqUserCode = (phoner) => {
    return request({
        url: `/user/passport/sendCode/${phoner}`,
        method: 'get'
    })
}

//登录请求函数
///api/user/passport/login
//返回的值:
// data": {
// "nickName": "Administrator",
//     "name": "Admin",
//         "userId": 2,
//             "token": "0754d660ea2b4f2ead8303592d9f261c"
//     },
export const reqLogin = (userInfo) => {
    return request({
        url: "/user/passport/login",
        method: 'post',
        data: userInfo

    })
}

//根据token获取用户信息
//api/user/passport/auth/getUserInfo
export const reqUserInfo = () => {
    return request({
        url: '/user/passport/auth/getUserInfo',
        method: 'get'
    })
}

//退出登陆
///api/user / passport / logout
export const reqUserLogout = () => {
    return request({
        url: '/user/passport/logout',
        method: 'get'
    })
}

//获取用户地址信息
///api/user / userAddress / auth / findUserAddressList
export const reqUserAddress = () => {
    return request({
        url: '/user/userAddress/auth/findUserAddressList',
        method: 'get'
    })
}

//送货清单接口函数
///api/order/auth/trade
export const reqTradeInfo = () => {
    return request({
        url: '/order/auth/trade',
        method: 'get'
    })
}

//提交订单
///api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, orderInfo) => {
    return request({
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method: 'post',
        data: orderInfo
    })
}

//获取支付信息
///api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) => {
    return request({
        url: `/payment/weixin/createNative/${orderId}`,
        method: 'get'
    })
}

//获取订单支付信息
///api/payment/weixin/createNative/{orderId}
export const reqPayStatus = (orderId) => {
    return request({
        url: `/payment/weixin/createNative/${orderId}`,
        method: "get"
    })
}

//获取我的订单列表
///api/order/auth/{page}/{limit}
export const reqMyOrderInfo = (page, limit) => {
    return request({
        url: `/order/auth/${page}/${limit}`,
        method: 'get'
    })

}