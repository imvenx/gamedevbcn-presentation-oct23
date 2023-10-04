<template>
  <svg style="width: 100%; height: 100vh;">

    <!-- Mask definition -->
    <defs>
      <radialGradient id="radial-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stop-color="red" stop-opacity="1" />
        <stop offset="100%" stop-color="green" stop-opacity="0" />
      </radialGradient>

      <mask id="hole">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <circle v-if="isLanternOn" ref="lightEl" cx="250" cy="250" r="10%" fill="url(#radial-gradient)" />
      </mask>
    </defs>

    <!-- Definitions -->
    <defs>
      <radialGradient id="bgRadialGradient" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="rgb(255,255,255)" stop-opacity="1" />
        <stop offset="100%" stop-color="rgb(0,0,0)" stop-opacity="0" />
      </radialGradient>

      <!-- Simple brick pattern -->
      <pattern id="brick" patternUnits="userSpaceOnUse" width="200" height="200">
        <rect x="0" y="0" width="100" height="100" fill="#555" />
        <rect x="100" y="0" width="10" height="10" fill="#666" />
        <rect x="0" y="100" width="90" height="90" fill="#666" />
        <rect x="100" y="100" width="90" height="90" fill="#555" />
      </pattern>

      <!-- Combined gradient and texture -->
      <pattern id="combined" patternUnits="objectBoundingBox" width="1" height="1">
        <rect x="0" y="0" width="100%" height="100%" fill="url(#bgRadialGradient)" />
        <rect x="0" y="0" width="100%" height="100%" fill="url(#brick)" opacity="0.5" />
      </pattern>
    </defs>
    <!-- Rectangle using the combined pattern and gradient -->
    <rect x="0" y="0" width="100%" height="100%" fill="url(#combined)" />

    <ArcanepadText />

    <g style="transform: translate(68%, 68%);">
      <InsertCoin />
    </g>

    <!-- Overlay Rect with hole -->
    <rect x="0" y="0" width="100%" height="100%" fill="black" mask="url(#hole)" />

  </svg>
</template>

<script setup lang="ts">
import { Arcane, GetPointerEvent } from 'arcanepad-web-sdk';
import { pads } from 'src/Global';
import ArcanepadText from 'src/components/ArcanepadText.vue';
import InsertCoin from 'src/components/InsertCoin.vue';
import { LanternChangeLightIntensityEvent, LanternGetLanternPointEvent, LanternToggleOnOffEvent, MyEventNames } from 'src/models';
import { onMounted, ref } from 'vue';

const lightEl = ref<SVGCircleElement>()
const isLanternOn = ref(false)

onMounted(() => {
  if (!pads.value?.length) return

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
})


</script>
