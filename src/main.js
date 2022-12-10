import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "reset-css"
import "@/assets/css/global.less"
import SlideVerify from 'vue-monoplasty-slide-verify' // 拼图验证码

// 把这个插件注册到项目
Vue.use(SlideVerify)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
