
export default {
  namespaced: true,
  state: {
    name: '',
    count: 0
  },
  actions: {
    async updateUserInfo ({commit}) {
      // 异步逻辑
      // let res = await User.updateUserInfo()
      commit('setData', {storeKey: 'name', storeValue: '张三'})
    }
  },

  mutations: {
    //  设置数据
    setData (state, data) {
      state[data.storeKey] = data.storeValue
    }
  }
}
