/*
 * @Description: userStore
 * @Autor: houyueke
 * @Date: 2022-04-01 11:39:15
 * @LastEditors: houyueke
 * @LastEditTime: 2022-04-01 14:29:04
 */
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    username: 'tom'
  }),
  getters: {
    welcomUser() {
      return '欢迎您，' + this.username
    }
  },
  actions: {
    setUserName(user) {
      this.username = user
    }
  }
})
