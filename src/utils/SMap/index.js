/*
 * @Description: SMap class
 * @Autor: houyueke
 * @Date: 2022-03-22 11:49:20
 * @LastEditors: houyueke
 * @LastEditTime: 2022-05-05 12:00:25
 */
import 'ol/ol.css';
// import TileLayer from "ol/layer/Tile";
// import VectorLayer from "ol/layer/Vector";
// import Heatmap from "ol/layer/Heatmap";
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
// import { Select } from 'ol/interaction';
import { fromLonLat } from 'ol/proj';
// import { Props } from './interface';
import { Map } from "ol";
import { setVectorStyle, setVectorSelectedStyle, setClusterStyle, setMeasureStyle } from "./styleFunction"
import {
    createView,
    createTileLayer,
    createVectorLayer,
    createClusterLayer,
    createContextMenu,
    createScale,
    createSelect,
    createLocation,
    createTooltip,
    createSingleClick,
    createHeatmapLayer,
    crateMeasureLayer
} from "./utils"
import measure from "./Measure"

// tile: string,                       //瓦片地址
// id: string,                         //地图容器id ref
// tooltip?: boolean                   //是否初始化tooltip
// tooltipId?: string                  //tooltip id
// select?: boolean,                   //是否初始化feature选择
// zoom?: number,                      //缩放层级
// center?: number[],                  //地图中心点
// showLocation?: boolean,             //鼠标移入是否显示坐标
// locationElement?: HTMLElement,      //坐标容器元素
// scaleElement?: HTMLElement,         //比例尺元素
// scale?: boolean,                    //是否显示比例尺
// context?: boolean,                  //是否开启右键菜单
// singleClick?: boolean               //是否开启点击feature事件

class SMap {
    map = undefined
    tileLayer = undefined
    vectorLayer = undefined
    measureLayer = undefined
    clusterLayer = undefined
    heatmapLayer = undefined
    ContextMenuItem = undefined
    select = undefined
    selectedFeatures = undefined
    onSelect = undefined
    Tooltip = undefined

    //构造函数
    constructor(props) {
        this.init(props)
    }
    /**
     * @description: 地图初始化方法
     * @param {Props} props
     * @return {*void}
     * @author: houyueke
     */
    init(props) {
        const tileLayer = createTileLayer(props)
        const vectorLayer = createVectorLayer(setVectorStyle)
        const clusterLayer = createClusterLayer(setClusterStyle, 10)
        const heatmapLayer = createHeatmapLayer()
        const measureLayer = crateMeasureLayer(setMeasureStyle, 30)
        //实例化地图
        const map = new Map({
            target: props.id,
            layers: [
                tileLayer,
                clusterLayer,
                heatmapLayer,
                vectorLayer,
                measureLayer
            ],
            view: createView(props)
        })
        //右键菜单
        createContextMenu(props, map, this)
        //刻度
        createScale(props, map)
        //select
        createSelect(props, map, this, [vectorLayer, clusterLayer], setVectorSelectedStyle)
        //显示经纬度
        createLocation(props, map)
        //叠加图层overlay
        createTooltip(props, map, this)
        //监听单击事件
        createSingleClick(props, map)

        this.map = map
        this.tileLayer = tileLayer
        this.vectorLayer = vectorLayer
        this.clusterLayer = clusterLayer
        this.heatmapLayer = heatmapLayer
        this.measureLayer = measureLayer
    }
    /**
     * @description: 修改tile 
     * @param {string} tileUrl
     * @return {*void}
     * @author: houyueke
     */
    changeTile(tileUrl) {
        const source = this.tileLayer.getSource()
        source.setUrl(tileUrl)
    }
    /**
     * @description: 获取当前缩放层级
     * @param {*void}
     * @return {*void}
     * @author: houyueke
     */
    getZoom() {
        this.map.getView().getZoom()
    }
    /**
     * @description: 指定缩放层级
     * @param {number} zoom
     * @return {*void}
     * @author: houyueke
     */
    setZoom(zoom) {
        this.map.getView().setZoom(zoom)
    }
    /**
     * @description: 将当前坐标点定位到视图中心
     * @param {number} longlat [经度,纬度]
     * @return {*void}
     * @author: houyueke
     */
    setPointCenter(longlat) {
        this.map.getView().setCenter(fromLonLat(longlat))
    }
    /**
     * @description: 根据坐标加点
     * @param {number} longlat [经度,纬度]
     * @return {*void}
     * @author: houyueke
     */
    addPoint(longlat, data) {
        const point = new Feature({
            geometry: new Point(fromLonLat(longlat)),
            data: data
        })
        //根据实际数据情况添加或者去掉
        point.setId(data.uuid)
        this.vectorLayer.getSource().addFeature(point)
    }
    /**
     * @description: 添加聚合点位
     * @param {number} longlat
     * @param {any} data
     * @return {*void}
     * @author: houyueke
     */
    addClusterPoint(longlat, data) {
        const point = new Feature({
            geometry: new Point(fromLonLat(longlat)),
            data: data
        })
        this.clusterLayer.getSource().getSource().addFeature(point)
    }
    /**
     * @description: 添加热力图点位
     * @param {number} longlat
     * @param {any} data
     * @return {*void}
     * @author: houyueke
     */
    addHeatmapPoint(longlat, data) {
        const point = new Feature({
            geometry: new Point(fromLonLat(longlat)),
            data: data
        })
        this.heatmapLayer.getSource().addFeature(point)
    }
    /**
     * @description: 清除图层资源
     * @param {*layer} 图层名
     * @return {*void}
     * @author: houyueke
     */
    clearLayer(layer) {
        this[layer].getSource().clear()
    }
    /**
     * @description: 控制图层显隐
     * @param {string} layer 图层名称
     * @param {boolean} flag 布尔值
     * @return {*void}
     * @author: houyueke
     */
    changeLayerVisible(layer, flag) {
        this[layer].setVisible(flag)
    }
    /**
     * @description: 距离、面积测量方法
     * @param {string} type LineString | Polygon
     * @return {*void}
     * @author: houyueke
     */
    measure(type) {
        measure.measure(this.map, type)
    }


}

export default SMap