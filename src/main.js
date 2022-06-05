import Vue from 'vue'


import router from '@/router'
//@是一个别名，是个小名，代表就是我们的src路径
import App from '@/App.vue'

// import '@/api'

import { Button, Message, MessageBox } from 'element-ui';

Vue.use(Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;

import * as API from '@/api'

import store from '@/store'

//引入mock接口数据
import '../mock/mockServer'
//引入swiper的css樣式
import '../node_modules/swiper/css/swiper.css'


// import { reqCategoryLis } from './api/index'

// reqCategoryLis()
//Type栏组件全局安装
import TypeNav from "@/components/TypeNav";

Vue.component('TypeNav', TypeNav)
//轮播图组件全局安装
import Carouse from '@/components/Carouse';
Vue.component('Carouse', Carouse)
//分页器组件全局安装
import Pagination from "./components/Pagination";
Vue.component('Pagination', Pagination)

//图片懒加载
import Vant, { Lazyload } from 'vant';
Vue.use(Vant);
// import VueLazyload from 'vue-lazyload'
import loading from '@/assets/images/loading.gif'
// 在图片界面没有进入到可视范围前不加载, 在没有得到图片前先显示loading图片
Vue.use(Lazyload, { // 内部自定义了一个指令lazy
  loading,  // 指定未加载得到图片之前的loading图片
})

//引入vee-valadite插件
import './utils/valadite.js'

Vue.config.productionTip = false

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this//安装全局事件总线
    Vue.prototype.$API = API////接口请求函数暴露出来的对象挂载到Vue原型上了，所有组件通过$API拿到整个对象
  },

  render: h => h(App),
  //我们所有的组件内部都可以使用this.$router和this.$route
  router,
  store
  //在入口文件这里注册store,在每一个组件的身上都拥有一个$store这个属性

}).$mount('#app')