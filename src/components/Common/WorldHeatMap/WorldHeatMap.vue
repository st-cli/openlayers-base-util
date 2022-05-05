<!--
 * @Description: 世界热力图组件
 * @Autor: houyueke
 * @Date: 2022-04-21 11:35:32
 * @LastEditors: houyueke
 * @LastEditTime: 2022-04-22 17:12:21
-->
<template>
  <div ref="worldMap" :style="{ width: width, height: height }"></div>
</template>

<script>
import echarts from '@/utils/echarts'
import './world.js'
export default {
  name: 'world-heatmap',
  props: {
    width: {
      type: String,
      default: '800px'
    },
    height: {
      type: String,
      default: '600px'
    },
    data: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    data(newData) {
      if (newData.length) {
        this.init()
      }
    }
  },
  methods: {
    /**
     * @description: 初始化热力图
     * @param {*void}
     * @return {*void}
     * @author: houyueke
     */
    init() {
      if (!this.$refs.worldMap) return
      if (this.chart) {
        this.chart.dispose()
      }
      this.chart = echarts.init(this.$refs.worldMap)
      this.chart.setOption({
        title: {
          text: '',
          left: 'center',
          textStyle: {}
        },
        tooltip: {
          formatter: function (e) {
            return e.seriesName + '<br />' + e.name + ':' + e.value
          }
        },
        visualMap: {
          type: 'piecewise',
          min: 0,
          max: 100,
          itemWidth: 30,
          bottom: 10,
          left: 20,
          pieces: [
            { gt: 90, lte: 100, label: '非常好', color: '#6ad86e' },
            { gt: 50, lte: 90, label: '正常', color: '#9adcfa' },
            { gt: 30, lte: 50, label: '警告', color: '#ffeb3b' },
            { gt: 10, lte: 30, label: '较差', color: '#ff9800' },
            { gt: 1, lte: 10, label: '非常差', color: 'orangered' },
            { value: 0, label: '无数据', color: '#999' }
          ]
        },
        series: [
          {
            name: '销量',
            data: this.data,
            type: 'map',
            map: 'world',
            zoom: 1.2,
            aspectScale: 0.75,
            label: {
              normal: {
                color: '#aaa',
                show: false
              },
              emphasis: {
                color: 'yellow',
                fontSize: 18,
                fontWeight: 'bold'
              }
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(39,211,233,1)',
                borderWidth: 1
              },
              emphasis: {
                areaColor: '#01ADF2'
              }
            }
          }
        ]
      })
      this.resizeChart()
    },
    /**
     * @description: 图表resize
     * @param {*void}
     * @return {*void}
     * @author: houyueke
     */
    resizeChart() {
      window.addEventListener('resize', () => {
        if (this.chart) {
          this.chart.resize()
        }
      })
    }
  }
}
</script>
