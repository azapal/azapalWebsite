<script setup>
import { ArrowRight } from "lucide-vue-next";
import Button from "./ui/button.vue";
</script>
<template>

<section class="py-20 relative overflow-hidden">
      <div class="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1500px] h-[600px] opacity-10">
          <div class="absolute inset-0 blur-[80px] bg-gradient-to-br from-[#F97316] to-[#2563EB]"></div>
        </div>
      </div>

      <div class="container mx-auto px-4 md:px-6">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">
            Ready to make your online transactions <span class="bg-gradient-to-r from-[#EA580C] to-[#2563EB] text-transparent bg-clip-text">safer</span>?
          </h2>
          <p class="text-lg text-gray-600 mb-8">
            Join thousands of buyers and sellers who trust Azapal for secure payments and seamless deliveries.
          </p>
          
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <router-link to="/signup">
              <Button class="bg-[#F97316] flex items-center rounded-md hover:bg-[#F97316]-dark text-white px-6 py-6 text-xs cursor-pointer" v-slot:child>
                Create Free Account
                <ArrowRight class="ml-2 h-5 w-5" />
              </Button>
            </router-link>
            <Button class="border-[#F97316] border-1 text-[#F97316] rounded-md hover:bg-[#F97316] hover:text-white cursor-pointer px-6 py-6 text-xs" v-slot:child>
              Contact Sales
            </Button>
          </div>

          <div class="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p class="text-3xl font-bold bg-gradient-to-r from-[#EA580C] to-[#2563EB] text-transparent bg-clip-text">20k+</p>
              <p class="text-gray-600">Happy Customers</p>
            </div>
            <div>
              <p class="text-3xl font-bold bg-gradient-to-r from-[#EA580C] to-[#2563EB] text-transparent bg-clip-text">5k+</p>
              <p class="text-gray-600">Verified Vendors</p>
            </div>
            <div>
              <p class="text-3xl font-bold bg-gradient-to-r from-[#EA580C] to-[#2563EB] text-transparent bg-clip-text">99.9%</p>
              <p class="text-gray-600">Secure Transactions</p>
            </div>
            <div>
              <p class="text-3xl font-bold bg-gradient-to-r from-[#EA580C] to-[#2563EB] text-transparent bg-clip-text">24/7</p>
              <p class="text-gray-600">Customer Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>
<style></style>