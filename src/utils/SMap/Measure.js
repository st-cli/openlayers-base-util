import Draw from 'ol/interaction/Draw'
import Overlay from 'ol/Overlay';
import { unByKey } from 'ol/Observable.js';
import { getArea, getLength } from 'ol/sphere.js';
import { LineString, Polygon } from 'ol/geom.js';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
export default {
    measure(map, measureType) {
        /**
         * Currently drawn feature.
         * @type {module:ol/Feature~Feature}
         */
        var sketch;

        /**
         * The help tooltip element.
         * @type {Element}
         */
        var helpTooltipElement;

        /**
         * Overlay to show the help messages.
         * @type {module:ol/Overlay}
         */
        var helpTooltip;

        /**
         * The measure tooltip element.
         * @type {Element}
         */
        var measureTooltipElement;

        /**
         * Overlay to show the measurement.
         * @type {module:ol/Overlay}
         */
        var measureTooltip;

        /**
         * Message to show when the user is drawing a polygon.
         * @type {string}
         */
        var continuePolygonMsg = '继续点击绘制多边形';

        /**
         * Message to show when the user is drawing a line.
         * @type {string}
         */
        var continueLineMsg = '继续点击绘制线';

        createMeasureTooltip();
        createHelpTooltip();

        /**
         * Handle pointer move.
         * @param {module:ol/MapBrowserEvent~MapBrowserEvent} evt The event.
         */
        var pointerMoveHandler = function (evt) {
            if (evt.dragging) {
                return;
            }
            /** @type {string} */
            var helpMsg = '请点击开始绘制';

            if (sketch) {
                var geom = (sketch.getGeometry());
                if (geom instanceof Polygon) {
                    helpMsg = continuePolygonMsg;
                } else if (geom instanceof LineString) {
                    helpMsg = continueLineMsg;
                }
            }
            helpTooltipElement.classList.add('tooltip-measure');
            helpTooltipElement.innerHTML = helpMsg;
            helpTooltip.setPosition(evt.coordinate);

            helpTooltipElement.classList.remove('hidden');
        };

        map.on('pointermove', pointerMoveHandler);

        map.getViewport().addEventListener('mouseout', function () {
            helpTooltipElement.classList.add('hidden');
        });

        var draw;
        var formatLength = function (line) {
            var length = getLength(line);
            var output;
            if (length > 100) {
                output = (Math.round(length / 1000 * 100) / 100) +
                    ' ' + 'km';
            } else {
                output = (Math.round(length * 100) / 100) +
                    ' ' + 'm';
            }
            return output;
        };
        var formatArea = function (polygon) {
            var area = getArea(polygon);
            var output;
            if (area > 10000) {
                output = (Math.round(area / 1000000 * 100) / 100) +
                    ' ' + 'km<sup>2</sup>';
            } else {
                output = (Math.round(area * 100) / 100) +
                    ' ' + 'm<sup>2</sup>';
            }
            return output;
        };
        var source;
        // var layer ;
        // 获取存放feature的vectorlayer层。map初始化的时候可以添加好了
        for (let layerTmp of map.getLayers().getArray()) {
            if (layerTmp.get("type") == "measure") {
                // layer = layerTmp;
                // layerTmp.setSource(null)
                debugger
                source = layerTmp.getSource();
            }
        }

        function addInteraction() {
            draw = new Draw({
                source: source,
                type: measureType,
                style: new Style({
                    fill: new Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    }),
                    stroke: new Stroke({
                        color: 'rgba(255, 255, 255, 0.5)',
                        lineDash: [10, 10],
                        width: 2
                    }),
                    image: new CircleStyle({
                        radius: 5,
                        stroke: new Stroke({
                            color: 'rgba(255, 255, 255, 0.7)'
                        }),
                        fill: new Fill({
                            color: 'rgba(255, 255, 255, 0.2)'
                        })
                    })
                })
            });
            map.addInteraction(draw);

            var listener;
            var save_feature
            draw.on('drawstart',
                function (evt) {
                    // set sketch
                    sketch = evt.feature;
                    save_feature = evt.feature
                    /** @type {module:ol/coordinate~Coordinate|undefined} */
                    var tooltipCoord = evt.coordinate;

                    listener = sketch.getGeometry().on('change', function (evt) {
                        var geom = evt.target;
                        var output;
                        if (geom instanceof Polygon) {
                            output = formatArea(geom);
                            tooltipCoord = geom.getInteriorPoint().getCoordinates();
                        } else if (geom instanceof LineString) {
                            output = formatLength(geom);
                            tooltipCoord = geom.getLastCoordinate();
                        }
                        measureTooltipElement.innerHTML = output;
                        measureTooltip.setPosition(tooltipCoord);
                    });
                }, this);

            draw.on('drawend',
                function () {
                    measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
                    let save_tooltip = measureTooltipElement
                    const close = document.createElement('span')
                    close.className = 'measure-close iconfont icon-icon_close'
                    close.onclick = () => {
                        save_tooltip.parentNode.removeChild(save_tooltip);
                        source.removeFeature(save_feature)
                        save_tooltip = null
                        save_feature = null
                    }
                    measureTooltipElement.appendChild(close)
                    measureTooltip.setOffset([0, -7]);
                    // unset sketch
                    sketch = null;
                    // unset tooltip so that a new one can be created
                    measureTooltipElement = null;
                    if (helpTooltipElement) {
                        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
                    }
                    createMeasureTooltip();
                    unByKey(listener);
                    map.removeInteraction(draw)
                }, this);
        }

        function createHelpTooltip() {
            if (helpTooltipElement) {
                helpTooltipElement.parentNode.removeChild(helpTooltipElement);
            }
            helpTooltipElement = document.createElement('div');
            helpTooltipElement.className = 'tooltip hidden';
            helpTooltip = new Overlay({
                element: helpTooltipElement,
                offset: [15, 0],
                positioning: 'center-left'
            });
            map.addOverlay(helpTooltip);
        }

        function createMeasureTooltip() {
            if (measureTooltipElement) {
                measureTooltipElement.parentNode.removeChild(measureTooltipElement);
            }
            measureTooltipElement = document.createElement('div');
            measureTooltipElement.className = 'tooltip tooltip-measure';
            measureTooltip = new Overlay({
                element: measureTooltipElement,
                offset: [0, -15],
                positioning: 'bottom-center'
            });
            map.addOverlay(measureTooltip);
        }
        // 量测调用
        addInteraction();
    }
}