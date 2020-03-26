import Vue from 'vue'
import Vuex from 'vuex'

// 数据持久化
// import createPersistedState from "vuex-persistedstate"
//  用户模块仓库
import user from './modules/user/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user
  },
  plugins: [
    // createPersistedState({
    //     key: "store",
    //     storage: window.sessionStorage
    // })
  ]
})

Vue.prototype.$store = store

export default store
