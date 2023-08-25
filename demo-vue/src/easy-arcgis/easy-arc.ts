import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Basemap from "@arcgis/core/Basemap";
import {InternalBasemap} from "./internal-basemap.ts";

/**
 * 类型枚举
 *
 * 0——天地图矢量
 * 1——天地图影响
 * 2——其他：面向未来需求扩展
 */
export enum BaseMapType {
    TianDiTuVector,
    TianDiTuImage,
    Other
}

export class EasyArc {

    /**
     * 地图变量
     */
    basemap: Basemap | null  = null;
    map: Map | null  = null;
    view: MapView | null  = null;
    htmlElement: HTMLElement | null  = null;

    /**
     * 地图参数
     */
    center: {longitude: number, latitude: number} = {longitude: 0, latitude: 0};
    zoom: number = 0;

    /**
     * 构造函数
     * @param htmlElementId HTML元素的ID，用于将地图挂载到某个HTML标签上
     */
    public constructor(htmlElementId: string) {
        this.htmlElement = document.getElementById(htmlElementId) as HTMLDivElement;
    }

    /**
     * 设置底图
     * @param type 类型参数：枚举 —— 目前包含天地图影像、天地图矢量
     * @param dimension 是否增加标注：布尔 —— 为ture时自动添加对应的天地图标注
     */
    public setBasemap(type: BaseMapType, dimension: boolean) {
        let _baseLayers: Array<Object> = [];
        switch (type) {
            case BaseMapType.TianDiTuImage: {
                _baseLayers.push(InternalBasemap.TDTIMG);
                if (dimension) _baseLayers.push(InternalBasemap.TDTCIA);
                break;
            }
            case BaseMapType.TianDiTuVector: {
                _baseLayers.push(InternalBasemap.TDTVEC);
                if (dimension) _baseLayers.push(InternalBasemap.TDTCVA);
                break;
            }
        }
        this.basemap = new Basemap({
            baseLayers: _baseLayers
        })
    }

    /**
     * 创建地图
     */
    public createMap() {
        const _basemap = this.basemap;
        this.map = new Map({
            basemap: _basemap
        })
    }

    /**
     * 设置中心点
     *
     * 地图创建前，可用于设置初始中心点
     * 地图创建后，可用于改变中心点
     *
     * 如果传入zoom，将会同时改变中心点和缩放级别，否则只改变中心点
     */
    public async setCenter(_longitude: number, _latitude: number, _zoom?: number) {
        this.center = {longitude: _longitude, latitude: _latitude}
        if (_zoom) this.zoom = _zoom;
        if (this.view != null) {
            await this.view.goTo({
                center: this.center,
                zoom: this.zoom
            }, {
                duration: 500
            })
        }
    }

    /**
     * 创建2D视图（Mapview）
     */
    public create2DView() {
        this.view = new MapView({
            container: this.htmlElement,
            map: this.map,
            zoom: 11,
            center: [116.7173, 39.3534],
            // constraints: {
            //   lods: lods.map(item => new LOD({ level: item.level, scale: item.scale, resolution: item.resolution }))
            // }
        })
        this.view.ui.remove(['attribution', 'zoom'])
    }

    /**
     * 创建Map和创建MapView的整合方法
     */
    public create() {
        this.createMap();
        this.create2DView();
    }

}