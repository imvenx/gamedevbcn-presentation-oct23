<template>
  <q-btn @touchstart="startRotate" icon="history" size="xl" style="width: 100%; height: 50vh; scale: 10;" color="cyan"
    outline />
</template>

<script setup lang="ts">
import { Arcane, ArcaneBaseEvent } from 'arcanepad-web-sdk';

function startRotate() { Arcane.msg.emitToViews(new ArcaneBaseEvent('StartRotate')) }

</script>

