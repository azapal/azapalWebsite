<script setup lang="ts">
import Logistics from "../../assets/images/logistics-partnership-01.png"
import Payment from "../../assets/images/finacial-gateway.png"
const howItWorks = [
  {
    icon: Logistics,
    title: "Azapal Verifies Personal & Business Accounts",
    description: "Azapal performs thorough KYC verification on all users before enabling them to send or receive payments."
  },

  {
    icon: Payment,
    title: "Escrow & Settlement Code",
    description: "Every transaction is assigned a unique settlement code to ensure secure and successful payment release."
  }


];

</script>

<template>
  <div>

    <section id="features" class="relative bg-white mx-auto px-4 md:px-6 py-12">
      <div
          v-for="(feature, index) in howItWorks"
          :key="index"
          :class="[
      'flex flex-col-reverse items-center gap-8 mb-16',
      index % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'
    ]"
      >
        <!-- Text Block -->
        <div class="w-full lg:w-1/2 text-left px-4 md:px-6">
          <h3 class="text-xl text-gray-400 font-semibold mb-2">Step 0{{ index + 1 }}</h3>
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {{ feature.title }}
          </h2>
          <p class="text-base md:text-lg text-gray-600 leading-relaxed">
            {{ feature.description }}
          </p>
        </div>

        <!-- Image Block -->
        <div class="w-full lg:w-1/2 flex justify-center">
          <img
              class="rounded-2xl w-[70%] max-w-md lg:max-w-full"
              :src="feature.icon"
              :alt="feature.title + ' image'"
          />
        </div>
      </div>
    </section>

  </div>

</template>

<style scoped>

</style>