import Vue from 'vue'
import App from './App'
import MpvueRouterPatch from 'mpvue-router-patch'
import '@/utils/global' // 全局变量
import Storage from '@/utils/storage'
import store from '@/store'
import * as filter from '@/filters/filters.js' // 过滤器

// 小程序本地缓存封装方法引入全局
Vue.prototype.Storage = Storage
global.Storage = Storage

Vue.prototype.filter = filter
Vue.config.productionTip = false
Vue.use(MpvueRouterPatch)
App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
