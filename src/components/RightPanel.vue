<template>
  <div id="right-panel">
    <div class="top border-b border-solid border-gray-200">
      <div class="buttons flex">
        <button class="grow" :class="{ active: buttonActive.JSON }" @click="onButtonClick" title="JSON Source">
          <!-- <i class="fa-solid fa-code"></i> -->
          <span>JSON</span>
        </button>
        <button class="grow" :class="{ active: buttonActive.Table }" disabled @click="onButtonClick"
          title="Edit feature properties in a table">
          <!-- <i class="fa-solid fa-table"></i> -->
          <span>Table</span>
        </button>
        <button class="grow" :class="{ active: buttonActive.Help }" disabled @click="onButtonClick" title="Help">
          <!-- <i class="fa-solid fa-question"></i> -->
          <span>Help</span>
        </button>
      </div>
    </div>
    <div class="pane">
      <EditorPane class="editor-pane"></EditorPane>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue';
import EditorPane from './EditorPane.vue';

// top bar buttons click event
const buttonActive = reactive({
  JSON: true,
  Table: false,
  Help: false
});

const onButtonClick = (e) => {
  buttonActive.JSON = false;
  buttonActive.Table = false;
  buttonActive.Help = false;
  buttonActive[e.target.innerText.trim()] = true;
};

</script>

<style scoped>
.top {
  background: #eee;
}

.top button.active {
  background: #34495e;
  color: #fff;
}

.buttons {
  height: 40px;
}

.top .buttons button {
  padding: 10px 15px;
  font-weight: normal;
  height: 40px;
  border: 0;
  vertical-align: top;
}

.fa-solid {
  font-family: "Font Awesome 6 Free";
  font-weight: 900;
  -webkit-font-smoothing: antialiased;
  /* display: var(--fa-display, inline-block); */
  font-style: normal;
  font-variant: normal;
  font-size: 18px;
  line-height: 1;
  text-rendering: auto;
}

.fa-code::before {
  content: "\f121";
}

.fa-table::before {
  content: "\f0ce";
}

.fa-question::before {
  content: "\3f";
}

.pane {
  position: absolute;
  top: 40px;
  bottom: 0;
  width: 100%;
  overflow: auto;
}
.editor-pane {
  width: 100%;
  height: 100%;
}
</style>
