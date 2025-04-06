<script setup>
import { ArrowRight, Shield, Users, Truck, CreditCard, SendToBack, PlusCircle, X } from "lucide-vue-next";
import Button from "./ui/button.vue";
import { ref, computed } from 'vue';
import Modal from "./Modal.vue";


const isDemo = ref(false)

function close(value){
  isDemo.value = value
}

</script>

<template>

  <section class="relative pt-28 pb-20 md:pt-40 md:pb-28 overflow-hidden">
    <div class="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <div class="absolute left-1/2 top-0 -translate-x-1/2 w-[1500px] h-[1000px] opacity-10">
        <div class="absolute inset-0 blur-[80px] bg-gradient-to-br from-[#F97316] to-[#2563EB]"></div>
      </div>
    </div>
    <Modal v-if="isDemo" @close="close"></Modal>

    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-2 align-center  items-center">
        <div class="flex flex-col space-y-8 max-w-xl">
          <div class="space-y-4 animate-fade-in">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Pay <span class="bg-gradient-to-r from-[#F97316] to-[#2563EB] text-transparent bg-clip-text">Safer</span>.
              Deliver <span
                class="bg-gradient-to-r from-[#F97316] to-[#2563EB] text-transparent bg-clip-text">Faster</span>.
            </h1>
            <p class="text-md md:text-md text-gray-600">
              Azapal connects buyers, sellers, and delivery services in one secure platform. Shop with confidence, even
              from unknown vendors.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 animate-fade-in" :style="{ animationDelay: '0.2s' }">
            <Button
                class="bg-[#F97316] hover:bg-[#EA580C] flex items-center text-white px-6 py-6 text-xs rounded-md font-medium transition-colors"
                v-slot:child><router-link to="/create-account" class="flex">
                Get Started Free
                <ArrowRight class="ml-2 h-5 w-5" /></router-link>
              </Button>
            <Button variant="outline" @click="isDemo=true"
              class="border-[#2563EB] text-[#2563EB] hover:bg-purple/10 px-6 py-6 text-xs rounded-md font-medium transition-colors"
              v-slot:child>
              See How It Works
            </Button>
          </div>

          <div class="grid grid-cols-3 gap-4 pt-4 animate-fade-in" :style="{ animationDelay: '0.4s' }">
            <div class="flex items-center space-x-2">
              <Shield class="h-5 w-5 text-purple" />
              <span class="text-xs lg:text-sm font-medium">Secure Payments</span>
            </div>
            <div class="flex items-center space-x-2">
              <Users class="h-5 w-5 text-purple" />
              <span class="lg:text-sm text-xs font-medium">Trusted Vendors</span>
            </div>
            <div class="flex items-center space-x-2">
              <Truck class="h-5 w-5 text-purple" />
              <span class="lg:text-sm text-xs font-medium">Fast Delivery</span>
            </div>
          </div>
        </div>

       

        <!-- <div class="relative flex justify-center animate-fade-in" :style="{ animationDelay: '03s' }">
          <div class="relative w-full max-w-lg aspect-square md:aspect-auto">
            <div
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-md max-h-md rounded-full bg-purple/10 blur-3xl">
            </div>
            <div class="relative bg-white rounded-2xl shadow-xl overflow-hidden p-6 border-2 border-gray-200">
              <div class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg">
                <form class="p-4" @submit.prevent="">
                  <div class="bg-white rounded-lg shadow-sm p-4 mb-4">
                    <div class="w-full">
                      <label for="bank_account_name"
                        class="block mb-5 w-full overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
                        <span class="text-xs font-medium text-gray-700 dark:text-gray-200"> Vendor/Business </span>

                        <input type="text" id="bank_account_name" required placeholder="Search Vendor/business"
                          class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm dark:text-white" />
                      </label>
                      <label for="bank_account_name"
                        class="block mb-5 w-full overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
                        <span class="text-xs font-medium text-gray-700 dark:text-gray-200"> Amount</span>

                        <input type="text" required id="bank_account_name" placeholder="Search Vendor/business"
                          class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm dark:text-white" />
                      </label>

                    </div>
                  </div>



                  <div class="w-full flex justify-end">
                    <Button type="submit"
                      class="bg-[#F97316] hover:bg-[#EA580C] text-white py-3 rounded-lg font-medium transition-colors"
                      v-slot:child>
                      Pay Securely
                    </Button>
                  </div>
                </form>
                <div class="p-4">
                    <div class="bg-white rounded-lg shadow-sm p-4 mb-4">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center">
                          <div class="w-10 h-10 rounded-full bg-purple/20 flex items-center justify-center">
                            <span class="text-purple font-bold">AZ</span>
                          </div>
                          <div class="ml-3">
                            <p class="font-medium">Payment to FashionMall</p>
                            <p class="text-xs text-gray-500">Transaction #43921</p>
                          </div>
                        </div>
                        <div class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Protected
                        </div>
                      </div>
                    </div>

                    <div class="bg-white rounded-lg shadow-sm p-4 mb-4">
                      <div class="space-y-3">
                        <div class="flex justify-between items-center">
                          <span class="text-sm text-gray-600">Amount</span>
                          <span class="font-semibold">$149.99</span>
                        </div>
                        <div class="flex justify-between items-center">
                          <span class="text-sm text-gray-600">Protection Fee</span>
                          <span class="font-semibold">$1.50</span>
                        </div>
                        <div class="flex justify-between items-center">
                          <span class="text-sm text-gray-600">Delivery</span>
                          <span class="font-semibold">$4.99</span>
                        </div>
                        <div class="h-px bg-gray-200 my-2"></div>
                        <div class="flex justify-between items-center">
                          <span class="font-medium">Total</span>
                          <span class="font-bold text-lg">$156.48</span>
                        </div>
                      </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                      <Button class="bg-gray-100 hover:bg-gray-200 py-3 rounded-lg  font-medium transition-colors" v-slot:child>
                        Cancel
                      </Button>
                      <Button class="bg-[#F97316] hover:bg-[#EA580C]r text-white py-3 rounded-lg font-medium transition-colors" v-slot:child>
                        Pay Securely
                      </Button>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </section>

</template>

<style scoped></style>