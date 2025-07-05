<script setup lang="ts">
import Layout from './Layout.vue'
import HeroBasicUi from '../components/ui/HeroBasicUI.vue'
import AutomatedLogisticsFlowUI from "../components/ui/AutomatedLogisticsFlowUI.vue";
import {DotLottieVue} from "@lottiefiles/dotlottie-vue";

</script>

<template>
  <Layout v-slot:body>
    <HeroBasicUi v-slot:content>
      <DotLottieVue
          src="https://lottie.host/0d172986-54b3-4ca4-adf1-b48ea7da4ca3/5il7AfZk61.lottie"
          loop
          autoplay
          class="absolute left-0 opacity-20 rotate-180"
      />

      <DotLottieVue
          src="https://lottie.host/0d172986-54b3-4ca4-adf1-b48ea7da4ca3/5il7AfZk61.lottie"
          loop
          autoplay
          class="absolute right-0 opacity-20"
      />

      <div class="sm:px-6 lg:px-8 max-w-3xl mx-auto text-center">
          <h2 class="text-4xl lg:text-3xl font-bold  leading-tight text-white">
            Providing Your Business with Reliable Logistics <br class="hidden sm:inline" /> <span class="bg-gradient-to-r from-[#EA580C] to-[#2563EB] text-transparent bg-clip-text">Anytime, Anywhere</span>.
          </h2>
          <p class="mt-4 text-[18px] lg:text-[16px] text-white">
            Deliver Smarter. Grow Faster. Anywhere, Anytime — whether you’re shipping <b>across town</b> or <b>across the country</b> or <b>abroad</b>,
            our dependable logistics partners ensure every delivery is on time, every time—so you can focus on growth,
            not guesswork.
          </p>
        </div>
    </HeroBasicUi>


    <AutomatedLogisticsFlowUI />



  </Layout>

</template>

<style scoped>

</style>