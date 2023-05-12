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
      <span>{{ BoxCoords.lng }},{{ BoxCoords.lat }}</span>
    </div>
    <!-- Map -->
    <div id="map-info" class="info-list">
      <label>Map</label>
      <span>{{ MapCoords.lng }},{{ MapCoords.lat }}</span>
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

let MouseCoords = reactive({
  lng: 0,
  lat: 0
});

let CenterCoords = reactive({
  lng: 0,
  lat: 0
});

let BoxCoords = reactive({
  lng: 0,
  lat: 0
});

let MapCoords = reactive({
  lng: 0,
  lat: 0
});

</script>

<style scoped>
#geo-info-panel {
  font-family: "Courier New", Courier, monospace;
  height: fit-content;
  width: fit-content;
  min-width: 300px;
  text-align: left;
  box-sizing: border-box;
  background-color: #f6eeee;
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
  width: 60px;
}

.info-list span {
  font-size: small;
  font-weight: bold;
  color: black;
  display: inline-block;
  padding-left: 10px;
}
</style>
