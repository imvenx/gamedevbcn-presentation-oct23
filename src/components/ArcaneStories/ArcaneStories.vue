<template>
  <div class="outer-div" style="border:5px solid grey; height: 100vh; display: grid; place-items: center;">
    <!-- <LanternPad /> -->
    <ArcanepadText />
  </div>
</template>

<script lang="ts" setup>
import LanternPad from 'src/pages/LanternPad.vue';
import ArcanepadText from 'src/components/ArcanepadText.vue';


</script>

<style scoped>
.outer-div {
  border: 5px solid grey;
  height: 100vh;
  display: grid;
  place-items: center;
  position: relative;
}
</style>
