<template>
  <router-view v-if="initialized && pads?.length" />
  <!-- <ArcaneStories /> -->
</template>

<script setup lang="ts">
import { AEventName, Arcane, ArcanePad, IframePadConnectEvent } from 'arcanepad-web-sdk';
import { InitialState } from 'arcanepad-web-sdk/src/models/models';
import { onBeforeMount, ref } from 'vue';
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
</script>
