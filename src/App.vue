<template>
  <router-view v-if="initialized && pads?.length" />
  <!-- <ArcaneStories /> -->

  <!-- <iframe src="\godot-project\index.html" frameborder="0"
    style="width: 100%; height: 100vh; position: absolute; left: 0; opacity: .5;"></iframe> -->
  <!-- <iframe :src="addQueryParams('http://localhost:8060/tmp_js_export.html')" frameborder="0" style="width: 100%; height: 100vh;"></iframe> -->
</template>

<script setup lang="ts">
import { AEventName, Arcane, ArcanePad, IframePadConnectEvent } from 'arcanepad-web-sdk';
import { InitialState } from 'arcanepad-web-sdk/src/models/models';
import { onBeforeMount, onMounted, ref } from 'vue';
import { pads } from './Global';
import ArcaneStories from './components/ArcaneStories/ArcaneStories.vue';

const initialState = ref<InitialState>()
const initialized = ref(false)

onBeforeMount(async () => {
  Arcane.init()
  initialState.value = await Arcane.arcaneClientInitialized()
  pads.value = initialState.value.pads
  initialized.value = true

  Arcane.msg.on(AEventName.IframePadConnect, ({ deviceId, iframeId, internalId, user, }: IframePadConnectEvent) => {
    const exists = pads.value?.find(p => p.deviceId === deviceId)
    if (exists) return
    pads.value?.push(new ArcanePad({ deviceId, internalId, iframeId, isConnected: true, user }))
  })
})

function addQueryParams(url: string, queryParams: Record<any, any>): string {
  let params = Object.keys(queryParams).map(key => key + '=' + encodeURIComponent(String(queryParams[key]))).join('&')

  let separator
  if (url.includes('?')) {
    separator = '&'
  } else {
    separator = '?'
  }

  let hashIndex = url.indexOf('#/')
  if (hashIndex !== -1) {
    return url.slice(0, hashIndex) + separator + params + url.slice(hashIndex)
  } else {
    return url + separator + params
  }
}
</script>
