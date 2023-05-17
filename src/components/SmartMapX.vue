<template>
  <div id="map">
    <GeoInfoPanel class="geo-info-panel"></GeoInfoPanel>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue';
import init from '../utils/initMap';
import GeoInfoPanel from './GeoInfoPanel.vue';
import { useGeoInfoPanelStore, useDrawFeaturesStore } from '../stores/states';

let map;
let markerCrosshair;

onMounted(() => {
  map = init({
    container: 'map'
  });

  map.on('load', () => {
    // Add in a crosshair for the map
    addInCrosshair();

    // register events
    registerMapMoveEvent();
    registerMapDataEvent();
    registerMapMouseEvent();
    registerDrawEvent();

    map.resize(); // 用于初始化 GeoInfoPanel 中的 MapCoords, CenterCoords
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

    const center = map.getCenter(); // bounds.getCenter(); // TODO 两者获取的中心点不一样。
    store_GeoInfoPanel.recordCenterCoords({
      lng: center.lng,
      lat: center.lat
    });
  });

  map.on('move', () => {
    markerCrosshair.setLngLat(map.getCenter());
  })
};
const registerMapDataEvent = () => { };
const registerMapMouseEvent = () => {
  map.on('mousemove', (e) => {
    store_GeoInfoPanel.recordMouseCoords(e.lngLat);
  });
};

const store_DrawFeatures = useDrawFeaturesStore();
/**
 * Register draw events
 * 几何编辑获取更新几何数据到编辑器中。
 */
const registerDrawEvent = () => {
  map
    .on('draw.create', (e) => {
      store_DrawFeatures.addFeature({
        id: e.features[0].id,
        feature: parseFeature(e.features[0])
      });
    })
    .on('draw.update', function (e) {
      store_DrawFeatures.updateFeature({
        id: e.features[0].id,
        feature: parseFeature(e.features[0])
      });
    })
    .on('draw.delete', function (e) {
      store_DrawFeatures.deleteFeature({
        id: e.features[0].id
      });
    })
    /* .on('draw.selectionchange', function (e) {
      console.log('draw.selectionchange:', e);
    }) */
    /* .on('draw.modechange', function (e) {
      console.log('draw.modechange:', e);
    }) */
    /* .on('draw.render', function (e) {
      console.log('draw.render:', e);
    }) */
    /* .on('draw.actionable', function (e) {
      console.log('draw.actionable:', e);
    }) */
    .on('draw.combine', function (e) {
      console.log('draw.combine:', e);
      for (const deletedFeature of e.deletedFeatures) {
        store_DrawFeatures.deleteFeature({
          id: deletedFeature.id
        });
      }

      store_DrawFeatures.addFeature({
        id: e.createdFeatures[0].id,
        feature: parseFeature(e.createdFeatures[0])
      })
    })
    .on('draw.uncombine', function (e) {
      console.log('draw.uncombine:', e);
      for (const deletedFeature of e.deletedFeatures) {
        store_DrawFeatures.deleteFeature({
          id: deletedFeature.id
        });
      }

      for (const createdFeature of e.createdFeatures) {
        store_DrawFeatures.addFeature({
          id: createdFeature.id,
          feature: parseFeature(createdFeature)
        });
      }
    });
};

const parseFeature = (feature) => {
  return {
    type: feature.type,
    properties: feature.properties,
    geometry: feature.geometry
  };
};

const addInCrosshair = () => {
  // Create a DOM element for marker.
  const el = document.createElement('div');
  el.className = 'cross-hair';
  el.style.backgroundImage = 'url(/crosshair.png)';
  el.style.width = `20px`;
  el.style.height = `20px`;
  el.style.backgroundSize = '100%';

  // Add markers to the map.
  markerCrosshair = new smartmapx.Marker(el, {
    offset: [0, 0],
    // anchor: 'center' // TODO 检查crosshair的中心位置是否正确，通过添加同样坐标的point，检查是否重合。
  }).setLngLat(map.getCenter()).addTo(map);

  // TODO 添加点图层。
}

</script>

<style scoped>
.geo-info-panel {
  position: absolute;
  bottom: 0;
  left: 210px;
  z-index: 1;
}

</style>

<style>
.cross-hair {
  position: absolute;
  /* margin-left: -10px; */
  /* margin-top: -10px; */
  width: 20px;
  height: 20px;
  /* transform: translate3d(-30px, 402px, 0px); */
  z-index: 400;
}
</style>
