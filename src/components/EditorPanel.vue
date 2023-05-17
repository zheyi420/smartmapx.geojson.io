<template>
  <div id="editor-panel">

  </div>
</template>

<script setup>
import { watch, computed, onMounted } from 'vue';
import { useDrawFeaturesStore } from '../stores/states';

const store_DrawFeatures = useDrawFeaturesStore();

watch(store_DrawFeatures.features,
  (newVal, oldVal) => {
    console.log('newVal:', newVal);
    console.log('oldVal:', oldVal);
  },
  { deep: true }
);

onMounted(() => {
  console.log('EditorPanel mounted--------------');
});

</script>

<style scoped></style>
