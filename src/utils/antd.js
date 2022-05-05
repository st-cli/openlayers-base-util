/*
 * @Description: 按需引入antd vue
 * @Autor: houyueke
 * @Date: 2022-04-21 10:51:34
 * @LastEditors: houyueke
 * @LastEditTime: 2022-04-21 11:11:54
 */
import Vue from 'vue'
import { Button, Message } from 'ant-design-vue'
//组件列表
const components = [Button]
/**
 * @description: 注册组件
 * @param {*void}
 * @return {*void}
 * @author: houyueke
 */
const installComponent = () => {
  components.map(component => {
    Vue.use(component)
  })
}

Vue.prototype.$message = Message

export default installComponent
