<script setup lang="ts">
import NavbarUi from '../components/ui/NavbarUI.vue';
import FooterUi from '../components/ui/FooterUI.vue';
import Video1 from "../assets/online-shopping-young-woman-shops-on-smartphone-SBV-346923618-preview.mp4";
import {ref, onMounted} from 'vue'
import StoreUtils from "../utils/storeUtils.ts";
const store = StoreUtils
const videoElement = ref(null);

onMounted(() => {
  // Optional: auto-play on load
  videoElement.value?.play();
  store.commit('video', 'isPaused', false);
  store.commit('video', 'heroVideoRef', videoElement.value);
  console.log(videoElement.value);
});
</script>

<template>
  <div class="h-screen flex flex-col relative">
    <video
        :src="Video1"
        ref="videoElement"
        muted
        loop
        playsinline
        class="fixed top-[-10px] inset-0 w-screen h-screen object-cover"
        style="z-index: -2"
    />

    <div class="fixed w-full h-screen bg-black/90 top-0 left-0 right-0 bottom-0" style="z-index: -1"></div>
    <div class="absolute inset-0 overflow-hidden pointer-events-none" style="z-index: -1">
      <div class="absolute left-1/2 top-0 -translate-x-1/2 w-[1500px] h-[1000px] opacity-10">
        <div class="absolute inset-0 blur-[80px] bg-gradient-to-br from-[#F97316] to-[#2563EB]"></div>
      </div>
    </div>
    <NavbarUi></NavbarUi>
    <div class="relative">

      <slot name="body"></slot>
      <FooterUi></FooterUi>
    </div>
  </div>

</template>

<style scoped>


</style>
