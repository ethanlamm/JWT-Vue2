<template>
  <div class="login">
    <Spin v-if="$store.state.isShowLoading">加载中...</Spin>
    <div v-else>
      <Input v-model="username" placeholder="请输入用户名" style="width: 300px"></Input>
      <div class="buttonContainer"><Button type="primary" @click="clickHandler">登录</Button></div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'LoginView',
  data () {
    return {
      username: ''
    }
  },
  computed: {
    ...mapState(['token', 'redirect'])
  },
  mounted () {
    const { token } = this
    const redirect = this.$route.query.redirect
    if (token && redirect) {
      // 已登录，但token失效
      this.$Message.warning({
        content: 'token失效，请重新登录',
        duration: 5
      })
    } else if (!token && redirect) {
      // 未登录(没有token)，但点击了profile(有redirect)
      this.$Message.warning({
        content: '请先重新登录',
        duration: 5
      })
    }
  },
  methods: {
    // 登录
    async clickHandler () {
      const { username } = this
      try {
        const res = await this.$store.dispatch('toLogin', username)
        // 登录成功
        this.$Message.success(res.msg)
        // 重定向
        const redirectUrl = this.$route.query.redirect || '/'
        this.$router.push(redirectUrl)
      } catch (error) {
        if (error) {
          this.$Message.error(error.msg)
        }
      }
    }
  }
}
</script>
<style scoped>
.buttonContainer {
  margin-top: 20px;
}
</style>
