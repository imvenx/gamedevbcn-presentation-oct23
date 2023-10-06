<template>
  <iframe src="\godot-project\index.html" frameborder="0"
    style="width: 100%; height: 100vh; position: absolute; left: 0; opacity: .5;"></iframe>
  <audio ref="stayRetroAudio" src="src/assets/audio/stayRetro.mp3" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const stayRetroAudio = ref<HTMLAudioElement>()
onMounted(() => {
  stayRetroAudio.value?.play()
})
</script>

<style scoped></style>
