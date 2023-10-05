<template>
  <div id="hiddenArcanepadText" style="height: 100vh; width: 100vw; display: none; background-color: black;">
    <ArcanepadText />
  </div>

  <svg style="width: 100%; height: 100vh;">

    <!-- Mask definition -->

    <defs>
      <radialGradient id="radial-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stop-color="red" stop-opacity="1" />
        <stop offset="100%" stop-color="green" stop-opacity="0" />
      </radialGradient>

      <mask id="hole">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <circle :style="`opacity:${isLanternOn ? '1' : '0'}`" ref="lightEl" cx="250" cy="250" r="10%"
          fill="url(#radial-gradient)" />
      </mask>
    </defs>

    <!-- Definitions -->
    <defs>
      <radialGradient id="bgRadialGradient" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="rgb(255,255,255)" stop-opacity="1" />
        <stop offset="100%" stop-color="rgb(0,0,0)" stop-opacity="0" />
      </radialGradient>

      <!-- Simple brick pattern -->
      <pattern id="brick" patternUnits="userSpaceOnUse" width="60" height="60">
        <rect x="0" y="0" width="30" height="30" fill="#555" />
        <rect x="30" y="0" width="5" height="5" fill="#666" />
        <rect x="0" y="30" width="25" height="25" fill="#666" />
        <rect x="30" y="30" width="25" height="25" fill="#555" />
      </pattern>

      <!-- Combined gradient and texture -->
      <pattern id="combined" patternUnits="objectBoundingBox" width="1" height="1">
        <rect x="0" y="0" width="100%" height="100%" fill="url(#bgRadialGradient)" />
        <rect x="0" y="0" width="100%" height="100%" fill="url(#brick)" opacity="0.5" />
      </pattern>
    </defs>
    <!-- Rectangle using the combined pattern and gradient -->
    <rect x="0" y="0" width="100%" height="100%" fill="url(#combined)" />


    <g style="transform: translate(68%, 68%);">
      <InsertCoin />
    </g>

    <ArcanepadText />

    <!-- Overlay Rect with hole -->
    <rect id="darkness" x="0" y="0" width="100%" height="100%" fill="black" mask="url(#hole)" />

  </svg>

  <ArcaneCoin />

  <audio ref="darkAtmosphereAudio" src="src/assets/audio/darkAtmosphere.mp3" />
</template>

<script setup lang="ts">
import { Arcane, GetPointerEvent } from 'arcanepad-web-sdk';
import { pads } from 'src/Global';
import ArcaneCoin from 'src/components/ArcaneCoin.vue';
import ArcanepadText from 'src/components/ArcanepadText.vue';
import InsertCoin from 'src/components/InsertCoin.vue';
import { LanternChangeLightIntensityEvent, LanternGetLanternPointEvent, LanternToggleOnOffEvent, MyEventNames } from 'src/models';
import { onMounted, ref } from 'vue';

const lightEl = ref<SVGCircleElement>()
const isLanternOn = ref(false)
const darkAtmosphereAudio = ref<HTMLAudioElement>()

onMounted(() => {
  darkAtmosphereAudio.value!.volume = .1
  darkAtmosphereAudio.value?.play()

  if (!pads.value?.length) return

  window.addEventListener('arcaneCoinAnimEnd', () => {
    document.getElementById('hiddenArcanepadText')!.style.display = ''
    darkAtmosphereAudio.value?.pause()
    // setTimeout(() =>, 1000);
  })

  // pads.value[0].startGetPointer()

  // pads.value[0].onGetPointer((e: GetPointerEvent) => {
  //   lightEl.value?.setAttribute('cx', e.x + '%')
  //   lightEl.value?.setAttribute('cy', e.y + '%')
  // })

  Arcane.msg.on(MyEventNames.LanternGetPoint, ({ x, y }: LanternGetLanternPointEvent) => {
    lightEl.value?.setAttribute('cx', x + '%')
    lightEl.value?.setAttribute('cy', y + '%')
  })

  Arcane.msg.on(MyEventNames.LanternChangeIntensity, ({ intensity }: LanternChangeLightIntensityEvent) => {
    lightEl.value?.setAttribute('r', intensity + '%')
  })

  Arcane.msg.on(MyEventNames.LanternToggleOnOff, () => { isLanternOn.value = !isLanternOn.value })

  Arcane.msg.on('OffLantern', () => isLanternOn.value = false)
})


</script>
