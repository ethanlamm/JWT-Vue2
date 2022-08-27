<template>
  <div class="home">
    <Spin v-if="$store.state.isShowLoading">加载中...</Spin>
    <div v-else>
      <h1>首页</h1>
      <div>登录的用户名是{{ $store.state.username }}</div>
    </div>
  </div>
</template>
<script>
import { getUser } from '@/api/index'
export default {
  name: 'HomeView',
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      // 测试接口
      getUser().then(data => {
        console.log(data)
      })
    }
  }
}
</script>
