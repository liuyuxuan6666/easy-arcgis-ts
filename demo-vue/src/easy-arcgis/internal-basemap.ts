import WebTileLayer from "@arcgis/core/layers/WebTileLayer";
import {EasyArcConfig} from "./easy-arc-config.ts";


/**
 * 内建底图
 * 可直接作为 Basemap 创建 Map 对象
 */
export  class InternalBasemap {

    /**
     * 天地图影像
     */
    readonly static TDTIMG = new WebTileLayer({
        urlTemplate: "https://{subDomain}.tianditu.gov.cn/DataServer?T=img_w&x={col}&y={row}&l={level}&tk=" + EasyArcConfig.ticket,
        subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"]
    });

    /**
     * 天地图影像标注
     */
    readonly static TDTCIA = new WebTileLayer({
        urlTemplate: "https://{subDomain}.tianditu.gov.cn/DataServer?T=cia_w&x={col}&y={row}&l={level}&tk=" + EasyArcConfig.ticket,
        subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"]
    });

    /**
     * 天地图矢量
     */
    readonly static TDTVEC = new WebTileLayer({
        urlTemplate: "https://{subDomain}.tianditu.gov.cn/DataServer?T=vec_w&x={col}&y={row}&l={level}&tk=" + EasyArcConfig.ticket,
        subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"]
    });

    /**
     * 天地图矢量标注
     */
    readonly static TDTCVA = new WebTileLayer({
        urlTemplate: "https://{subDomain}.tianditu.gov.cn/DataServer?T=cva_w&x={col}&y={row}&l={level}&tk=" + EasyArcConfig.ticket,
        subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"]
    });

}