<script setup>
import HeroBasicUi from '../components/ui/HeroBasicUI.vue';
import FeatureUi from '../components/ui/FeatureUI.vue';
import Layout from './Layout.vue';
// import {DotLottieVue} from "@lottiefiles/dotlottie-vue";
import StoreUtils from "../utils/storeUtils.js";

import { ref, onMounted } from 'vue';

const store = StoreUtils
const getVideoState = store.get('video', 'getIsPaused')

const line1 = `We are building the future of `;
const deletedWord = `ECommerce`;
const replacedWord = `Social Commerce.`;

const line2Start = `Automating `;
const midWord = `Logistics`;
const line2End = ` for your `;
const endWord = `Online Business.`;

const typedLine1 = ref('');
const showDeleted = ref(false);
const typedReplaced = ref('');

const showLine1 = ref(true);
const showLine2 = ref(false);
const typedLine2Start = ref('');
const typedMidWord = ref('');
const typedLine2End = ref('');
const typedEndWord = ref('');

function pauseOrPlay(){
  store.dispatch('video', 'pausePlay')
}

onMounted(() => {
  // Step 1: Type Line 1 base
  typeText(line1, typedLine1, 60, () => {
    showDeleted.value = true;

    // Step 2: Type replaced word
    typeText(replacedWord, typedReplaced, 60, () => {
      // Step 3: Delay, then hide Line 1 and show Line 2
      setTimeout(() => {
        showLine1.value = false;
        showLine2.value = true;

        // Step 4: Type Line 2 parts
        typeText(line2Start, typedLine2Start, 60, () => {
          typeText(midWord, typedMidWord, 60, () => {
            typeText(line2End, typedLine2End, 60, () => {
              typeText(endWord, typedEndWord, 60);
            });
          });
        });
      }, 800); // delay before switching to line 2
    });
  });
});

function typeText(full, targetRef, speed = 60, callback) {
  let i = 0;
  const interval = setInterval(() => {
    targetRef.value += full[i];
    i++;
    if (i >= full.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, speed);
}
</script>

<template>
  <Layout v-slot:body>

    <HeroBasicUi v-slot:content>
      <button @click="pauseOrPlay" class="absolute z-40 flex items-center   bottom-[-60px] lg:right-20 right-0 justify-center">
        <div class="bg-white cursor-pointer shadow-md hover:scale-105 text-black w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300">
          <span v-if="getVideoState">▶</span>
          <span v-else>❚❚</span>
        </div>
      </button>
      <div class="flex flex-col ">
      <div class="justify-center w-full bg-cover bg-center space-y-8 lg:min-h-[260px] min-h-[280px]  max-w-xl" >
        <div class=" animate-fade-in">
          <div class="">
            <!-- Line 1 -->
            <transition name="fade">
              <h1 v-if="showLine1" class="text-5xl lg:text-5xl font-bold leading-tight text-white">
                {{ typedLine1 }}
                <template v-if="showDeleted">
                  <del class="text-gray-400 ml-2">{{ deletedWord }}</del>
                  <span class="bg-gradient-to-r from-[#F97316] to-[#2563EB] text-transparent bg-clip-text ml-2">{{ typedReplaced }}</span>
                </template>
                <span v-if="!typedReplaced.endsWith(replacedWord.slice(-1))" class="text-white animate-pulse">|</span>
              </h1>
            </transition>

            <!-- Line 2 -->
            <transition name="fade">
              <h1 v-if="showLine2" class="text-5xl lg:text-6xl font-bold leading-tight text-white">
                {{ typedLine2Start }}
                <span class="bg-gradient-to-r from-[#F97316] to-[#2563EB] text-transparent bg-clip-text">
                  {{ typedMidWord }}
                </span>
                {{ typedLine2End }}
                <span class="bg-gradient-to-r from-[#F97316] to-[#2563EB] text-transparent bg-clip-text">
                {{ typedEndWord }}</span>
                <span v-if="!typedEndWord.endsWith(endWord.slice(-1))" class="text-white animate-pulse">|</span>
              </h1>
            </transition>
          </div>

        </div>
<!--        <div class="flex flex-col  gap-3">-->

<!--          <p class="leading-tight text-sm text-white">Building with trusted logistics partners</p>-->
<!--          <div class="flex gap-5">-->
<!--            <img src="../assets/images/spoonel_service_men_logo.jpeg" class="w-12" alt="logistic-logo"/>-->
<!--            <img src="../assets/images/spoonel_service_men_logo.jpeg" class="w-12" alt="logistic-logo"/>-->
<!--            <img src="../assets/images/spoonel_service_men_logo.jpeg" class="w-12" alt="logistic-logo"/>-->
<!--          </div>-->
<!--        </div>-->
      </div>
      <div class="flex  -translate-y-5 gap-3 mt-12 ">
        <router-link to="/create-account">
          <p class="bg-[#F97316]/90 shadow-sm text-sm hover:bg-[#F97316] text-white rounded-[8px] px-8 py-3">
            Join Private Beta
          </p>
        </router-link>
        <router-link to="/signup">
          <button class="text-sm text-[#F97316] p-4">
            or Contact Sales
          </button>
        </router-link>
      </div>
      </div>

      <!--      <DotLottieVue class="absolute lg:relative" style=" width: 1000px" autoplay loop src="https://lottie.host/962777ee-49de-49b9-8777-e227d2c6ff36/si6hHkhET3.lottie" />-->

    </HeroBasicUi>
    <FeatureUi />
  </Layout>
  
</template>

<style scoped>

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blink {
  0%, 100% {
    border-color: transparent;
  }
  50% {
    border-color: white;
  }
}

.typewriter {
  animation: typing 2.5s steps(20, end), blink 0.75s step-end infinite;
  width: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
