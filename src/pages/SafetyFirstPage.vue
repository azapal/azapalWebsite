<script setup lang="ts">
import Layout from './Layout.vue'
import HeroBasicUi from '../components/ui/HeroBasicUI.vue'
import SafetyFirstUI from "../components/ui/SafetyFirstUI.vue";
import {DotLottieVue} from "@lottiefiles/dotlottie-vue";

</script>

<template>
  <Layout v-slot:body>
<!--    <HeroBasicUi v-slot:content>-->
<!--      <DotLottieVue-->
<!--          src="https://lottie.host/0d172986-54b3-4ca4-adf1-b48ea7da4ca3/5il7AfZk61.lottie"-->
<!--          loop-->
<!--          autoplay-->
<!--          class="right-0 absolute "-->
<!--      />-->
<!--      <div class="sm:px-6 lg:px-8 max-w-3xl mx-auto border text-center">-->
<!--        <h2 class="text-4xl lg:text-3xl font-bold  leading-tight">-->
<!--          Making Money Is Hard Already, <br class="hidden sm:inline" /> <span class="bg-gradient-to-r from-[#EA580C] to-[#2563EB] text-transparent bg-clip-text">So Secure It.</span>.-->
<!--        </h2>-->
<!--        <p class="mt-4 text-[18px] lg:text-[16px] ">-->
<!--          Azapal connects your business with secure and reliable payment gateways. Each business gets a dedicated account for seamless transactions.-->
<!--        </p>-->
<!--      </div>-->
<!--    </HeroBasicUi>-->

    <HeroBasicUi v-slot:content>
      <!-- Lottie background -->
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

      <!-- Overlay (optional for readability) -->


      <!-- Main content -->
      <div class="relative z-20 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center">
        <h2 class="text-4xl lg:text-3xl font-bold leading-tight text-white">
          Making Money Is Hard Already, <br class="hidden sm:inline" />
          <span class="bg-gradient-to-r from-[#EA580C] to-[#2563EB] text-transparent bg-clip-text">
          So Secure It.
        </span>
        </h2>
        <p class="mt-4 text-[18px] lg:text-[16px] text-white">
          Azapal connects your business with secure and reliable payment gateways. Each business gets a dedicated account for seamless transactions.
        </p>
      </div>
    </HeroBasicUi>



    <SafetyFirstUI />



  </Layout>

</template>

<style scoped>

</style>