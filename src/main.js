// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'animate.css'
import './assets/css/common.css'
import './assets/css/iconfont/iconfont.css'
import './assets/lib/swiper-4.1.0.min.css'
import  './assets/lib/swiper-4.1.0.min.js'
import axios from 'axios'
import store from './store/index'
import scroller from '@/components/scroll/scroll' //全局组件的引入
import loading from '@/components/loading/loading' //全局组件的引入
Vue.component('scroller',scroller) //全局组件的注册
Vue.component('loading',loading) //全局组件的注册
Vue.config.productionTip = false
Vue.prototype.axios = axios
//全局过滤器 设置图片大小 w.h => width.height
Vue.filter('setWH',(url,arg)=>{
  return url.replace(/w\.h/,arg);
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
