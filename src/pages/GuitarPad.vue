<template>
  <div id="textAnimEl" style="width: 100%; height: 80vh; display: grid; grid-template-columns: 50% 50%;">
    <div v-for="color in colors" :key="color" :style="{ border: '1px solid ' + color }" @mousedown="fill($event, color)"
      @mouseup="clear($event)" @touchstart="fill($event, color)" @touchend="clear($event)">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const colors = ref(['red', 'green', 'cyan', 'yellow', 'white', 'fuchsia']);

function fill(event: MouseEvent | TouchEvent, color: string) {
  const element = (event as MouseEvent).currentTarget || (event as TouchEvent).currentTarget;
  (element as HTMLElement).style.backgroundColor = color;
}

function clear(event: MouseEvent | TouchEvent) {
  const element = (event as MouseEvent).currentTarget || (event as TouchEvent).currentTarget;
  (element as HTMLElement).style.backgroundColor = 'transparent';
}
</script>
