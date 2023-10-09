<template>
  <svg v-if="showCoin" id="arcaneCoin" style="width: 6%; height: 20%; position: absolute;
  left: 0%; bottom: 10%; " viewBox="0 0 80 80">
    <circle r="30" cx="50%" cy="50%" fill="darkcyan" stroke="cyan" stroke-width="1%" />
    <text fill="cyan" x="50%" y="51%" font-size="50" text-anchor="middle" dominant-baseline="middle">A</text>
    <foreignObject>
      <audio ref="coinEnter" src="/audio/coinEnter.mp3" />
    </foreignObject>
  </svg>
</template>

<script lang="ts" setup>
import { Arcane } from 'arcanepad-web-sdk';
import { onMounted, ref } from 'vue';

const showCoin = ref(false)
const coinEnter = ref<HTMLAudioElement>()


onMounted(() => {
  Arcane.msg.on('ThrowCoin', () => {
    showCoin.value = true
    setTimeout(() => {
      document.getElementById('arcaneCoin')!.addEventListener("animationend", () => window.dispatchEvent(new CustomEvent('arcaneCoinAnimEnd')))
    }, 1000)

    setTimeout(() => {
      coinEnter.value?.play()
    }, 4500);
  })
})


</script>

<style scoped>
#arcaneCoin {
  animation: 5s arcaneCoinFlipAnim linear forwards;
  border-radius: 10000px;

}

@keyframes arcaneCoinFlipAnim {
  /* 0% {
    transform: rotate3d(0, 1, 1, 0deg);
  }

  100% {
    transform: rotate3d(0, 1, 1, 360deg);
  } */

  0% {
    transform: rotateX(60deg) rotateY(0deg);
  }

  1% {
    border: 15px dashed cyan;
  }

  1.001% {
    border: none;

  }

  50% {
    bottom: 20%;

  }

  98% {
    opacity: 1;
  }

  100% {
    transform: rotateX(60deg) rotateY(960deg);
    left: 80%;
    opacity: 0;
  }
}

circle {
  animation: coinAnim 2s infinite;
}

@keyframes coinAnim {
  0% {
    fill: darkcyan;
    stroke: cyan;
  }

  50% {
    fill: rgb(0, 48, 48);
    stroke: darkcyan;
  }

}

text {
  animation: textAnim 2s infinite linear;
}

@keyframes textAnim {
  0% {
    fill: cyan;
  }

  50% {
    fill: rgb(0, 102, 102);
  }
}
</style>
