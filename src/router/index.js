import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入store
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/Profile.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  // 游客：(从未登录过，没有token)
  // 1.白名单：首页、登录
  // 2.个人中心页：跳转至登录页，登陆后回调

  // 已登录过(有token)
  // 1.白名单：首页、登录
  // 2.若去个人中心页，要先验证token是否有效
  // 3.若token无效，跳转至登录页，登录后回跳

  // 拿到token
  const token = localStorage.getItem('token')

  if (!token) {
    if (to.fullPath === '/profile') {
      // 需要先登录(重定向)
      const redirect = encodeURIComponent(to.fullPath)
      next(`/login?redirect=${redirect}`)
    } else {
      // 首页、登录页放行
      next()
    }
  } else {
    // 已登录状态
    // 去个人中心页，要先验证token是否有效
    if (to.fullPath === '/profile') {
      try {
        await store.dispatch('toValidate')
        // token有效，放行
        next()
      } catch (error) {
        if (error.code === 1) {
          // token失效，重新登录
          const redirect = encodeURIComponent(to.fullPath)
          next(`/login?redirect=${redirect}`)
        }
      }
    } else {
      // 首页、登录页放行
      next()
    }
  }
})

export default router
