// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'lib-flexible/flexible'
import ElementUI from 'element-ui'
import  VueAwesomeSwiper from 'vue-awesome-swiper'
import 'element-ui/lib/theme-chalk/index.css'//elementUI的样式需要单独的引用。

import VueCookies from 'vue-cookies'
import Axios from 'axios'
import Bridge from './config/bridge.js'
Vue.prototype.$bridge = Bridge
Vue.use(VueCookies)
// import  'swiper/dist/css/swiper.css'
import 'swiper/swiper-bundle.css'
let baseUrl = '';
if (location.hostname == 'zhili.zjchuangxue.com') { //正式环境
  baseUrl = ' ';
} else if (location.hostname == 'test1.zjchuangxue.com') { //测试环境
    baseUrl = ' ';
}  else { //开发环境
    baseUrl = '/api'
}
Vue.prototype.$axios = Axios
Axios.defaults.baseURL = baseUrl
Axios.defaults.headers.post['Content-Type'] = 'application/json';



Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
