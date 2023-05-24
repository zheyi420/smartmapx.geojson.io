<template>
  <div class="editor">
    <div class="main">
      <codemirror
        v-model="code"
        :style="{
          width: '100%',
          height: config.height,
          backgroundColor: '#fff',
          color: '#333',
          textAlign: 'left'
        }"
        placeholder="Please enter the code."
        :extensions="extensions"
        :autofocus="config.autofocus"
        :disabled="config.disabled"
        :indent-with-tab="config.indentWithTab"
        :tab-size="config.tabSize"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, shallowRef, computed, watch, onMounted } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark'

const props = defineProps({
  config: {
    type: Object,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  language: String,
});

const log = console.log;
const code = shallowRef(props.code);
// const extensions = [json(), oneDark];
const extensions = [json()];
const cmView = shallowRef();
const handleReady = ({ view }) => {
  cmView.value = view
}

const state = reactive({
  lines: null,
  cursor: null,
  selected: null,
  length: null
})

const handleStateUpdate = (viewUpdate) => {
  // selected
  const ranges = viewUpdate.state.selection.ranges
  state.selected = ranges.reduce((plus, range) => plus + range.to - range.from, 0)
  state.cursor = ranges[0].anchor
  // length
  state.length = viewUpdate.state.doc.length
  state.lines = viewUpdate.state.doc.lines
  // log('viewUpdate', viewUpdate)
}

onMounted(() => {
  watch(
    () => props.code,
    (_code) => {
      code.value = _code;
      console.log('4');
    }
  )
})
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
}
</style>