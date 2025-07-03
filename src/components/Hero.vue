<script setup>
import Button from "./ui/button.vue";
import {ref} from 'vue';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

</script>

<template>

  <section class="relative pt-28 pb-20 md:pt-40 md:pb-28 overflow-hidden  items-center">

    <div class="mx-auto px-4 flex items-center h-full">

      <div class="flex flex-col lg:flex-row items-center justify-around w-full">
        <div class="flex flex-col space-y-8 max-w-xl">
          <div class="space-y-4 animate-fade-in">
            <h1 class="text-3xl font-bold leading-tight">
              We are building the future of <br /> <del class="delete">ECommerce</del> <span class="bg-gradient-to-r from-[#F97316] to-[#2563EB] text-transparent bg-clip-text">Social Commerce</span>
            </h1>
            <p class="text-md md:text-md text-gray-600 mt-3">
              Azapal connects buyers, vendors, and logistics services in one secured platform. Buy and Sell with confidence,
              anywhere in Nigeria and Africa.
            </p>
            <div class="flex  gap-3 mt-5">
              <router-link to="/create-account">
                <p class="bg-[#F97316]/90 shadow-sm text-sm hover:bg-[#F97316] text-white rounded-[8px] px-8 py-3">
                  Create a free account
                </p>
              </router-link>
              <router-link to="/signup">
                <button class="text-sm text-[#F97316] p-4">
                  or Contact Sales
                </button>
              </router-link>
            </div>
          </div>
          <div class="flex flex-col gap-3">

            <p class="leading-tight text-sm">Building with trusted logistics partners</p>
            <div class="flex gap-5">
              <img src="../../src/assets/images/spoonel_service_men_logo.jpeg" class="w-12" alt="logistic-logo"/>
              <img src="../../src/assets/images/spoonel_service_men_logo.jpeg" class="w-12" alt="logistic-logo"/>
              <img src="../../src/assets/images/spoonel_service_men_logo.jpeg" class="w-12" alt="logistic-logo"/>
            </div>
          </div>
        </div>
        <DotLottieVue class="absolute lg:relative" style=" width: 1000px" autoplay loop src="https://lottie.host/962777ee-49de-49b9-8777-e227d2c6ff36/si6hHkhET3.lottie" />

      </div>
    </div>
  </section>

</template>

<style scoped>
svg {
  width: 100vw;
  height: 100vh;
  display: block;
}
.pin {
  fill: red;
  stroke: white;
  stroke-width: 1;
  r: 0;
  opacity: 0;
  transition: all 0.6s ease-out;
}
.pin.active {
  r: 5;
  opacity: 1;
}
</style>