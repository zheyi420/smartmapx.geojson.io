<template>
  <TopBar class="top-bar"></TopBar>
  <div class="content">
    <SmartMapX class="map-panel"></SmartMapX>
    <DataPanel class="data-panel"></DataPanel>
  </div>
</template>

<script setup>
import TopBar from '../components/TopBar.vue';
import SmartMapX from "../components/SmartMapX.vue";
import DataPanel from '../components/DataPanel.vue';

</script>

<style scoped>
.top-bar {
  height: 40px;
  background-color: rgb(14 33 39);
  padding: 0rem 1rem;
}
.content {
  position: absolute;
  width: 100%;
  border-bottom: 1px solid #ccc;
  top: 40px;
  bottom: 0;
}
.map-panel {
  position: absolute;
  width: 70%;
  height: 100%;
  left: 0;
  top: 0;
}
.data-panel {
  position: absolute;
  width: 30%;
  height: 100%;
  right: 0;
  top: 0;
}
</style>


