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

export const useGeoInfoPanelStore = defineStore({
  id: 'GeoInfoPanel',
  state: () => ({
    MouseCoords: { lng: 0, lat: 0 },
    BoxCoords: { sw: { lng: 0, lat: 0 }, ne: { lng: 0, lat: 0 } },
    MapCoords: { sw: { lng: 0, lat: 0 }, ne: { lng: 0, lat: 0 } },
    CenterCoords: { lng: 0, lat: 0 },
  }),
  getters: {
    // 
  },
  actions: {
    recordMouseCoords(params) {
      this.MouseCoords.lng = params.lng;
      this.MouseCoords.lat = params.lat;
    },
    recordBoxCoords(params) {
      this.BoxCoords.sw = JSON.parse(JSON.stringify(params.sw));
      this.BoxCoords.ne = JSON.parse(JSON.stringify(params.ne));
    },
    recordMapCoords(params) {
      this.MapCoords.sw = JSON.parse(JSON.stringify(params.sw));
      this.MapCoords.ne = JSON.parse(JSON.stringify(params.ne));
    },
    recordCenterCoords(params) {
      this.CenterCoords.lng = params.lng;
      this.CenterCoords.lat = params.lat;
    },
  },
});

export const useDrawFeaturesStore = defineStore({
  id: 'DrawFeatures',
  state: () => ({
    features: {}, // TODO is it a reactive object?
  }),
  getters: {
    // getFeatures: (state) => state.features,
  },
  actions: {
    addFeature(params) {
      this.features[params.id] = params.feature;
    },
    deleteFeature(params) {
      delete this.features[params.id];
    },
    updateFeature(params) {
      this.features[params.id] = params.feature;
    },
  },
});

export const useEditorGeoJSONStore = defineStore({
  id: 'EditorGeoJSON',
  state: () => ({
    objectEditorGeoJSON: {},
  }),
  getters: {},
  actions: {
    setEditorGeoJSON(object) {
      this.objectEditorGeoJSON = object;
    },
  },
});