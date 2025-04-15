<template>
    <div class="fixed w-full h-full bg-gray z-40 bg-black/50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <!-- Header -->
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Verification Code</h2>
          <p class="text-gray-600 mt-2">
            Please enter the 5-digit verification code sent to your device
          </p>
        </div>
  
        <!-- OTP Input Field -->
        <div class="mb-6">
          <label for="otp-input" class="sr-only">Enter OTP</label>
          
          <!-- Container for OTP inputs -->
          <div class="flex justify-center flex-wrap gap-2 sm:gap-3">
            <template v-for="(digit, index) in 5" :key="index">
              <input
                :id="`otp-input-${index}`"
                ref="inputRefs"
                type="text"
                inputmode="numeric"
                pattern="[0-9]*"
                maxlength="1"
                v-model="otpDigits[index]"
                @input="handleInput(index)"
                @keydown="handleKeyDown($event, index)"
                @paste="handlePaste"
                @focus="$event.target.select()"
                @click="$event.target.select()"
                class="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </template>
          </div>
          
          <!-- Error message -->
          <p v-if="errorMessage" class="text-red-500 mt-2 text-center">
            {{ errorMessage }}
          </p>
        </div>
  
        <!-- Action Buttons -->
        <div v-if="loading" class="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>

        <div v-else class="space-y-3">

          <button 
            @click="verifyOTP" 
            :disabled="!isComplete"
            class="w-full py-3 bg-orange-500 text-white rounded-md font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            style="background-color: #F97316;"
          >
            Verify
          </button>
          
          <div class="text-center">
            <button 
              @click="resendOTP" 
              :disabled="countdown > 0" 
              class="text-orange-500 hover:text-orange-700 font-medium focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              :class="{ 'opacity-50 cursor-not-allowed': countdown > 0 }"
              style="color: #F97316;"
            >
              {{ countdown > 0 ? `Resend Code in ${formatTime(countdown)}` : 'Resend Code' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
  import StoreUtils from '../../utils/storeUtils';
  import { SendOtpRequest } from '../../model/request/auth/authenticationRequest';
  import { CreateBusinessRequest } from '../../model/request/business/businessRequest';
  import { SignupRequest } from '../../model/request/auth/authenticationRequest';

  const props = defineProps({
    page:String,
    data:{}
  })
  // Array to store OTP digits (6 digits)
  const otpDigits = ref(['', '', '', '', '']);
  const inputRefs = ref([]);
  const errorMessage = ref('');
  const store = StoreUtils

  const loading = store.get('business', 'getLoading')
  const isVerificationDone = store.get('business', 'isVerificationDone')
  // Countdown timer for resend (120 seconds = 2 minutes)
  const countdown = ref(120);
  let countdownInterval = null;
  
  // Check if OTP is complete (all digits filled)
  const isComplete = computed(() => {
    return otpDigits.value.every(digit => digit !== '');
  });
  
  // Format time to mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Start countdown timer
  const startCountdown = () => {
    countdown.value = 20; // 2 minutes
    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
      if (countdown.value > 0) {
        countdown.value--;
      } else {
        clearInterval(countdownInterval);
      }
    }, 1000);
  };
  
  // Focus specific input by index
  const focusInput = (index) => {
    if (inputRefs.value && inputRefs.value[index]) {
      nextTick(() => {
        inputRefs.value[index].focus();
        inputRefs.value[index].select();
      });
    }
  };
  
  // Focus first input on component mount and start countdown
  onMounted(() => {
    // Focus the first input after a slight delay to ensure DOM is ready
    setTimeout(() => {
      focusInput(0);
    }, 100);
    
    // Start the initial countdown
    startCountdown();
  });
  
  // Clean up on component unmount
  onUnmounted(() => {
    clearInterval(countdownInterval);
  });
  
  // Handle input changes
  const handleInput = (index) => {
    // Clear error message when user starts typing
    errorMessage.value = '';
    
    // Ensure only numeric input
    otpDigits.value[index] = otpDigits.value[index].replace(/[^0-9]/g, '');
    
    // Move to next input if current one is filled and not the last input
    if (otpDigits.value[index] !== '' && index < 4) {
      focusInput(index + 1);
    }
  };
  
  // Handle key presses
  const handleKeyDown = (event, index) => {
    // Handle backspace
    if (event.key === 'Backspace') {
      if (otpDigits.value[index] === '' && index > 0) {
        // Move to previous input if current is empty
        otpDigits.value[index - 1] = '';
        focusInput(index - 1);
      }
    }
    
    // Handle arrow keys
    if (event.key === 'ArrowLeft' && index > 0) {
      focusInput(index - 1);
    }
    
    if (event.key === 'ArrowRight' && index < 4) {
      focusInput(index + 1);
    }
  };
  
  // Handle paste event
  const handlePaste = (event) => {
    // Prevent default paste behavior
    event.preventDefault();
    
    // Get pasted data
    const pastedData = (event.clipboardData || window.clipboardData).getData('text');
    
    // Process only if numeric data
    if (/^\d+$/.test(pastedData)) {
      // Get first 6 digits only
      const digits = pastedData.substring(0, 4).split('');
      
      // Fill the inputs
      digits.forEach((digit, index) => {
        if (index < 5) {
          otpDigits.value[index] = digit;
        }
      });
      
      // Focus the appropriate input after paste
      const lastIndex = Math.min(digits.length, 4) - 1;
      if (lastIndex >= 0) {
        focusInput(lastIndex);
      }
      
      // If all fields are filled, focus last one
      if (digits.length >= 5) {
        focusInput(4);
      }
      
      // Clear any previous error
      errorMessage.value = '';
    } else {
      errorMessage.value = 'Please paste numeric digits only';
    }
  };
  
  // Verify OTP function
  const verifyOTP = async () => {
    if (isComplete.value) {
      const otpValue = otpDigits.value.join(''); 
      if(props.page === 'signup') await store.dispatch('auth', 'verifyInitiatingOtp', {otp:otpValue, email: props?.data?.email});

      if(props.page === 'business') await store.dispatch('auth', 'verifyOtp', otpValue);

      if(isVerificationDone){
        if(props?.page === 'signup') await store.dispatch('auth', 'signUp', SignupRequest);
        if(props?.page === 'business'){
          CreateBusinessRequest.category = props?.data?.type
          await store.dispatch('business', 'createBusiness', CreateBusinessRequest);
        }
      }
  };
}
  
  // Resend OTP function
  const resendOTP = () => {
    if (countdown.value > 0) return;
    
    console.log('Resending OTP...');
    // Here you would trigger the resend OTP API call
    
    // Reset the form
    otpDigits.value = ['', '', '', '', ''];
    errorMessage.value = '';
    
    // Focus first input
    focusInput(0);
    
    // Start countdown timer again
    startCountdown();
    
    // Show confirmation message
    store.dispatch('auth', 'sendOtp', SendOtpRequest)
  };
  </script>