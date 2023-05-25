<template>
  <div class="editor">
    <div class="main">
      <!-- https://github.com/surmon-china/vue-codemirror#component-props -->
      <!-- https://github.com/surmon-china/vue-codemirror#component-events -->
      <codemirror
        v-model="code"
        :autofocus="config.autofocus"
        :indent-with-tab="config.indentWithTab"
        :tab-size="config.tabSize"
        :disabled="config.disabled"
        :placeholder="config.placeholder"
        :style="{
          width: '100%',
          height: config.height,
          backgroundColor: '#fff',
          color: '#333',
          textAlign: 'left'
        }"
        :auto-destroy="config.autoDestroy"
        :extensions="extensions"
        @update:modelValue="handleContentUpdate"
        @update="handleStateUpdate"
        @ready="handleReady"
        @focus="handleFocus"
        @blur="handleBlur"
      ></codemirror>
    </div>
  </div>
</template>

<script setup>
import { reactive, shallowRef, computed, watch, onMounted } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { json } from '@codemirror/lang-json';
import { useEditorGeoJSONStore } from '../stores/states';

const store_EditorGeoJSON = useEditorGeoJSONStore();

// https://github.com/surmon-china/vue-codemirror#component-props
const config = reactive({
  autofocus: false,
  indentWithTab: true,
  tabSize: 2,
  disabled: false,
  placeholder: 'Please input the GeoJSON data.',
  autoDestroy: true,
  height: 'auto',
  language: 'json',
  theme: 'default'
});
const code = shallowRef('');
watch(
  code,
  (_code) => {
    // console.log('_code:', _code);
    store_EditorGeoJSON.setEditorGeoJSON(JSON.parse(_code));
  }
);

const extensions = [json()]; // const extensions = [json(), oneDark];

// Codemirror Component Events
const handleContentUpdate = (value, viewUpdate) => {
  // console.log('handleContentUpdate value:', value);
}
const state = reactive({
  lines: null,
  cursor: null,
  selected: null,
  length: null
})
const handleStateUpdate = (params) => {
  // console.log('handleStateUpdate params:', params);
  // selected
  /* const ranges = viewUpdate.state.selection.ranges
  state.selected = ranges.reduce((plus, range) => plus + range.to - range.from, 0)
  state.cursor = ranges[0].anchor */
  // length
  /* state.length = viewUpdate.state.doc.length
  state.lines = viewUpdate.state.doc.lines */
  // log('viewUpdate', viewUpdate)
}
// const cmView = shallowRef();
const handleReady = (params) => {
  // console.log('handleReady params:', params);
  // cmView.value = params.view
}
const handleFocus = (viewUpdate) => {
  // console.log('focus:', viewUpdate);
}
const handleBlur = (viewUpdate) => {
  // console.log('blur:', viewUpdate);
}

onMounted(() => {
  fetch('/init.geojson')
    .then(res => res.json())
    .then(json => {
      code.value = JSON.stringify(json, null, 2);
    })
    .catch(err => {
      console.log('err:', err);
    });
});


</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
}
</style>