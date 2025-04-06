<script setup>
import { ShoppingCart, CreditCard, Truck, Check } from "lucide-vue-next";

const steps = [
  {
    icon: ShoppingCart,
    title: "Shop Online",
    description: "Browse and shop from any online store or social media vendor, even those you've never purchased from before."
  },
  {
    icon: CreditCard ,
    title: "Pay Securely",
    description: "Make your payment through Azapal. We hold the funds until you confirm you're satisfied with your purchase."
  },
  {
    icon: Truck ,
    title: "Track Delivery",
    description: "The vendor processes your order and connects with a delivery service. Track your order in real-time."
  },
  {
    icon: Check,
    title: "Confirm Receipt",
    description: "Once you receive and verify your order, confirm on Azapal and the seller gets paid. If there's an issue, we help resolve it."
  }
];

</script>
<template>
<section id="how-it-works" class="py-20">
      <div class="container mx-auto px-4 md:px-6">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            How <span class="gradient-text">Azapal</span> Works
          </h2>
          <p class="text-lg text-gray-600">
            Our simple 4-step process ensures secure transactions and peace of mind for both buyers and sellers.
          </p>
        </div>

        <div class="relative">
          <div class="absolute left-1/2 top-8 bottom-8 w-1 bg-gradient-to-b from-[#F97316] to-[#2563EB] -translate-x-1/2 hidden md:block"></div>
          
          <div class="space-y-12 md:space-y-0 relative">
              <div v-for="(step, index) in steps" :key={index} class="md:grid md:grid-cols-2 gap-8 items-center md:mb-20">
                <div :class="`md:text-right ${index % 2 === 1 ? 'md:order-2' : ''}`">
                  <div :class="`relative ${index % 2 === 1 ? 'md:flex md:justify-end' : ''}`">
                    <div class="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-md z-10"></div>
                    <div class="hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-[#F97316] to-[#2563EB] items-center justify-center z-20">
                      <span class="text-white font-bold">{{index + 1}}</span>
                    </div>
                    
                    <div :class="`bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative md:w-80 md:${index % 2 === 0 ? 'mr-10' : 'ml-10'}`">
                      <div class="flex md:hidden items-center mb-4">
                        <div class="w-10 h-10 rounded-full bg-gradient-to-r from-[#F97316] to-[#2563EB] flex items-center justify-center mr-3">
                          <span class="text-white font-bold">{{index + 1}}</span>
                        </div>
                        <h3 class="text-xl font-semibold">{{step.title}}</h3>
                      </div>
                      <div class="hidden md:block mb-3">
                        <h3 class="text-xl font-semibold">{{step.title}}</h3>
                      </div>
                      <p class="text-gray-600 text-sm">{{step.description}}</p>
                    </div>
                  </div>
                </div>
                
                <div :class="`hidden md:flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`">
                  <div class="w-16 h-16 rounded-full bg-gradient-to-r from-[#F97316] to-[#2563EB] flex items-center justify-center shadow-lg">
                   <component 
                    :is="step.icon" 
                    class="h-6 w-6 text-white"
                />
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
</template>
<style></style>