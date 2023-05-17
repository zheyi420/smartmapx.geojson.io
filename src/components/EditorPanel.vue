<template>
  <div id="editor-panel">

  </div>
</template>

<script setup>
import { watch, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia'
import { useCustomizedFeaturesStore } from '../stores/states';

const store_CustomizedFeatures = useCustomizedFeaturesStore();

const customizedFeatures = storeToRefs(store_CustomizedFeatures).features;

watch(customizedFeatures,
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
