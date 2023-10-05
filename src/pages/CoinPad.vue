<template>
  <svg @touchend="throwCoin()" id="arcaneCoin" style="width: 100%;" viewBox="0 0 80 80">
    <circle r="30" cx="50%" cy="50%" fill="darkcyan" stroke="cyan" stroke-width="1%" />
    <text fill="cyan" x="50%" y="51%" font-size="50" text-anchor="middle" dominant-baseline="middle">A</text>
    <foreignObject>
      <audio ref="coinEnter" src="src/assets/audio/coinEnter.mp3" />
    </foreignObject>
  </svg>
  <!-- <button @click="throwCoin()">throwCoin</button> -->
  <audio ref="throwCoinAudio" src="src/assets/audio/throwCoin.mp3" />
</template>

<script setup lang="ts">
import { Arcane, ArcaneBaseEvent } from 'arcanepad-web-sdk';
import { ref } from 'vue';

const throwCoinAudio = ref<HTMLAudioElement>()

function throwCoin() {
  document.getElementById('arcaneCoin')!.style.opacity = '0'
  throwCoinAudio.value?.play()
  setTimeout(() => Arcane.msg.emitToViews(new ArcaneBaseEvent('ThrowCoin')), 100);
}
</script>

