<template>
  <div style="height: 100vh;">
    <div style="display: grid;  grid-template-columns: 10% 90%; height: 100%;">
      <q-slider v-model="lightIntensity" :min="0" :max="40" color="cyan" vertical reverse
        style="margin-top: 20em; height: 20em;" />
      <!-- <input type="range" v-model="lightIntensity" min="1" max="40"
        style="transform: rotate(-90deg); width: 20em; margin-left: -8.5em;"> -->
      <svg viewBox="0 0 100 100" width="100%" height="80%" @click="toggleOnOff()">
        <path d="M20 20 H80 L60 50 V120 H40 V50 Z" stroke="cyan" />
        <path v-if="isLanternOn" d="m0 0 L19 19 H80 L 100 0 z" stroke="white" fill="white" />
      </svg>
    </div>
    <!-- <button @click="toggleOnOff()">On/Off</button> -->
    <audio ref="turnOnLanternAudio" src="src/assets/audio/turnOnLantern.mp3" />
  </div>
</template>

<script setup lang="ts">
import { Arcane, ArcaneBaseEvent } from 'arcanepad-web-sdk';
import { LanternChangeLightIntensityEvent, LanternGetLanternPointEvent, LanternToggleOnOffEvent } from 'src/models';
import { onMounted, onUnmounted, ref, watch } from 'vue';

const lightIntensity = ref(10)

const isLanternOn = ref(false)

const turnOnLanternAudio = ref<HTMLAudioElement>()

onMounted(() => {
  if (!Arcane.pad) return console.error('Arcane.pad is undefined')

  Arcane.pad.setScreenOrientationPortrait()
  Arcane.pad.startGetPointer()

  Arcane.pad.onGetPointer(({ x, y }) => Arcane.msg.emitToViews(new LanternGetLanternPointEvent(x, y)))
})

watch(lightIntensity, () => {
  Arcane.msg.emitToViews(new LanternChangeLightIntensityEvent(lightIntensity.value))
})


function toggleOnOff() {
  isLanternOn.value = !isLanternOn.value
  Arcane.msg.emitToViews(new LanternToggleOnOffEvent(isLanternOn.value))
  turnOnLanternAudio.value!.volume = .5
  turnOnLanternAudio.value?.play()
}

onUnmounted(() => {
  Arcane.msg.emitToViews(new LanternToggleOnOffEvent(false))
  Arcane.pad?.stopGetPointer()
})

</script>

