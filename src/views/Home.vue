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
export default {
  name: 'HomeView'
}
</script>
