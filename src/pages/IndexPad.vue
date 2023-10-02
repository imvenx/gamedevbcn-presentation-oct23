<template>
  <h1>Pad</h1>
  <RouterView />
  <button @click="calibratePointer(true)">Calibrate TopLeft</button>
  <button @click="calibratePointer(false)">Calibrate BottomRight</button>
</template>

<script setup lang="ts">
import { AEventName, Arcane, CalibratePointerEvent } from 'arcanepad-web-sdk';
import { LanternGetLanternPointEvent, MyEventNames } from 'src/models';
import { onMounted } from 'vue';

onMounted(() => {
  if (!Arcane.pad) return console.error('Arcane.pad is undefined')

  Arcane.pad.setScreenOrientationPortrait()
  Arcane.pad.startGetPointer()

  Arcane.pad.onGetPointer(({ x, y }) => Arcane.msg.emitToViews(new LanternGetLanternPointEvent(x, y)))

})

function calibratePointer(isTopLeft: boolean) {
  Arcane.pad?.calibratePointer(isTopLeft)
}

</script>

