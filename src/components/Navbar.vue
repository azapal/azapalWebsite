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

    <header :class="`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`">
        <div class="container mx-auto px-4 md:px-6">
        <div class="flex items-center justify-between py-4">
          <div class="flex items-center">
            <router-link to="/" class="text-2xl font-bold  bg-gradient-to-r from-[#EA580C] to-[#2563EB] text-transparent bg-clip-text">
              Azapal
            </router-link>
          </div>

          <!-- Desktop Menu  -->
          <nav class="hidden md:flex items-center space-x-8">
            <a href="#features" class="text-gray-700 hover:text-[#F97316] font-medium transition-colors">
              Features
            </a>
            <a href="#how-it-works" class="text-gray-700 hover:text-[#F97316] font-medium transition-colors">
              How It Works
            </a>
            <a href="#security" class="text-gray-700 hover:text-[#F97316] font-medium transition-colors">
              Security
            </a>
            <div class="flex items-center space-x-4">
              <Button variant="outline" class="border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-white" v-slot:child>
                Log In
              </Button>
              <router-link to="/signup">
                <Button class="bg-[#F97316] hover:bg-[#F97316]-dark text-white" v-slot:child>
                  Sign Up
                </Button>
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

        <div v-if="isMobileMenuOpen" class="md:hidden bg-white">
          <div class="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a
              href="#features"
              class="text-gray-700 hover:text-[#F97316] font-medium py-2"
              @click="() => isMobileMenuOpen = false"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              class="text-gray-700 hover:text-[#F97316] font-medium py-2"
               @click="() => isMobileMenuOpen = false"
            >
              How It Works
            </a>
            <a
              href="#security"
              class="text-gray-700 hover:text-[#F97316] font-medium py-2"
              @click="() => isMobileMenuOpen = false"
            >
              Security
            </a>
            <div class="flex flex-col space-y-2 pt-2">
              <Button variant="outline" class="border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-white w-full">
                Log In
              </Button>
              <Link to="/signup" class="w-full">
                <Button class="bg-[#F97316] hover:bg-[#F97316]-dark text-white w-full">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      


    </header>
</template>
<style></style>