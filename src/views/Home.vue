<!--
 * @Description: home pinia
 * @Autor: houyueke
 * @Date: 2022-04-01 10:38:46
 * @LastEditors: houyueke
 * @LastEditTime: 2022-05-05 14:37:49
-->
<template>
  <!-- <div>
    <a-button type="primary">antd vue button</a-button>
    <div class="content">this is 首页</div>
    <h1>{{ username }}</h1>
    <h2>{{ welcomUser }}</h2>
  </div> -->
  <div class="mapContainer" ref="mapRef"></div>
</template>

<script>
import { useUserStore } from '@/store/userStore'
import { mapState, mapActions } from 'pinia'
import { login } from '@/api/user'
import SMap from '@/utils/SMapJs'
let map
export default {
  data() {
    return {
      mapData: []
    }
  },
  computed: {
    ...mapState(useUserStore, ['username', 'welcomUser'])
  },
  mounted() {
    this.login()
    this.initMap()
    setTimeout(() => {
      this.setUserName('Dany')
      this.mapData = [
        {
          name: '北京',
          value: 54
        },
        {
          name: '南海诸岛',
          value: 2
        },
        {
          name: '天津',
          value: 16
        },
        {
          name: '上海',
          value: 40
        },
        {
          name: '重庆',
          value: 75
        }
      ]
    }, 3000)
  },
  methods: {
    initMap() {
      map = new SMap({
        tile: 'http://192.168.1.185:8089/getImage?tileX={x}&tileY={y}&tileZ={z}',
        id: this.$refs.mapRef,
        zoom: 4,
        center: [98.12, 32.45],
        scale: false,
        context: false,
        select: true,
        tooltip: true,
        tooltipId: 'popup'
      })
      map.onSelect = this.handleOnSelect
    },
    handleOnSelect() {},
    async login() {
      await login({
        password: '123456',
        username: 'admin'
      })
    },
    ...mapActions(useUserStore, ['setUserName'])
  }
}
</script>

<style lang="less" scoped>
.mapContainer{
  height: 100vh;
}
</style>
