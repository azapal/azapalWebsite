<script setup>
import { ref, onMounted } from 'vue';
import { X, Menu } from "lucide-vue-next";
import Button from './ui/button.vue';

let isScrolled= ref(false);

let isMobileMenuOpen = ref(false);

onMounted(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        isScrolled.value = true;
      } else {
        isScrolled.value = false;

      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
})

</script>
<template>

    <header :class="`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/50' : 'bg-transparent'}`">
        <div class="mx-auto px-4 md:px-6">
        <div class="flex items-center justify-between py-4">
          <div class="flex items-center">
            <router-link to="/" class="text-2xl font-bold  bg-gradient-to-r from-[#EA580C] to-[#2563EB] text-transparent bg-clip-text">
              Azapal
            </router-link>
          </div>

          <!-- Desktop Menu  -->
          <nav class="hidden md:flex items-center space-x-8">
            <div class="flex items-center space-x-4">

              <router-link to="/create-account">
                <button class="bg-[#F97316]/90 shadow-sm text-sm hover:bg-[#F97316] text-white rounded-[8px] px-8 py-3">
                  Create a free account
                </button>
              </router-link>
            </div>
          </nav>

           <!-- Mobile Menu Button  -->
          <button
            class="md:hidden text-gray-700"
             @click="() => isMobileMenuOpen = !isMobileMenuOpen"
          >
            <X size="24" v-if="isMobileMenuOpen" ></X> 
            <Menu size="24"  v-else ></Menu>
          </button>
        </div>
      </div>

       <!-- Mobile Menu  -->

        <div v-if="isMobileMenuOpen" class="md:hidden ">
          <div class="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <div class="flex flex-col space-y-2 pt-2">
              <Link to="/create-account" class="w-full">
                <p class="bg-[#F97316] hover:bg-[#F97316]-dark text-white w-full">
                  Sign Up
                </p>
              </Link>
            </div>
          </div>
        </div>
      


    </header>
</template>
<style></style>