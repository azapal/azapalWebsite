<script setup>
import HeroBasicUi from '../components/ui/HeroBasicUI.vue';
import FeatureUi from '../components/ui/FeatureUI.vue';
import Layout from './Layout.vue';
import StoreUtils from "../utils/storeUtils.js";

import { ref, onMounted, watch, onBeforeUnmount, computed } from 'vue';

const store = StoreUtils;
const getVideoState = store.get('video', 'getIsPaused');
const useType = store.get('global', 'getUseType');

// Animation control
const isAnimating = ref(true);
const currentStep = ref(0);
let intervals = [];

// Content configuration
const content = computed(() => {
  const isBusinessType = useType.value === 'business';

  return {
    line1: {
      base: "We're Building The Future Of ",
      deleted: "ECommerce",
      replaced: "Social Commerce."
    },
    line2: {
      start: isBusinessType ? "Automating" : "Worry Less",
      middle: isBusinessType ? "Logistics" : "When",
      end: isBusinessType ? " For Your " : "You Are",
      final: isBusinessType ? "Online Business." : "Buying Or Selling Online"
    }
  };
});

// Reactive refs for typed text
const typedLine1 = ref('');
const typedReplaced = ref('');
const typedLine2Start = ref('');
const typedMidWord = ref('');
const typedLine2End = ref('');
const typedEndWord = ref('');

// Display states
const showDeleted = ref(false);
const showLine1 = ref(true);
const showLine2 = ref(false);

// Animation constants
const TYPING_SPEED = 60;
const TRANSITION_DELAY = 800;

function pauseOrPlay() {
  store.dispatch('video', 'pausePlay');
}

function clearAllIntervals() {
  intervals.forEach(interval => clearInterval(interval));
  intervals = [];
}

function typeText(text, targetRef, speed = TYPING_SPEED, callback) {
  if (!isAnimating.value) return;

  let i = 0;
  const interval = setInterval(() => {
    if (!isAnimating.value) {
      clearInterval(interval);
      return;
    }

    targetRef.value += text[i];
    i++;

    if (i >= text.length) {
      clearInterval(interval);
      const intervalIndex = intervals.indexOf(interval);
      if (intervalIndex > -1) {
        intervals.splice(intervalIndex, 1);
      }
      if (callback) callback();
    }
  }, speed);

  intervals.push(interval);
}

function resetAnimation() {
  clearAllIntervals();

  // Reset all refs
  typedLine1.value = '';
  typedReplaced.value = '';
  typedLine2Start.value = '';
  typedMidWord.value = '';
  typedLine2End.value = '';
  typedEndWord.value = '';

  // Reset display states
  showDeleted.value = false;
  showLine1.value = true;
  showLine2.value = false;
  currentStep.value = 0;
}

function startAnimation() {
  if (!isAnimating.value) return;

  const { line1, line2 } = content.value;

  // Step 1: Type Line 1 base
  currentStep.value = 1;
  typeText(line1.base, typedLine1, TYPING_SPEED, () => {
    if (!isAnimating.value) return;

    showDeleted.value = true;

    // Step 2: Type replaced word
    currentStep.value = 2;
    typeText(line1.replaced, typedReplaced, TYPING_SPEED, () => {
      if (!isAnimating.value) return;

      // Step 3: Transition to Line 2
      currentStep.value = 3;
      setTimeout(() => {
        if (!isAnimating.value) return;

        showLine1.value = false;
        showLine2.value = true;

        // Step 4: Type Line 2 parts
        currentStep.value = 4;
        typeText(line2.start, typedLine2Start, TYPING_SPEED, () => {
          if (!isAnimating.value) return;

          typeText(line2.middle, typedMidWord, TYPING_SPEED, () => {
            if (!isAnimating.value) return;

            typeText(line2.end, typedLine2End, TYPING_SPEED, () => {
              if (!isAnimating.value) return;

              typeText(line2.final, typedEndWord, TYPING_SPEED, () => {
                currentStep.value = 5; // Animation complete
              });
            });
          });
        });
      }, TRANSITION_DELAY);
    });
  });
}

// Computed properties for cursor display
const showLine1Cursor = computed(() => {
  return showLine1.value && (
      (currentStep.value === 1 && !typedLine1.value.endsWith(content.value.line1.base.slice(-1))) ||
      (currentStep.value === 2 && !typedReplaced.value.endsWith(content.value.line1.replaced.slice(-1)))
  );
});

const showLine2Cursor = computed(() => {
  return showLine2.value &&
      currentStep.value === 4 &&
      !typedEndWord.value.endsWith(content.value.line2.final.slice(-1));
});

// Watch for useType changes and restart animation
watch(useType, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    resetAnimation();
    startAnimation();
  }
}, { immediate: false });

onMounted(() => {
  startAnimation();
});

onBeforeUnmount(() => {
  isAnimating.value = false;
  clearAllIntervals();
});
</script>

<template>
  <Layout v-slot:body>
    <HeroBasicUi v-slot:content>
      <!-- Video control button -->
      <button
          @click="pauseOrPlay"
          class="absolute z-40 flex items-center bottom-[-60px] lg:right-20 right-0 justify-center"
          aria-label="Toggle video playback"
      >
        <div class="bg-white cursor-pointer shadow-md hover:scale-105 text-black w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300">
          <span v-if="getVideoState" aria-hidden="true">▶</span>
          <span v-else aria-hidden="true">❚❚</span>
        </div>
      </button>

      <div class="flex flex-col">
        <div class="justify-center w-full bg-cover bg-center space-y-8 lg:min-h-[260px] min-h-[280px] max-w-xl">
          <div class="animate-fade-in">
            <div class="relative">
              <!-- Line 1 -->
              <transition name="fade">
                <h1
                    v-if="showLine1"
                    class="text-5xl lg:text-[48px] font-bold leading-tight text-white"
                >
                  {{ typedLine1 }}
                  <template v-if="showDeleted">
                    <del class="text-gray-400 ml-2">{{ content.line1.deleted }}</del>
                    <span class="bg-gradient-to-r from-[#F97316] to-[#2563EB] text-transparent bg-clip-text ml-2">
                      {{ typedReplaced }}
                    </span>
                  </template>
                  <span
                      v-if="showLine1Cursor"
                      class="text-white animate-pulse"
                      aria-hidden="true"
                  >|</span>
                </h1>
              </transition>

              <!-- Line 2 -->
              <transition name="fade">
                <h1
                    v-if="showLine2"
                    class="text-5xl lg:text-[52px] font-bold leading-tight text-white"
                >
                  {{ typedLine2Start }}
                  <span class="bg-gradient-to-r from-[#F97316] to-[#2563EB] text-transparent bg-clip-text">
                    {{ typedMidWord }}
                  </span>
                  {{ typedLine2End }}
                  <span class="bg-gradient-to-r from-[#F97316] to-[#2563EB] text-transparent bg-clip-text">
                    {{ typedEndWord }}
                  </span>
                  <span
                      v-if="showLine2Cursor"
                      class="text-white animate-pulse"
                      aria-hidden="true"
                  >|</span>
                </h1>
              </transition>
            </div>
          </div>

          <!-- Commented out partners section -->
          <!--
          <div class="flex flex-col gap-3">
            <p class="leading-tight text-sm text-white">Building with trusted logistics partners</p>
            <div class="flex gap-5">
              <img src="../assets/images/spoonel_service_men_logo.jpeg" class="w-12" alt="logistic-logo"/>
              <img src="../assets/images/spoonel_service_men_logo.jpeg" class="w-12" alt="logistic-logo"/>
              <img src="../assets/images/spoonel_service_men_logo.jpeg" class="w-12" alt="logistic-logo"/>
            </div>
          </div>
          -->
        </div>

        <!-- CTA buttons -->
        <div class="flex -translate-y-5 gap-3 mt-12">
          <router-link to="/create-account">
            <p class="bg-[#F97316]/90 shadow-sm text-sm hover:bg-[#F97316] text-white rounded-[8px] px-8 py-3 transition-colors duration-200">
              Join Private Beta
            </p>
          </router-link>
          <router-link to="/signup">
            <button class="text-sm text-[#F97316] p-4 hover:text-[#F97316]/80 transition-colors duration-200">
              or Contact Sales
            </button>
          </router-link>
        </div>
      </div>

      <!-- Lottie animation (commented out) -->
      <!--
      <DotLottieVue
        class="absolute lg:relative"
        style="width: 1000px"
        autoplay
        loop
        src="https://lottie.host/962777ee-49de-49b9-8777-e227d2c6ff36/si6hHkhET3.lottie"
      />
      -->
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