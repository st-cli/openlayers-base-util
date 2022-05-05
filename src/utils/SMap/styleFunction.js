/*
 * @Description: 
 * @Autor: houyueke
 * @Date: 2022-03-23 16:06:32
 * @LastEditors: houyueke
 * @LastEditTime: 2022-05-05 11:56:34
 */
import { Circle as CircleStyle, Fill, Icon, Stroke, Style, Text } from 'ol/style';

export function setVectorStyle(feature) {
    const data = feature.get('data')
    return new Style({
        image: new Icon({
            src: data.icon
        })
    })
}

export function setVectorSelectedStyle(feature) {
    const data = feature.get('data')
    const style = new Style({
        image: new Icon({
            src: data.icon,
            color: "red", //颜色
            rotation: data ? data.track : 0, //方向
            scale: 1.1  //放大
        })
    })
    return [style]
}

export function setClusterStyle(feature) {
    const features = feature.get('features')
    if (features.length === 1) {
        return new Style({
            image: new Icon({
                src: features[0].get('data').icon
            })
        })
    } else {
        return new Style({
            image: new CircleStyle({
                radius: 15,
                stroke: new Stroke({
                    color: '#fff',
                }),
                fill: new Fill({
                    color: 'blue'
                })
            }),
            text: new Text({
                text: features.length.toString(),
                fill: new Fill({
                    color: "#fff"
                })
            })
        })
    }
}

export function setMeasureStyle() {
    return new Style({
        fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
            color: '#ffcc33',
            width: 4,
        }),
        image: new CircleStyle({
            radius: 7,
            fill: new Fill({
                color: '#ffcc33',
            }),
        }),
    })
}