<template>
  <h1>CoinPad</h1>
  <button @click="throwCoin()">throwCoin</button>
  <audio ref="throwCoinAudio" src="src/assets/audio/throwCoin.mp3" />
</template>

<script setup lang="ts">
import { Arcane, ArcaneBaseEvent } from 'arcanepad-web-sdk';
import { ref } from 'vue';

const throwCoinAudio = ref<HTMLAudioElement>()

function throwCoin() {
  throwCoinAudio.value?.play()
  setTimeout(() => Arcane.msg.emitToViews(new ArcaneBaseEvent('ThrowCoin')), 100);
}
</script>

