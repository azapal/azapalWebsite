<script setup lang="ts">
import NavbarUi from '../components/ui/NavbarUI.vue';
import FooterUi from '../components/ui/FooterUI.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col items-center ">
    <div class="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <div class="absolute left-1/2 top-0 -translate-x-1/2 w-[1500px] h-[1000px] opacity-10">
        <div class="absolute inset-0 blur-[80px] bg-gradient-to-br from-[#F97316] to-[#2563EB]"></div>
      </div>
    </div>
    <NavbarUi></NavbarUi>
    <div class="container">
      <slot name="body"></slot>
      <FooterUi></FooterUi>
    </div>
  </div>

</template>

<style scoped>


</style>
