<template>
  <svg v-if="showDownloadLineAnim" viewBox="0 0 100 100" style="width:100%" height="100vh">
    <line x1="50" y1="50" x2="50" y2="0" stroke="darkcyan" />
    <line id="downloadLine" x1="50" y1="50" x2="50" y2="0" stroke="cyan" />
  </svg>
  <svg ref="svgCont" viewBox="0 0 100 100" style="width:100%" height="100vh">
    <circle r="80" cx="50" cy="50" stroke="cyan" />
    <circle r="50" cx="50" cy="50" stroke="cyan" />
    <circle r="20" cx="50" cy="50" stroke="cyan" />
    <line x1="50" y1="0" x2="50" y2="50" stroke="cyan" />
    <circle r="5" cx="50" cy="50" stroke="red" />
    <line style="transform-origin: center;" ref="lineToRotate" x1="0" y1="0" x2="50" y2="50" stroke="red" />
  </svg>
</template>

<script lang="ts" setup>
import { Arcane, GetRotationEulerEvent } from 'arcanepad-web-sdk';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const lineToRotate = ref<SVGLineElement>()
const showDownloadLineAnim = ref(false)

const svgCont = ref<SVGElement>()

const router = useRouter()

onMounted(() => {

  Arcane.msg.on('StartRotate', () => {

    const pad = Arcane.pads[0]

    pad.startGetRotationEuler()
    pad.onGetRotationEuler((e: GetRotationEulerEvent) => {

      lineToRotate.value!.style.transform = `rotate(${-e.pitch - 42}deg)`
      if (e.pitch < -81) {
        pad.stopGetRotationEuler()
        lineToRotate.value!.setAttribute('stroke', 'yellowgreen')
        lineToRotate.value!.style.transform = `rotate(45deg)`
        setTimeout(() => {
          svgCont.value!.style.transition = '1s all'
          svgCont.value!.style.opacity = '0'
          showDownloadLineAnim.value = true
          setTimeout(() => router.push('RevealScene'), 5000);
        }, 1000);
      }
    })
  })
})
</script>

<style scoped>
circle,
line {
  animation: 2s appearStrokeAnim;
}

@keyframes appearStrokeAnim {
  0% {
    stroke-dashoffset: 100;
    stroke-dasharray: 50 10 5;
  }

  100% {
    stroke-dashoffset: 10;
    stroke-dasharray: 1 1 1;
  }
}

#downloadLine {
  animation: 5s downloadLineAnim forwards;
}

@keyframes downloadLineAnim {
  0% {
    stroke-dashoffset: 100;
    stroke-dasharray: 100;
    opacity: 0;
    stroke-width: 5px;
  }

  80% {
    stroke-dashoffset: 0;
    stroke-dasharray: 0;
    opacity: 1;
    stroke-width: 2rem;
    stroke-width: 1px;
  }

  100% {
    opacity: 0;
  }
}
</style>
