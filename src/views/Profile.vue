<template>
  <div class="profile">
    <Spin v-if="$store.state.isShowLoading">加载中...</Spin>
    <div v-else>
      <h1>个人中心</h1>
      <div>用户名：{{ $store.state.username }}</div>
      <div>token：{{ $store.state.token }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProfileView'
}
</script>
