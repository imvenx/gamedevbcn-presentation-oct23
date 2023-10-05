<template>
  <div class="outer-div" style="border:5px solid grey; height: 100vh; display: grid; place-items: center;">
    <!-- <LanternPad /> -->
    <!-- <ArcanepadText /> -->
    <!-- <BabylonTest /> -->
    <!-- <TreeJsTest /> -->
    <!-- <InsertCoin /> -->
    <!-- <ArcaneCoin /> -->
    <UnlockScene />
  </div>
</template>

<script lang="ts" setup>
import LanternPad from 'src/pages/LanternPad.vue';
import ArcanepadText from 'src/components/ArcanepadText.vue';
import BabylonTest from '../BabylonTest.vue';
import TreeJsTest from '../TreeJsTest.vue';
import InsertCoin from '../InsertCoin.vue';
import ArcaneCoin from '../ArcaneCoin.vue';
import UnlockScene from 'src/pages/UnlockScene.vue';


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
