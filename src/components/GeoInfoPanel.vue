<template>
  <div id="geo-info-panel">
    <!-- Mouse -->
    <div id="mouse-info" class="info-list">
      <label>Mouse</label>
      <span>{{ MouseCoords.lng }},{{ MouseCoords.lat }}</span>
    </div>
    <!-- Box -->
    <div id="box-info" class="info-list">
      <label>Box</label>
      <span>{{ BoxCoords.sw.lng }},{{ BoxCoords.sw.lat }},{{ BoxCoords.ne.lng }},{{ BoxCoords.ne.lat }}</span>
    </div>
    <!-- Map -->
    <div id="map-info" class="info-list">
      <label>Map Bound</label>
      <span>{{ MapCoords.sw.lng }},{{ MapCoords.sw.lat }},{{ MapCoords.ne.lng }},{{ MapCoords.ne.lat }}</span>
    </div>
    <!-- Center -->
    <div id="center-info" class="info-list">
      <label>Center</label>
      <span>{{ CenterCoords.lng }},{{ CenterCoords.lat }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue';
import { useGeoInfoPanelStore } from '../stores/states';

const GeoInfoPanelStore = useGeoInfoPanelStore();

const MouseCoords = computed(() => GeoInfoPanelStore.getMouseCoords);
const BoxCoords = computed(() => GeoInfoPanelStore.getBoxCoords);
const MapCoords = computed(() => GeoInfoPanelStore.getMapCoords);
const CenterCoords = computed(() => GeoInfoPanelStore.getCenterCoords);

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
