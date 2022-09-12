<template>
  <div class="home">
    <Spin v-if="$store.state.isShowLoading">加载中...</Spin>
    <div v-else>
      <h1>首页</h1>
      <div>登录的用户名是 {{ $store.state.username }}</div>
      <div>注意：token 20秒过期</div>
    </div>
  </div>
</template>
<script>
import { getUser } from '@/api'
import axios from 'axios'
export default {
  name: 'HomeView',
  mounted () {
    this.getData1()
    this.getData2()
  },
  methods: {
    // 通过 /api 代理请求--- vue-cli proxy 代理
    getData1 () {
      getUser().then(res => {
        console.log('vue-cli proxy 代理', res)
      }).catch(e => {})
    },
    // 需要服务器使用 cors 中间件
    getData2 () {
      axios.get('http://localhost:3000/user').then(res => {
        console.log('服务器使用 cors 中间件', res)
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
