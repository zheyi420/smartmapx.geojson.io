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
import { useGeoInfoPanelStore } from '../stores/states';

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
  });
});

const GeoInfoPanelStore = useGeoInfoPanelStore();
const registerMapMoveEvent = () => {
  map.on('moveend', () => {
    const bounds = map.getBounds();
    GeoInfoPanelStore.recordMapCoords({
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
    GeoInfoPanelStore.recordCenterCoords({
      lng: center.lng,
      lat: center.lat
    });
  });
};
const registerMapDataEvent = () => { };
const registerMapMouseEvent = () => {
  map.on('mousemove', (e) => {
    GeoInfoPanelStore.recordMouseCoords(e.lngLat);
  });
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
