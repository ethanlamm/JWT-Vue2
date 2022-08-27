import Vue from 'vue'
import Vuex from 'vuex'

// 引入api
import { login, validate } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 定义动画
    isShowLoading: false,
    username: 'server-username',
    token: JSON.parse(localStorage.getItem('token')) || '',
    redirect: ''
  },
  getters: {
  },
  mutations: {
    // 打开loading
    show (state) {
      state.isShowLoading = true
    },
    // 关闭loading
    hide (state) {
      state.isShowLoading = false
    },
    // 更新用户名
    updateUser (state, data) {
      state.username = data.username
      state.token = data.token
      // 本地存储token
      localStorage.setItem('token', JSON.stringify(state.token))
    }
  },
  actions: {
    // 登录
    async toLogin ({ commit }, data) {
      const res = await login(data)
      if (res.code === 0) {
        // 成功
        commit('updateUser', res)
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    },

    // 验证token，跳转至profile页面需要验证token的有效性
    async toValidate ({ commit }) {
      const res = await validate()
      if (res.code === 0) {
        commit('updateUser', res)
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    }
  },
  modules: {
  }
})
