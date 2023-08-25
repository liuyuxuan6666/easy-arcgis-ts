<script setup lang="ts">
import {BaseMapType, EasyArc} from "./easy-arcgis/easy-arc.ts";
import {onMounted} from "vue";


onMounted(() => {

  // 创建 EasyArc 对象，设置挂载的HTML标签
  const easyArc = new EasyArc("demoMap");
  // 创建底图
  easyArc.setBasemap(BaseMapType.TianDiTuImage, true);
  // 设置中心点
  easyArc.setCenter(116.799811619, 39.32611029, 16);
  // 创建Map对象，并挂载到HTML标签
  easyArc.create();

})

</script>

<template>
  <div id="demoMap" class="map"></div>
</template>

<style scoped>

.map {
  height: 100%;
  width: 100%;
  padding: 0px;
  margin: 0px;
}

</style>
