<template>
  <div id="map">
    <GeoInfoPanel class="geo-info-panel"></GeoInfoPanel>
    <div>
      <img src="/crosshair.png" class="cross-hair">
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue';
import init from '../utils/initMap';
import GeoInfoPanel from './GeoInfoPanel.vue';
import { useGeoInfoPanelStore, useCustomizedFeaturesStore } from '../stores/states';

let map;

onMounted(() => {
  map = init({
    container: 'map'
  });

  map.on('load', () => {
    // register events
    registerMapMoveEvent();
    registerMapDataEvent();
    registerMapMouseEvent();
    registerDrawEvent();
  });
});

const store_GeoInfoPanel = useGeoInfoPanelStore();
const registerMapMoveEvent = () => {
  map.on('moveend', () => {
    const bounds = map.getBounds();
    store_GeoInfoPanel.recordMapCoords({
      sw: {
        lng: bounds.getWest(),
        lat: bounds.getSouth()
      },
      ne: {
        lng: bounds.getEast(),
        lat: bounds.getNorth()
      }
    });

    const center = bounds.getCenter();
    store_GeoInfoPanel.recordCenterCoords({
      lng: center.lng,
      lat: center.lat
    });
  });
};
const registerMapDataEvent = () => { };
const registerMapMouseEvent = () => {
  map.on('mousemove', (e) => {
    store_GeoInfoPanel.recordMouseCoords(e.lngLat);
  });
};

const store_CustomizedFeatures = useCustomizedFeaturesStore();
/**
 * Register draw events
 * 
 * 几何编辑获取更新几何数据到编辑器中。
 * 1. 从draw.create事件中获取
 * 2. 从draw.update事件中获取
 * 3. 从draw.delete事件中获取
 * 4. 从draw.selectionchange事件中获取
 * 5. 从draw.modechange事件中获取
 * 6. 从draw.render事件中获取
 * 7. 从draw.actionable事件中获取
 * 8. 从draw.combine事件中获取
 * 9. 从draw.uncombine事件中获取
 * 10. 从draw.trash事件中获取
 */
const registerDrawEvent = () => {
  map
    .on('draw.create', (e) => {
      console.log('draw.create:', e);
      store_CustomizedFeatures.addFeature({
        id: e.features[0].id,
        feature: {
          type: e.features[0].type,
          properties: e.features[0].properties,
          geometry: e.features[0].geometry
        }
      });
    })
    .on('draw.update', function (e) {
      console.log('draw.update:', JSON.stringify(e.features[0]));
      store_CustomizedFeatures.updateFeature({
        id: e.features[0].id,
        feature: {
          type: e.features[0].type,
          properties: e.features[0].properties,
          geometry: e.features[0].geometry
        }
      });
    })
};


</script>

<style scoped>
.geo-info-panel {
  position: absolute;
  bottom: 0;
  left: 210px;
  z-index: 1;
}

.cross-hair {
  position: absolute;
  margin-left: -10px;
  margin-top: -10px;
  width: 20px;
  height: 20px;
  transform: translate3d(-30px, 402px, 0px);
  z-index: 400;
}
</style>
