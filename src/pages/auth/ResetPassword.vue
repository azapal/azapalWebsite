<script lang="ts" setup>
import {ref, onMounted, onUnmounted} from "vue";
import router from "../../router";
import StoreUtils from '../../utils/storeUtils'
import {
  ResetPasswordRequest,
  SendEmailOtpRequest,
  LoginRequest,
} from "../../model/request/auth/authenticationRequest";
import {notify} from "../../utils/toast.ts";
import {Eye, EyeClosed} from "lucide-vue-next"


const emailSent = ref(false);
const store = StoreUtils
const loading = ref(false)

const resetPasswordRequestModel = ref(ResetPasswordRequest)
const passwordVisible = ref(false)
// Countdown timer for resend (120 seconds = 2 minutes)
const countdown = ref(120);
let countdownInterval:any = null;

// Format time to mm:ss
const formatTime = (seconds:any) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

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


const handleSendEmailOtp = async () => {
  loading.value = true
  SendEmailOtpRequest.email = resetPasswordRequestModel.value.email;

  try{
    const response = await store.dispatch('auth','sendEmailOtp',SendEmailOtpRequest)
    const responseData = response.data
    if(responseData.response_code === "00"){
      loading.value = false
      notify(responseData.response_message, 'success');
      emailSent.value = true
      startCountdown();

    }else{
      notify(responseData.response_message, 'success');
      loading.value = false

    }

  }catch(err:any){
    loading.value = false
    if(err?.response?.data){
      notify(String(err.response.data.message), 'error');
    }else{
      notify(String(err), 'error');
    }


  }
}

const handleResetPassword  = async () => {
  loading.value = true;
  try{

    const response = await store.dispatch('auth', 'resetPassword', resetPasswordRequestModel.value);
    console.log(response)
    let responseData = response.data
    loading.value = false;

    if(responseData.code === "00"){
      notify(responseData.message, 'success');
      LoginRequest.email = resetPasswordRequestModel.value.email;
      await router.push({path: "/login"})
    }else{
      notify(responseData.message, 'error');
    }
  }catch(err){
    loading.value = false
    console.log('error:', err)
    notify(String(err), 'error');
  }

}

// Resend OTP function
const resendOTP = () => {
  if (countdown.value > 0) return;

  // Start countdown timer again
  startCountdown();

  // Show confirmation message
  handleSendEmailOtp()
};


const handleResetPasswordProcess = () => {
  if(emailSent.value){
   handleResetPassword()
  }else{
    handleSendEmailOtp()
  }
}


onMounted(() => {
  // Start the initial countdown

});

// Clean up on component unmount
onUnmounted(() => {
  clearInterval(countdownInterval);
});

</script>
<template>
<!--  <OtpValidation v-if="showOtpScreen" page="login" :data="resetPasswordRequestModel" />-->
  <div class="min-h-screen flex flex-col bg-white">
    <div class="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <div class="w-full max-w-md">
        <div class="text-center lg:mb-8 mb-4">
          <a href="/"
             class="lg:text-3xl text-lg font-bold bg-gradient-to-r from-[#F97316] to-[#2563EB] text-transparent bg-clip-text inline-block lg:mb-4 mb-2">
            Aza-pal
          </a>
          <h1 class="lg:text-2xl text-lg font-bold text-gray-900 mb-2">Reset Your Password</h1>
        </div>

        <form @submit.prevent="handleResetPasswordProcess" class="space-y-5">
          <label v-if="!emailSent" for="login_email"
                 class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600 ">
            <span class="text-xs font-medium text-gray-700 "> email </span>

            <input type="email" v-model="resetPasswordRequestModel.email" id="login_email" placeholder="example@email.com"
                   class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm " required />
          </label>

          <div  v-if="emailSent">
            <label for="verify_otp"
                   class="block relative mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600 ">
              <span class="text-xs font-medium text-gray-700 "> OTP </span>

              <input type="text" v-model="resetPasswordRequestModel.otp" id="verify_otp" placeholder="enter value"
                     class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm " />

            </label>

            <label for="reset_password"
                   class="block relative mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600 ">
              <span class="text-xs font-medium text-gray-700 "> password </span>

              <input :type="passwordVisible ? 'text': 'password'" v-model="resetPasswordRequestModel.password" id="reset_password" placeholder="********"
                     class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm " />

              <span class="absolute top-8 right-5 cursor-pointer" @click="passwordVisible = !passwordVisible">
                <Eye v-if="passwordVisible"></Eye>
                <EyeClosed v-else></EyeClosed>
              </span>
            </label>

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



          <button type="submit" :class="`w-full bg-[#F97316] hover:bg-orange-400 rounded-[12px] p-[8px] cursor-pointer text-white ${loading && ('cursor-pointer:not-allowed')}`"
                  :disabled="loading">
            {{ loading ? "Please chillax, it's working." : emailSent ? "Proceed" : "Send Verification Email" }}
          </button>
        </form>

        <div class="text-center mt-6">
          <p class="text-gray-600">
            Never mind?
            <a href="/login" class="text-[#F97316] font-medium">
              Cancel
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>