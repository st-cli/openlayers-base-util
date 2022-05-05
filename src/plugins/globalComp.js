/*
 * @Description: 注册全局组件
 * @Autor: houyueke
 * @Date: 2022-04-21 16:58:47
 * @LastEditors: houyueke
 * @LastEditTime: 2022-04-21 17:31:47
 */
// import ChinaHeatMap from "@/components/Common/ChinaHeatMap";
// import WordCloud from "@/components/Common/WordCloud";
// import WorldHeatMap from "@/components/Common/WorldHeatMap"

const components = [
  // ChinaHeatMap,
  //   WordCloud
  // WorldHeatMap
]

export default {
  install: function (Vue) {
    components.map(component => {
      if (component) {
        Vue.component(component.name, component)
      }
    })
  }
}
