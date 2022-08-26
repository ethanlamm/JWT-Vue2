<template>
  <div class="login">
    <Input v-model="userName" placeholder="请输入用户名" style="width: 300px"></Input>
    <div class="buttonContainer"><Button type="primary">登录</Button></div>
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
