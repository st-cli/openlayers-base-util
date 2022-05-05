/*
 * @Description: main.js
 * @Autor: houyueke
 * @Date: 2022-04-01 10:38:46
 * @LastEditors: houyueke
 * @LastEditTime: 2022-04-22 13:59:24
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia, PiniaVuePlugin } from 'pinia'
import installComponent from '@/utils/antd'
import globalComp from '@/plugins/globalComp'

Vue.use(PiniaVuePlugin)

const pinia = createPinia()

Vue.use(globalComp)

installComponent()

Vue.config.productionTip = false

new Vue({
  router,
  pinia,
  render: h => h(App)
}).$mount('#app')
