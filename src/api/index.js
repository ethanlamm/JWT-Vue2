import request from '@/utils/request'

/**
 * 用户相关接口
 * @params {String}
 * @returns {Promise}
 */
export const getUser = () => {
  return request('/user', 'get')
}
