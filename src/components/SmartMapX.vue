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

let map;

onMounted(() => {
  map = init({
    container: 'map'
  });
});

</script>

<style scoped>
.geo-info-panel {
  position: absolute;
  bottom: 0;
  right: 0;
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
