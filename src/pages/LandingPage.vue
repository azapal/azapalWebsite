<script setup lang="ts">
import Hero from '../components/Hero.vue';
import Navbar from '../components/Navbar.vue';
import Feature from '../components/Feature.vue';
import HowItWorks from '../components/HowItWorks.vue';
import Security from '../components/Security.vue';
import CTA from '../components/CTA.vue';
import Footer from '../components/Footer.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col items-center ">
    <div class="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <div class="absolute left-1/2 top-0 -translate-x-1/2 w-[1500px] h-[1000px] opacity-10">
        <div class="absolute inset-0 blur-[80px] bg-gradient-to-br from-[#F97316] to-[#2563EB]"></div>
      </div>
    </div>
    <Navbar></Navbar>
    <div class="container">
      <Hero />
      <Feature />
      <Footer></Footer>
    </div>
  </div>
  
</template>

<style scoped>


</style>
