/*
 * @Description: 路由配置表
 * @Autor: houyueke
 * @Date: 2022-04-01 14:30:50
 * @LastEditors: houyueke
 * @LastEditTime: 2022-04-01 14:32:57
 */
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

export default routes
