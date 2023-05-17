<template>
  <div id="geo-info-panel">
    <!-- Mouse -->
    <div id="mouse-info" class="info-list">
      <label>Mouse</label>
      <span>{{ GeoInfoPanelStore.MouseCoords.lng }},{{ GeoInfoPanelStore.MouseCoords.lat }}</span>
    </div>
    <!-- Box -->
    <div id="box-info" class="info-list">
      <label>Box</label>
      <span>{{ GeoInfoPanelStore.BoxCoords.sw.lng }},{{ GeoInfoPanelStore.BoxCoords.sw.lat }},{{ GeoInfoPanelStore.BoxCoords.ne.lng }},{{ GeoInfoPanelStore.BoxCoords.ne.lat }}</span>
    </div>
    <!-- Map -->
    <div id="map-info" class="info-list">
      <label>Map Bound</label>
      <span>{{ GeoInfoPanelStore.MapCoords.sw.lng }},{{ GeoInfoPanelStore.MapCoords.sw.lat }},{{ GeoInfoPanelStore.MapCoords.ne.lng }},{{ GeoInfoPanelStore.MapCoords.ne.lat }}</span>
    </div>
    <!-- Center -->
    <div id="center-info" class="info-list">
      <label>Center</label>
      <span>{{ GeoInfoPanelStore.CenterCoords.lng }},{{ GeoInfoPanelStore.CenterCoords.lat }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue';
import { useGeoInfoPanelStore } from '../stores/states';

const GeoInfoPanelStore = useGeoInfoPanelStore();


</script>

<style scoped>
#geo-info-panel {
  font-family: "Courier New", Courier, monospace;
  height: fit-content;
  width: fit-content;
  min-width: 800px;
  text-align: left;
  box-sizing: border-box;
  background-color: #f6eeee;
  padding: 5px 0px 0px 0px;
}

.info-list {
  padding: 0.1rem;
  /* border-bottom: 1px solid #ccc; */
}

.info-list label {
  font-size: small;
  font-weight: bold;
  z-index: 10000;
  background-color: black;
  color: white;
  text-align: center;
  display: inline-block;
  padding-left: 2px;
  width: 90px;
}

.info-list span {
  font-size: small;
  font-weight: bold;
  color: black;
  display: inline-block;
  padding-left: 10px;
}
</style>
