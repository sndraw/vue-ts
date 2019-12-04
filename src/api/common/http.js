/**
 * http配置
 * Created by sn on 2019/3/18.
 */

import router from './../../router'
import axios from 'axios'
import $constants from './../../config/constants.conf'

// 超时时间
axios.defaults.timeout = 3600
axios.defaults.withCredentials = true
axios.defaults.responseType = 'json'

// http请求拦截器
axios.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return config
  },
  error => {
    return Promise.reject(error)

  }
)

// http响应拦截器
axios.interceptors.response.use(
  response => {
    const data = response.data
    if (data && data.code == $constants.CODE_NOT_LOGIN) {
      router.push({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
      // 报错处理，打断then事件，以免返回数据导致错误判定
      return Promise.reject(data)
    } else {
      if (!data || data.code !== $constants.CODE_SUCCESS) {
        return Promise.reject(data)
      }
    }
    return response
  },
  error => {
    return Promise.reject(error.response)
  })

export default axios
