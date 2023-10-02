<template>
  <svg style=" width: 100%; height: 100vh;">


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

    <!-- Background -->
    <rect x="0" y="0" width="100%" height="100%" fill="white" />


    <rect x="0" y="0" width="100%" height="25%" fill="red" />


    <!-- Overlay Rect with hole -->
    <rect x="0" y="0" width="100%" height="100%" fill="black" mask="url(#hole)" />

  </svg>
</template>

<script setup lang="ts">
import { Arcane, GetPointerEvent } from 'arcanepad-web-sdk';
import { pads } from 'src/Global';
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
