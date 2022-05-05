/*
 * @Description:
 * @Autor: houyueke
 * @Date: 2022-04-01 15:22:30
 * @LastEditors: houyueke
 * @LastEditTime: 2022-04-11 17:21:52
 */
import request from '@/utils/request'

export async function login(data) {
  return request({
    url: '/v1/login/access-token',
    method: 'post',
    data
  })
}
