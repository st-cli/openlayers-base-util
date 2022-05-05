/*
 * @Description: axios封装
 * @Autor: houyueke
 * @Date: 2022-04-01 14:55:16
 * @LastEditors: houyueke
 * @LastEditTime: 2022-04-21 11:33:51
 */
import axios from 'axios'
import router from '@/router/index'
import { Message } from 'ant-design-vue'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000
})

//设置请求拦截器
service.interceptors.request.use(
  async config => {
    //do something
    return config
  },
  async error => {
    return Promise.reject(error)
  }
)

//设置响应拦截器
service.interceptors.response.use(
  async response => {
    return response.data
  },
  async error => {
    if (error.response.status) {
      handleError(error.response.status, error.response.message)
    }
    return Promise.reject(error)
  }
)
/**
 * @description: 错误处理
 * @param {*} code 状态码
 * @param {*} message 错误信息
 * @return {*}
 * @author: houyueke
 */
function handleError(code, message) {
  switch (code) {
    case 401:
      //未登录
      router.replace({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
      break
    case 403:
      //token过期
      messageTooltip(message)
      localStorage.removeItem('token')
      setTimeout(() => {
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      }, 1000)
      break
    case 404:
      messageTooltip(message)
      break
    case 500:
      messageTooltip(message)
      break
    default:
      break
  }
}

function messageTooltip(message) {
  Message({
    message: message,
    type: 'error'
  })
}

export default service
