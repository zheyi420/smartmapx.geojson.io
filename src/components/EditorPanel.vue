<template>
  <div id="editor-panel">

  </div>
</template>

<script setup>
import { watch, computed, onMounted } from 'vue';
import { useCustomizedFeaturesStore } from '../stores/states';

const CustomizedFeaturesStore = useCustomizedFeaturesStore();

const customizedFeatures = computed(() => CustomizedFeaturesStore.getFeatures);

watch(customizedFeatures,
  (newVal, oldVal) => {
    console.log('newVal:', newVal);
    console.log('oldVal:', oldVal);
  }
);

onMounted(() => {
  console.log('EditorPanel mounted--------------');
});

</script>

<style scoped></style>
