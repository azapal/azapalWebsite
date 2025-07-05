<!--<script setup>-->
<!--import { ref, onMounted } from 'vue';-->
<!--import { X, Menu, ChevronDown, Crown } from "lucide-vue-next";-->

<!--let isScrolled = ref(false);-->

<!--let isMobileMenuOpen = ref(false);-->

<!--onMounted(() => {-->
<!--    const handleScroll = () => {-->
<!--      if (window.scrollY > 10) {-->
<!--        isScrolled.value = true;-->
<!--      } else {-->
<!--        isScrolled.value = false;-->

<!--      }-->
<!--    };-->

<!--    window.addEventListener("scroll", handleScroll);-->
<!--    return () => window.removeEventListener("scroll", handleScroll);-->
<!--})-->

<!--</script>-->
<!--<template>-->

<!--    <header :class="`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/50' : 'bg-transparent'}`">-->
<!--        <div class="mx-auto px-4 md:px-6">-->
<!--        <div class="flex items-center justify-between py-4">-->
<!--          <div class="flex items-center gap-5 justify-center">-->
<!--            <router-link to="/" class="text-2xl font-bold  bg-gradient-to-r from-[#EA580C] to-[#2563EB] text-transparent bg-clip-text">-->
<!--              Azapal-->
<!--            </router-link>-->

<!--            <div class="relative why-aza-pal-div hidden md:flex">-->
<!--              <router-link to="" :class="`flex items-center font-bold text-md  ${isScrolled ? 'text-black' : 'text-white'}`">Why Azapal <ChevronDown size="18" /></router-link>-->
<!--              <div class="absolute why-aza-pal-dropdown w-[500px] bg-white shadow-md rounded mt-1 px-4 py-4">-->
<!--                <div class="flex p-2 gap-5 justify-between items-center">-->
<!--                  <div class=" ">-->
<!--                    <div class="w-[40px] h-[40px] bg-gradient-to-r from-[#EA580C] to-[#2563EB] rounded-[360px] flex items-center justify-center">-->
<!--                      <Crown class="text-white" />-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <div class="max-w-3xl">-->
<!--                    <div>-->
<!--                      <p>We’re redefining trust in African social commerce.</p>-->
<!--                      <p class="text-sm text-[#8C8C8C]">Azapal offers a secure, mobile-first payment system that protects both buyers and sellers—especially on platforms like WhatsApp, Instagram, and TikTok.-->
<!--                        From verified transactions to dispatch automation, we help you sell confidently and buy safely.</p>-->

<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->

<!--              </div>-->

<!--            </div>-->
<!--            <router-link to="" :class="`flex items-center font-bold text-md  ${isScrolled ? 'text-black' : 'text-white'}`">Pricing</router-link>-->
<!--          </div>-->

<!--          &lt;!&ndash; Desktop Menu  &ndash;&gt;-->
<!--          <nav class="hidden md:flex items-center space-x-8">-->
<!--            <div class="flex items-center space-x-4">-->
<!--              <div class="group">-->
<!--                <div class="relative  hidden md:flex border">-->
<!--                  <router-link to="" :class="`flex items-center font-bold text-md  ${isScrolled ? 'text-black' : 'text-white'}`">Developers <ChevronDown size="18"/></router-link>-->
<!--                </div>-->
<!--                <div-->
<!--                    class="bg-white absolute bottom-0 shadow-md rounded mt-1 px-4 py-4 hidden group-hover:flex flex-col z-10"-->
<!--                >-->

<!--                  <p class="font-semibold">Overview</p>-->

<!--                </div>-->
<!--              </div>-->
<!--              <router-link to="" :class="`flex items-center font-bold text-md ${isScrolled ? 'text-black' : 'text-white'}`">Support <ChevronDown size="18"/></router-link>-->
<!--              <router-link to="" :class="`flex items-center font-bold text-md  ${isScrolled ? 'text-black' : 'text-white'}`">Login</router-link>-->

<!--              <router-link to="/create-account">-->
<!--                <button class="bg-[#F97316]/90 shadow-sm text-sm hover:bg-[#F97316] text-white rounded-[8px] px-8 py-3">-->
<!--                  Join Private Beta-->
<!--                </button>-->
<!--              </router-link>-->
<!--            </div>-->
<!--          </nav>-->

<!--           &lt;!&ndash; Mobile Menu Button  &ndash;&gt;-->
<!--          <button-->
<!--            class="md:hidden text-gray-700"-->
<!--             @click="() => isMobileMenuOpen = !isMobileMenuOpen"-->
<!--          >-->
<!--            <X size="24" v-if="isMobileMenuOpen" ></X>-->
<!--            <Menu size="24"  v-else ></Menu>-->
<!--          </button>-->
<!--        </div>-->
<!--      </div>-->

<!--       &lt;!&ndash; Mobile Menu  &ndash;&gt;-->

<!--        <div v-if="isMobileMenuOpen" class="md:hidden ">-->
<!--          <div class="container mx-auto px-4 py-4 flex flex-col space-y-4">-->
<!--            <div class="flex flex-col space-y-2 pt-2">-->
<!--              <router-link to="/create-account" class="w-full">-->
<!--                <p class="bg-[#F97316] hover:bg-[#F97316]-dark text-white w-full">-->
<!--                  Join Private Beta-->
<!--                </p>-->
<!--              </router-link>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->



<!--    </header>-->
<!--</template>-->
<!--<style>-->
<!--.why-aza-pal-div:hover > .why-aza-pal-dropdown{-->
<!--  display: block;-->
<!--}-->

<!--.why-aza-pal-dropdown{-->
<!--  display: none;-->
<!--}-->
<!--</style>-->


<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { X, Menu, ChevronDown, Crown } from "lucide-vue-next";

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <header
      :class="`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/70 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`"
  >
    <div class="mx-auto px-4 md:px-6">
      <div class="flex items-center justify-between py-4">
        <!-- Logo & Left Links -->
        <div class="flex items-center gap-5">
          <router-link
              to="/"
              class="text-2xl font-bold bg-gradient-to-r from-[#EA580C] to-[#2563EB] text-transparent bg-clip-text"
          >
            Azapal
          </router-link>

          <!-- Why Azapal (Dropdown) -->
          <div class="relative hidden md:flex group">
            <router-link
                to=""
                :class="`flex items-center font-bold text-md ${
                isScrolled ? 'text-black' : 'text-white'
              }`"
            >
              Why Azapal <ChevronDown size="18" />
            </router-link>
            <div
                class="absolute w-[500px] bg-white shadow-md rounded mt-1 px-4 py-4 hidden group-hover:flex flex-col z-10"
            >
              <div class="flex p-2 gap-5 justify-between items-center">
                <div>
                  <div
                      class="w-[40px] h-[40px] bg-gradient-to-r from-[#EA580C] to-[#2563EB] rounded-full flex items-center justify-center"
                  >
                    <Crown class="text-white" />
                  </div>
                </div>
                <div class="max-w-3xl">
                  <p class="font-semibold">
                    We’re redefining trust in African social commerce.
                  </p>
                  <p class="text-sm text-[#8C8C8C]">
                    Azapal offers a secure, mobile-first peer-to-peer(P2P) payment system that protects both buyers and sellers, especially on platforms like WhatsApp, Jiji, Instagram, and TikTok. From verified transactions to dispatch automation, we help you sell confidently and buy safely.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Pricing -->
          <router-link
              to=""
              :class="`hidden md:flex items-center font-bold text-md ${
              isScrolled ? 'text-black' : 'text-white'
            }`"
          >
            Pricing
          </router-link>
        </div>

        <!-- Right Navigation -->
        <nav class="hidden md:flex items-center space-x-6">
          <!-- Developers Dropdown -->
          <div class="relative group">
            <div class="flex items-center">
              <router-link
                  to=""
                  :class="`flex items-center font-bold text-md ${
                  isScrolled ? 'text-black' : 'text-white'
                }`"
              >
                Developers <ChevronDown size="18" />
              </router-link>
            </div>
            <transition name="slide-up">
            <div
                class="absolute top-full left-0 mt-1 bg-white shadow-md rounded px-4 py-4 hidden group-hover:flex flex-col z-10 w-40"
            >
              <router-link to="/" class="text-sm hover:underline mb-2">Overview</router-link>
              <router-link to="/" class="text-sm hover:underline">API Docs</router-link>
            </div>
            </transition>
          </div>

          <!-- Other Links -->
          <div class="relative group">
            <div class="flex items-center">
              <router-link
                  to=""
                  :class="`flex items-center font-bold text-md ${
                  isScrolled ? 'text-black' : 'text-white'
                }`"
              >
                Support <ChevronDown size="18" />
              </router-link>
            </div>
            <transition name="slide-up">
            <div
                class="absolute top-full left-0 mt-1 bg-white shadow-md rounded px-4 py-4 hidden group-hover:flex flex-col z-10 w-40"
            >

              <router-link to="/" class="text-sm hover:underline mb-2">FAQ</router-link>
              <router-link to="/" class="text-sm hover:underline">Contact us</router-link>
            </div>
            </transition>
          </div>
          <router-link
              to=""
              :class="`flex items-center font-bold text-md ${
              isScrolled ? 'text-black' : 'text-white'
            }`"
          >
            Login
          </router-link>

          <!-- CTA Button -->
          <router-link to="/create-account">
            <button
                class="bg-[#F97316]/90 hover:bg-[#F97316] text-white text-sm rounded-[8px] px-6 py-2 transition"
            >
              Join Private Beta
            </button>
          </router-link>
        </nav>

        <!-- Mobile Menu Toggle -->
        <button class="md:hidden text-white" @click="isMobileMenuOpen = !isMobileMenuOpen">
          <X size="24" v-if="isMobileMenuOpen" />
          <Menu size="24" v-else />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide-up">
      <div v-if="isMobileMenuOpen" class="md:hidden bg-white shadow-lg">
        <div class="px-4 py-4 flex flex-col space-y-4">
          <router-link
              to="/"
              class="text-gray-700 font-semibold hover:text-orange-500"
          >Why Azapal</router-link>
          <router-link
              to=""
              class="text-gray-700 font-semibold hover:text-orange-500"
          >Pricing</router-link>
          <router-link
              to=""
              class="text-gray-700 font-semibold hover:text-orange-500"
          >Developers</router-link>
          <router-link
              to=""
              class="text-gray-700 font-semibold hover:text-orange-500"
          >Support</router-link>
          <router-link
              to=""
              class="text-gray-700 font-semibold hover:text-orange-500"
          >Login</router-link>

          <router-link to="/create-account">
            <button
                class="bg-[#F97316]/90 hover:bg-[#F97316] text-white text-sm rounded-[8px] px-6 py-2"
            >
              Join Private Beta
            </button>
          </router-link>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 300ms ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
