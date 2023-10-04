<template>
  <h1>Pad</h1>
  <RouterView />
  <button @click="calibratePointer(true)">Calibrate TopLeft</button>
  <button @click="calibratePointer(false)">Calibrate BottomRight</button>
  <button @click="goToPad('back')">Last Pad</button>
  <button @click="goToPad('next')">Next Pad</button>
</template>

<script setup lang="ts">
import { AEventName, Arcane, CalibratePointerEvent } from 'arcanepad-web-sdk';
import { LanternGetLanternPointEvent, MyEventNames } from 'src/models';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const padsRoutes = [
  'LanternPad', 'CoinPad'
]
let currentPad = 0

function goToPad(direction: 'next' | 'back') {
  console.log(currentPad)
  if (direction == 'back' && currentPad == 0 || direction == 'next' && currentPad == padsRoutes.length - 1) return
  if (direction == 'next') currentPad += 1
  else currentPad -= 1
  router.push(padsRoutes[currentPad])
}

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

