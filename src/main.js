import Vue from 'vue'
// import App from './App.vue'

import App from '@/App.vue'
//@是一个别名，是个小名，代表就是我们的src路径

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')