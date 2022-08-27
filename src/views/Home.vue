<template>
  <div class="home">
    <h1>首页</h1>
    <div>登录的用户名是{{ $store.state.username }}</div>
  </div>
</template>
<script>
import { getUser } from '@/api/index'
export default {
  name: 'HomeView',
  async mounted () {
    // 测试接口
    const res = await getUser()
    console.log(res)
  }
}
</script>
