<script lang="ts" setup>
import {ref, onMounted} from "vue";
// import Button from "../../components/ui/button.vue";
import router from "../../router";
import StoreUtils from '../../utils/storeUtils'
import OtpValidation from "../../components/forms/OtpValidation.vue";
import {SendOtpRequest, SignupRequest} from "../../model/request/auth/authenticationRequest";
import {notify} from "../../utils/toast.ts";
import {Eye, EyeClosed} from "lucide-vue-next";

const current_route = router.currentRoute.value.query
const store = StoreUtils
const loading = ref(false)
const clientKey = "sbaw37v8xwwou3v490"; // Replace with your actual client key
const redirectUri = "https://number1fans.vercel.app/create-account"; // Your redirect URI
let showOtpScreen = store.get('auth', 'getShowOtpScreen')
const passwordVisible = ref(false)
const signUpRequestModel = ref(SignupRequest)

const handleSocialSignUp = (provider: string) => {
    const csrfState = Math.random().toString(36).substring(2); // CSRF protection
    localStorage.setItem("csrfState", csrfState);
    if (provider === 'Tiktok') {
        const authUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${clientKey}&response_type=code&scope=user.info.basic&redirect_uri=${redirectUri}&state=${csrfState}`;
        window.location.href = authUrl;
    } else {
        window.location.href = '/profile'
    }
};


const handleSendInitiatingOtp = async () => {
    loading.value = true
    SendOtpRequest.phone_number = signUpRequestModel.value.phone_number
    SendOtpRequest.email = signUpRequestModel.value.email
    SendOtpRequest.platform = 'azapal-web'
    SendOtpRequest.source = 'web'

   try{
    const response = await store.dispatch('auth','sendInitiatingOtp',SendOtpRequest)
    const responseData = response.data
    if(responseData.response_code === "00"){
      store.commit('auth', 'showOtpScreen', true)
      notify(responseData.response_message, 'success');
    }else{
      notify(responseData.response_message, 'success');
      loading.value = false

    }

  }catch(err){
    notify(String(err), 'error');
     loading.value = false

   }
}


onMounted(() => {
    if (current_route.code) return store.dispatch('auth', 'tictokLogin_', { access_token: current_route?.code });
})

</script>
<template>
    <OtpValidation v-if="showOtpScreen" page="signup" :data="signUpRequestModel" />
    <div class="min-h-screen flex flex-col bg-white">
        <div class="flex-1 flex flex-col items-center justify-center px-4 py-12">
            <div class="w-full max-w-md">
                <div class="text-center mb-8">
                    <a href="/"
                        class="text-3xl font-bold bg-gradient-to-r from-[#F97316] to-[#2563EB] text-transparent bg-clip-text inline-block mb-4">
                        Aza-pal
                    </a>
                    <h1 class="text-2xl font-bold text-gray-900 mb-2">Create your account</h1>
                    <p class="text-gray-600 text-sm">
                        Join thousands who trust Aza-pal for secure online transactions
                    </p>
                </div>

                <div class="space-y-4 mb-8">
                    <!-- <Button variant="outline" class="w-full justify-center gap-2 font-medium  border-gray-300"
                        @click="() => handleSocialSignUp('Google')" :disabled="loading" v-slot:child>
                        <Mail class="w-5 h-5" />
                        <span>Continue with Google</span>
                    </Button> -->

                    <!-- <Button variant="outline" class="w-full justify-center gap-2 font-medium border-gray-300"
                        @click="() => handleSocialSignUp('Google')" :disabled="loading" v-slot:child>
                        <Instagram class="w-5 h-5" />
                        <span>Continue with Instagram</span>
                    </Button> -->

                  <button class="w-full flex items-center p-2 rounded-[8px] cursor-pointer hover:scale-105 justify-center gap-2 font-medium border border-gray-300"
                          @click="() => handleSocialSignUp('Tiktok')" :disabled="loading">
                    <img src="../../assets/icons/icons8-tiktok.svg" class="w-5 h-5" alt="tiktok" />
                    <span>Continue with TikTok</span>
                  </button>
                </div>

                <div class="relative mb-8">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-white text-gray-500">Or continue with email</span>
                    </div>
                </div>

                <form @submit.prevent="handleSendInitiatingOtp" class="space-y-5">
                    <label for="email"
                        class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ">
                        <span class="text-xs font-medium text-gray-700 "> email </span>

                        <input type="email" id="sign_up_email" v-model="signUpRequestModel.email"
                            placeholder="example@gmail.com or example@yourcompanyname.com"
                            class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm " required/>
                    </label>

                    <label for="phone"
                         class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ">
                    <span class="text-xs font-medium text-gray-700 "> phone number </span>

                    <input type="tel" id="sign_up_email" v-model="signUpRequestModel.phone_number"
                           placeholder="0x0 xxx xxxx"
                           class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm " required/>
                  </label>
                    <label for="password"
                        class="block mb-5 relative overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ">
                        <span class="text-xs font-medium text-gray-700 "> password </span>

                        <input :type="passwordVisible ? 'text': 'password'" id="password" v-model="signUpRequestModel.password" placeholder="*************"
                            class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm " required/>

                      <div class="absolute top-8 right-5 cursor-pointer" @click="passwordVisible = !passwordVisible">
                        <Eye v-if="passwordVisible"></Eye>
                        <EyeClosed v-else></EyeClosed>
                      </div>
                    </label>
                    <label for="firstname"
                        class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ">
                        <span class="text-xs font-medium text-gray-700 ">first name</span>

                        <input type="text" id="firstname" v-model="signUpRequestModel.first_name"
                            placeholder="your first name"
                            class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm " required/>
                    </label>
                    <label for="last_name"
                        class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 ">
                        <span class="text-xs font-medium text-gray-700 ">last name</span>

                        <input type="text" id="last_name" v-model="signUpRequestModel.last_name"
                            placeholder="your last name"
                            class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm " required/>
                    </label>
                  


                    <button type="submit" class="w-full bg-[#F97316] disabled:cursor-not-allowed cursor-pointer hover:bg-orange-400 rounded-[12px] p-[8px] text-white"
                        :disabled="loading">
                        {{ loading ? "Creating account..." : "Create Account" }}
                    </button>
                </form>

                <div class="text-center mt-6">
                    <p class="text-gray-600">
                        Already have an account?
                        <a href="/login" class="text-[#F97316] hover:text-[#F97316]-dark font-medium">
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<style></style>