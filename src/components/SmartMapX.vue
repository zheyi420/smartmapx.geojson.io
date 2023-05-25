<template>
  <div id="mapContainer">
    <GeoInfoPanel class="geo-info-panel"></GeoInfoPanel>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, watch } from 'vue';
import init from '../utils/initMap';
import GeoInfoPanel from './GeoInfoPanel.vue';
import { useGeoInfoPanelStore, useDrawFeaturesStore, useEditorGeoJSONStore } from '../stores/states';
import * as turf from '@turf/turf'


// Generate features from the editor code ****************************************************
const store_EditorGeoJSON = useEditorGeoJSONStore();

watch(
  store_EditorGeoJSON.objectEditorGeoJSON,
  (_geojsonObject) => {
    // update(_geojsonObject);
  },
  { deep: true }
);





// Update the Geo Info Panel ****************************************************************
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

    const center = map.getCenter(); // bounds.getCenter(); // TODO The center points obtained by the two are different.
    store_GeoInfoPanel.recordCenterCoords({
      lng: center.lng,
      lat: center.lat
    });

    // Check that crosshair is centered correctly by adding points at the same coordinates.
    /* map
      .getSource('pointCrosshair')
      .setData({
        'type': 'FeatureCollection',
        'features': [turf.point([center.lng, center.lat])]
      }); */
  });

  map.on('move', () => {
    const { lng, lat } = map.getCenter();

    markerCrosshair.setLngLat([lng, lat]);

    // Check that crosshair is centered correctly by adding points at the same coordinates.
    /* map
      .getSource('pointCrosshair')
      .setData({
        'type': 'FeatureCollection',
        'features': [turf.point([lng, lat])]
      }); */
  });
};
const registerMapDataEvent = () => { };
const registerMapMouseEvent = () => {
  map.on('mousemove', (e) => {
    store_GeoInfoPanel.recordMouseCoords(e.lngLat);
  });
};

// Store Draw Features *********************************************************************
const store_DrawFeatures = useDrawFeaturesStore();
// Register draw events.
// Update the draw features store.
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

// Add crosshair to the map ***************************************************************
let markerCrosshair;
const addInCrosshair = () => {
  const { lng, lat } = map.getCenter();

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
  }).setLngLat([lng, lat]).addTo(map);

  // Check that crosshair is centered correctly by adding points at the same coordinates.
  /* map
    .addSource('pointCrosshair', {
      type: 'geojson',
      data: {
        'type': 'FeatureCollection',
        'features': [turf.point([lng, lat])]
      }
    })
    .addLayer({
      id: 'pointCrosshairLayer',
      type: 'circle',
      source: 'pointCrosshair',
      paint: {
        'circle-radius': 1,
        'circle-stroke-width': 1,
      },
    }); */
}

// onMounted *****************************************************************************
let map;
onMounted(() => {
  map = init({
    container: 'mapContainer'
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
</style>
