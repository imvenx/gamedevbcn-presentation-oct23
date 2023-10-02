<template>
  <h1>Lantern</h1>
  <input type="range" v-model="lightIntensity" min="1" max="40">
  <button @click="toggleOnOff()">On/Off</button>
</template>

<script setup lang="ts">
import { AEventName, Arcane, CalibratePointerEvent } from 'arcanepad-web-sdk';
import { LanternChangeLightIntensityEvent, LanternGetLanternPointEvent, LanternToggleOnOffEvent, MyEventNames } from 'src/models';
import { onMounted, ref, watch } from 'vue';

const lightIntensity = ref(10)

onMounted(() => {
  if (!Arcane.pad) return console.error('Arcane.pad is undefined')

  Arcane.pad.setScreenOrientationPortrait()
  Arcane.pad.startGetPointer()

  Arcane.pad.onGetPointer(({ x, y }) => Arcane.msg.emitToViews(new LanternGetLanternPointEvent(x, y)))
})

watch(lightIntensity, () => {
  Arcane.msg.emitToViews(new LanternChangeLightIntensityEvent(lightIntensity.value))
})

function toggleOnOff() { Arcane.msg.emitToViews(new LanternToggleOnOffEvent()) }

</script>

