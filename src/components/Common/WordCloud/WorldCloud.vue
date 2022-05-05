<!--
 * @Description: echarts 词云组件
 * @Autor: houyueke
 * @Date: 2022-04-21 15:51:57
 * @LastEditors: houyueke
 * @LastEditTime: 2022-04-21 17:15:35
-->
<template>
  <div ref="wordcloud" :style="{ width: width, height: height }"></div>
</template>

<script>
import echarts from '@/utils/echarts'
import 'echarts-wordcloud/dist/echarts-wordcloud.min'
export default {
  name: 'word-cloud',
  props: {
    width: {
      type: String,
      default: '600px'
    },
    height: {
      type: String,
      default: '500px'
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
  watch: {
    data(newData) {
      if (newData.length) {
        this.init()
      }
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
  methods: {
    /**
     * @description: 词云初始化方法
     * @param {*void}
     * @return {*void}
     * @author: houyueke
     */
    init() {
      if (!this.$refs.wordcloud) return
      if (this.chart) {
        this.chart.dispose()
      }
      this.chart = echarts.init(this.$refs.wordcloud)
      this.chart.setOption({
        title: {
          text: '',
          x: 'center'
        },
        backgroundColor: '#fff',
        series: [
          {
            type: 'wordCloud',
            gridSize: 10, //词之间的距离
            sizeRange: [14, 60], //字体大小范围
            rotationRange: [0, 0],
            textStyle: {
              color: function () {
                return (
                  'rgb(' +
                  Math.round(Math.random() * 255) +
                  ', ' +
                  Math.round(Math.random() * 255) +
                  ', ' +
                  Math.round(Math.random() * 255) +
                  ')'
                )
              }
            },
            left: 'center',
            top: 'center',
            data: this.data
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
