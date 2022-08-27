import axios from 'axios'
import store from '@/store'

const instance = axios.create({
  baseURL: '/api',
  timeout: 5 * 1000
})

// 请求拦截
instance.interceptors.request.use(
  config => {
    // 打开loading效果
    store.commit('show')

    // Authorization头，JWT验证
    config.headers.Authorization = 'xxx'
    return config
  }, error => {
    return Promise.reject(error)
  }
)

// 响应拦截
instance.interceptors.response.use(
  res => {
    // 关闭loading效果
    store.commit('hide')

    return res.data
  }, error => {
    // 关闭loading效果
    store.commit('hide')
    return Promise.reject(error)
  }
)

/**
 * 请求函数
 * @params {String} url 		        请求路径
 * @params {String} method 		        请求方式
 * @params {String|Object} reqParams    请求参数
 */
export default (url, method, reqParams) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: reqParams
  })
}
