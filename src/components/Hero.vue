<script setup>
import { ArrowRight, Shield, Users, Truck, CreditCard, SendToBack, PlusCircle, X } from "lucide-vue-next";
import Button from "./ui/button.vue";
import {ref, computed, onMounted} from 'vue';
import Modal from "./Modal.vue";
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

const isDemo = ref(false)

function close(value){
  isDemo.value = value
}


</script>

<template>

  <section class="relative pt-28 pb-20 md:pt-40 md:pb-28 overflow-hidden h-[90vh] items-center">
    <div class="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <div class="absolute left-1/2 top-0 -translate-x-1/2 w-[1500px] h-[1000px] opacity-10">
        <div class="absolute inset-0 blur-[80px] bg-gradient-to-br from-[#F97316] to-[#2563EB]"></div>
      </div>
    </div>
    <div class="container mx-auto px-4 flex items-center h-full">

      <div class="flex  items-center justify-around w-full">
        <div class="flex flex-col  space-y-8 max-w-xl">
          <div class="space-y-4 animate-fade-in">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Pay <span class="bg-gradient-to-r from-[#F97316] to-[#2563EB] text-transparent bg-clip-text">Safer</span>.
              Deliver <span
                class="bg-gradient-to-r from-[#F97316] to-[#2563EB] text-transparent bg-clip-text">Faster</span>.
            </h1>
            <p class="text-md md:text-md text-gray-600 mt-3">
              Azapal connects buyers, vendors, and logistics services in one secure platform. Buy and Sell with confidence,
              in Nigeria and Africa.
            </p>
            <div class="flex  gap-3 mt-5">
              <router-link to="/signup">
                <button class="bg-[#F97316]/90 shadow-sm text-sm hover:bg-[#F97316] text-white rounded-[8px] px-8 py-3">
                  Create a free account
                </button>
              </router-link>
              <router-link to="/signup">
                <button class="text-sm text-[#F97316] p-4">
                  or Contact Sales
                </button>
              </router-link>
            </div>

          </div>


        </div>
        <DotLottieVue style=" width: 1000px" autoplay loop src="https://lottie.host/962777ee-49de-49b9-8777-e227d2c6ff36/si6hHkhET3.lottie" />

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