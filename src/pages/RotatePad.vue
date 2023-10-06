<template>
  <div id="textAnimEl"
    style="width: 100%; height: 100vh; color: cyan; font-size: 1.2rem; text-align: justify; display: none; ">
  </div>
  <q-btn ref="btn" @touchstart="startRotate" icon="history" size="xl" style="width: 100%; height: 100vh; scale: 10;"
    :color="buttonPressed ? 'green' : 'cyan'" outline />

  <audio ref="buttonAudio" src="src/assets/audio/buttonAudio.mp3" />
</template>

<script setup lang="ts">
import { Arcane, ArcaneBaseEvent } from 'arcanepad-web-sdk';
import { onMounted, onUnmounted, ref } from 'vue';

const buttonPressed = ref(false)

const buttonAudio = ref<HTMLAudioElement>()

onMounted(() => {
  Arcane.msg.on('DownloadPower', () => startTextAnim())
})

function startRotate() {
  buttonAudio.value?.play()
  buttonPressed.value = true
  setTimeout(() => Arcane.msg.emitToViews(new ArcaneBaseEvent('StartRotate')), 1000);
}

let downloadAnimInterval: any = {}

onUnmounted(() => {
  clearInterval(downloadAnimInterval)
})


function getRandomText() {
  const runes = 'ᚠᚡᚢᚣᚤᚥᚦ'
  const standard = 'A D B 0 1 - # $ % ! ()'
  const allChars = runes + standard
  let result = ''
  for (let i = 0; i < 10; i++) {
    result += allChars[Math.floor(Math.random() * allChars.length)]
  }
  return result
}

function startTextAnim() {
  const textAnimEl = document.getElementById('textAnimEl')
  textAnimEl!.style.display = 'block'
  downloadAnimInterval = setInterval(() => {
    const newText = getRandomText()
    textAnimEl!.innerHTML = newText + textAnimEl!.innerHTML
  }, 1)

  setTimeout(() => {
    clearInterval(downloadAnimInterval)
    textAnimEl!.innerHTML = ''
  }, 4000);
}


</script>

