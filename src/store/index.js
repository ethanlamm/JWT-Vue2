import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 定义动画
    isShowLoading: false,
    username: 'admin'
  },
  getters: {
  },
  mutations: {
    show (state) {
      state.isShowLoading = true
    },
    hide (state) {
      state.isShowLoading = false
    }
  },
  actions: {
  },
  modules: {
  }
})
