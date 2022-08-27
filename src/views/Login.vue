<template>
  <div class="login">
    <Spin v-if="$store.state.isShowLoading">加载中...</Spin>
    <div v-else>
      <Input v-model="userName" placeholder="请输入用户名(默认admin)" style="width: 300px"></Input>
      <div class="buttonContainer"><Button type="primary">登录</Button></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoginView',
  data () {
    return {
      userName: ''
    }
  }
}
</script>
<style scoped>
.buttonContainer {
  margin-top: 20px;
}
</style>
