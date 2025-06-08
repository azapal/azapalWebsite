<script lang="ts" setup>
import {ref, onMounted} from "vue";
import router from "../../router";
import StoreUtils from '../../utils/storeUtils'
import {ChangePasswordRequest, SendEmailOtpRequest} from "../../model/request/auth/authenticationRequest";
import {notify} from "../../utils/toast.ts";
import {Eye, EyeClosed} from "lucide-vue-next"


const emailSent = ref(false);

const current_route = router.currentRoute.value.query
const store = StoreUtils
const user = store.get('auth', 'getCurrentUser')
const loading = ref(false)

const changePasswordRequestModel = ref(ChangePasswordRequest)
const passwordVisible = ref(false)

const handleSendEmailOtp = async () => {
  loading.value = true
  SendEmailOtpRequest.email = user.value.email;

  try{
    const response = await store.dispatch('auth','sendEmailOtp',SendEmailOtpRequest)
    const responseData = response.data
    if(responseData.response_code === "00"){
      loading.value = false
      notify(responseData.response_message, 'success');
      emailSent.value = true

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

const handleChangePassword  = async () => {
  loading.value = true;
  changePasswordRequestModel.value.email = user.value.email;
  try{

    const response = await store.dispatch('auth', 'changePassword', changePasswordRequestModel.value);
    console.log(response)
    let responseData = response.data
    loading.value = false;

    if(responseData.code === "00"){
      notify(responseData.message, 'success');
      router.back()
    }else{
      notify(responseData.message, 'error');
    }
  }catch(err){
    loading.value = false
    console.log('error:', err)
    notify(String(err), 'error');
  }

}


const handleResetPasswordProcess = () => {
  if(emailSent.value){
    handleChangePassword()
  }else{
    handleSendEmailOtp()
  }
}


onMounted(() => {
  if (current_route.code) return store.dispatch('auth', 'tictokLogin_', { access_token: current_route?.code });
})

</script>
<template>
  <!--  <OtpValidation v-if="showOtpScreen" page="login" :data="resetPasswordRequestModel" />-->
  <div class="min-h-screen flex flex-col bg-white">
    <div class="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <div class="w-full max-w-md">
        <div class="text-center">
          <a href="/"
             class="lg:text-3xl text-lg font-bold bg-gradient-to-r from-[#F97316] to-[#2563EB] text-transparent bg-clip-text inline-block lg:mb-4 mb-2">
            Aza-pal
          </a>
        </div>

        <form @submit.prevent="handleResetPasswordProcess" class="space-y-5">
          <div v-if="!emailSent" class="border-gray-200 px-3 py-2 text-center">
            <p class="font-medium text-gray-700 text-center"> Are you sure you want to change your password? </p>

          </div>

          <div  v-if="emailSent">
            <p class="font-medium text-gray-700 text-center mb-4"> Type in your new password </p>

            <label for="verify_otp"
                   class="block relative mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600 ">
              <span class="text-xs font-medium text-gray-700 "> OTP </span>

              <input type="text" v-model="changePasswordRequestModel.otp" id="verify_otp" placeholder="enter value"
                     class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm " />

            </label>

            <label for="change_old_password"
                   class="block relative mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600 ">
              <span class="text-xs font-medium text-gray-700 "> old password </span>

              <input type="text" v-model="changePasswordRequestModel.old_password" id="change_old_password" placeholder="********"
                     class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm " />

            </label>

            <label for="change_new_password"
                   class="block relative mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600 ">
              <span class="text-xs font-medium text-gray-700 "> new password </span>

              <input :type="passwordVisible ? 'text': 'password'" v-model="changePasswordRequestModel.password" id="change_new_password" placeholder="********"
                     class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm " />

              <span class="absolute top-8 right-5 cursor-pointer" @click="passwordVisible = !passwordVisible">
                <Eye v-if="passwordVisible"></Eye>
                <EyeClosed v-else></EyeClosed>
              </span>
            </label>

          </div>


          <button type="submit" class="w-full bg-[#F97316] hover:bg-orange-400 rounded-[12px] p-[8px] cursor-pointer text-white"
                  :disabled="loading">
            {{ loading ? "Please chillax, it's working." : "Proceed"}}
          </button>
        </form>

        <div class="text-center mt-6">
          <p class="text-gray-600">
            Never mind?
            <router-link to="/settings" class="text-[#F97316] font-medium cursor-pointer">
              Cancel
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>