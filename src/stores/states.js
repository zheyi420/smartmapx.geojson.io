// https://pinia.vuejs.org/core-concepts/#setup-stores

import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useGeoInfoPanelStore = defineStore('GeoInfoPanel', () => {
  // state
  const MouseCoords = reactive({lng: 0, lat: 0});
  const BoxCoords = reactive({ sw: {lng: 0, lat: 0}, ne: {lng: 0, lat: 0} });
  const MapCoords = reactive({ sw: {lng: 0, lat: 0}, ne: {lng: 0, lat: 0} });
  const CenterCoords = reactive({lng: 0, lat: 0});

  // getters
  const getMouseCoords = computed(() => MouseCoords);
  const getBoxCoords = computed(() => BoxCoords);
  const getMapCoords = computed(() => MapCoords);
  const getCenterCoords = computed(() => CenterCoords);

  // mutations
  function recordMouseCoords(params) {
    MouseCoords.lng = params.lng;
    MouseCoords.lat = params.lat;
  }
  function recordBoxCoords(params) {
    BoxCoords.sw = JSON.parse(JSON.stringify(params.sw));
    BoxCoords.ne = JSON.parse(JSON.stringify(params.ne));
  }
  function recordMapCoords(params) {
    MapCoords.sw = JSON.parse(JSON.stringify(params.sw));
    MapCoords.ne = JSON.parse(JSON.stringify(params.ne));
  }
  function recordCenterCoords(params) {
    CenterCoords.lng = params.lng;
    CenterCoords.lat = params.lat;
  }

  return {
    getMouseCoords,
    getBoxCoords,
    getMapCoords,
    getCenterCoords,
    recordMouseCoords,
    recordBoxCoords,
    recordMapCoords,
    recordCenterCoords
  };
});