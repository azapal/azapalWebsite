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
  <div class="min-h-screen">
    <Navbar></Navbar>
    <Hero />
    <Feature />
    <HowItWorks></HowItWorks>
    <Security></Security>
<!--    <CTA />-->
    <Footer></Footer>

  </div>
  
</template>

<style scoped>


</style>
