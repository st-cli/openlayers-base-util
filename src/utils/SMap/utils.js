/*
 * @Description: 
 * @Autor: houyueke
 * @Date: 2022-03-23 10:16:20
 * @LastEditors: houyueke
 * @LastEditTime: 2022-05-05 14:36:27
 */
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import Heatmap from "ol/layer/Heatmap";
import VectorSource from "ol/source/Vector";
import Cluster from "ol/source/Cluster";
// import { Props } from './interface'
import XYZ from "ol/source/XYZ";
import { Map, Overlay, View } from "ol";
import { fromLonLat } from 'ol/proj';
import ContextMenu from 'ol-contextmenu'
import 'ol-contextmenu/dist/ol-contextmenu.min.css'
import { ScaleLine, MousePosition } from "ol/control"
import { Select } from 'ol/interaction';


/**
 * @description: 创建view
 * @param {Props} props
 * @return {*} View
 * @author: houyueke
 */
export function createView(props) {
    return new View({
        // extent: [-180, -90, 180, 90],
        center: props.center ? fromLonLat(props.center) : [0, 0],
        zoom: props.zoom ? props.zoom : 2,
    })
}
/**
 * @description: 创建tileLayer图层
 * @param {Props} props
 * @return {* any }
 * @author: houyueke
 */
export function createTileLayer(props) {
    return new TileLayer({
        source: new XYZ({
            url: props.tile,
        }),
    })
}
/**
 * @description: 创建图层方法
 * @param {any} styleFn 样式方法
 * @param {number} zIndex 图层层级
 * @return {*}
 * @author: houyueke
 */
export function createVectorLayer(styleFn, zIndex) {
    return new VectorLayer({
        source: new VectorSource({
            features: []
        }),
        style: styleFn,
        zIndex: zIndex || 2,
    });
}
/**
 * @description: 创建聚合图层
 * @param {any} styleFn
 * @param {number} zIndex
 * @return {*void}
 * @author: houyueke
 */
export function createClusterLayer(styleFn, zIndex) {
    return new VectorLayer({
        source: new Cluster({
            distance: 40,
            minDistance: 10,
            source: new VectorSource({
                features: []
            })
        }),
        style: styleFn,
        zIndex: zIndex
    })
}
/**
 * @description: 创建热力图图层
 * @param {number} blur 模糊尺寸
 * @param {number} radius 热点半径
 * @param {number} zIndex 
 * @return {*}
 * @author: houyueke
 */
export function createHeatmapLayer(blur, radius, zIndex) {
    return new Heatmap({
        source: new VectorSource({
            features: []
        }),
        blur,
        radius,
        zIndex
    })
}
/**
 * @description: 创建测量图层
 * @param {*}
 * @return {*}
 * @author: houyueke
 */
export function crateMeasureLayer(styleFn, zIndex) {
    return new VectorLayer({
        source: new VectorSource(),
        // @ts-ignore
        type: "measure",
        style: styleFn,
        zIndex: zIndex

    })
}
/**
 * @description: 创建右键菜单
 * @param {Props} props
 * @param {Map} map
 * @param {any} instance
 * @return {*}
 * @author: houyueke
 */
export function createContextMenu(props, map, instance) {
    if (props.context) {
        instance.ContextMenuItem = [
            {
                text: 'click here',
                classname: 'some-style-class', // add some CSS rules
                callback: center
            }
        ]
        function center(obj) {
            console.log(obj);
        }
        const contextMenu = new ContextMenu({
            width: 170,
            defaultItems: false,
            items: instance.ContextMenuItem
        })
        contextMenu.on('open', (evt) => {
            const feature = map.forEachFeatureAtPixel(evt.pixel, function (ft, l) {
                return ft;
            });
            if (feature) {
                contextMenu.clear();
                instance.ContextMenuItem.forEach((item) => {
                    item.data = feature
                    contextMenu.push(item)
                })
            } else {
                contextMenu.clear();
                const defaultItem = contextMenu.getDefaultItems()
                defaultItem.forEach((item) => {
                    contextMenu.push(item)
                })
            }
        });
        map.addControl(contextMenu)
    }
}
/**
 * @description: 创建刻度尺
 * @param {Props} props
 * @param {Map} map
 * @return {*}
 * @author: houyueke
 */
export function createScale(props, map) {
    if (props.scale) {
        const ScaleLineCtrl = new ScaleLine({
            units: 'metric',
            target: props.scaleElement
        })
        map.addControl(ScaleLineCtrl)
    }
}
/**
 * @description: 创建选择器
 * @param {Props} props
 * @param {Map} map
 * @param {any} instance
 * @param {any} layers
 * @param {any} style
 * @return {*void}
 * @author: houyueke
 */
export function createSelect(props, map, instance, layers, style) {
    if (props.select) {
        debugger
        const select = new Select({
            style: style,
            layers: [
                ...layers,
            ]
        });
        instance.select = select
        map.addInteraction(select);
        instance.selectedFeatures = select.getFeatures()
        select.on('select', (it) => {
            const feature = it.selected[0]
            if (feature && props.tooltip && props.tooltipId) {
                //overlay
                // @ts-ignore
                let coordinates = feature.getGeometry().getCoordinates();
                instance.Tooltip.setPosition(coordinates)
            }
            instance.onSelect(it.selected[0])
        })
        select.on('change', (item) => {
            console.log('select', item)
        })
    }
}
/**
 * @description: 创建单击事件
 * @param {Map} map
 * @return {*void}
 * @author: houyueke
 */
export function createSingleClick(props, map) {
    if (props.singleClick) {
        map.on('singleclick', function (e) {
            var pixel = map.getEventPixel(e.originalEvent)
            var currentFeature = map.forEachFeatureAtPixel(pixel, function (feature, layer) {
                return feature
            })
            if (currentFeature) {
                var features = currentFeature.get('features')
                if (features.length > 1) {
                    console.log(features);
                }
                if (features.length === 1) {
                    console.log(features[0]);
                }
            }
        })
    }
}
/**
 * @description: 鼠标移入是否显示坐标
 * @param {Props} props
 * @param {Map} map
 * @return {*void}
 * @author: houyueke
 */
export function createLocation(props, map,) {
    if (props.showLocation) {
        const MousePositionControl = new MousePosition({
            coordinateFormat: function (coordinate) {
                //获取经纬度坐标
                if (coordinate) {
                    let lon = coordinate[0];
                    let lat = coordinate[1];
                    lon = lon % 360;
                    if (lon > 180) {
                        lon = lon - 360;
                    } else if (lon < -180) {
                        lon = 360 + lon;
                    }
                    //四舍五入保留6位小数返回坐标
                    return [lon.toFixed(2), lat.toFixed(2)].toString();
                }
                //格式化为正确的坐标
            },
            projection: 'EPSG:4326', //地图投影坐标系
            className: 'custom-mouse-position', //坐标信息显示样式
            // 显示鼠标位置信息的目标容器
            target: props.locationElement,
            // undefinedHTML: null //未定义坐标的标记
        })
        map.addControl(MousePositionControl)
    }
}
/**
 * @description: 创建overlay
 * @param {Props} props
 * @param {string} id
 * @param {Map} map
 * @param {any} instance
 * @return {*void}
 * @author: houyueke
 */
export function createTooltip(props, map, instance) {
    if (props.tooltip) {
        let container = document.getElementById(props.tooltipId || "popup")
        instance.Tooltip = new Overlay({
            element: container,
            stopEvent: true,
            offset: [15, 0],
            positioning: 'top-left'
        })
        map?.addOverlay(instance.Tooltip)
    }
}
