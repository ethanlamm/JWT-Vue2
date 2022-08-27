import request from '@/utils/request'

/**
 * 获取用户信息
 * @returns {Promise}
 */
export const getUser = () => {
  return request('/user', 'get')
}

/**
 * 用户登录
 * @param {String} username
 */
export const login = (username) => {
  return request('/login', 'post', { username })
}

/**
 * 验证token
 * @returns {Promise}
 */
export const validate = () => {
  return request('/validate', 'get')
}
