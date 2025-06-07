<script lang="ts" setup>
import {ref, onMounted} from "vue";
import Button from "../../components/ui/button.vue";
import router from "../../router";
import StoreUtils from '../../utils/storeUtils'
import {LoginRequest, SendEmailOtpRequest} from "../../model/request/auth/authenticationRequest";
import {notify} from "../../utils/toast.ts";
import OtpValidation from "../../components/forms/OtpValidation.vue";
import {useAuthStore} from "../../store/modules/auth.ts";
import {storeToRefs} from "pinia";
const authStore = useAuthStore()
import {Eye, EyeClosed} from "lucide-vue-next"


const {isVerificationDone} = storeToRefs(authStore);

const current_route = router.currentRoute.value.query
const store = StoreUtils
const loading = ref(false)
const clientKey = "sbaw37v8xwwou3v490"; // Replace with your actual client key
const redirectUri = "https://number1fans.vercel.app/create-account"; // Your redirect URI
let showOtpScreen = store.get('auth', 'getShowOtpScreen')

const handleSocialSignUp = (provider: string) => {
    const csrfState = Math.random().toString(36).substring(2); // CSRF protection
    localStorage.setItem("csrfState", csrfState);
    if(provider === 'Tiktok'){
        const authUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${clientKey}&response_type=code&scope=user.info.basic&redirect_uri=${redirectUri}&state=${csrfState}`;
        window.location.href = authUrl;
    }else{
        window.location.href = '/profile'        
    }
};

const loginRequestModel = ref(LoginRequest)
const passwordVisible = ref(false)

const handleSendEmailOtp = async () => {
  loading.value = true
  SendEmailOtpRequest.email = loginRequestModel.value.email;

  try{
    const response = await store.dispatch('auth','sendEmailOtp',SendEmailOtpRequest)
    const responseData = response.data
    if(responseData.response_code === "00"){
      store.commit('auth', 'showOtpScreen', true)
      loading.value = false
      notify(responseData.response_message, 'success');
    }else{
      notify(responseData.response_message, 'success');
      loading.value = false

    }

  }catch(err:any){
    loading.value = false
    if(err.response.data){
      notify(String(err.response.data.message), 'error');
    }else{
      notify(String(err), 'error');
    }


  }
}

const handleLogin  = async () => {
  loading.value = true;
  try{

    const response = await store.dispatch('auth', 'login', loginRequestModel.value);
    console.log(response)
    let responseData = response.data
    loading.value = false;

    if(responseData.code === "00"){
      const currentRoute = router.currentRoute?.value?.query?.redirectFrom
      store.commit('auth', 'token', responseData.token)
      store.commit('auth', 'user', responseData.data)
      localStorage.user = JSON.stringify(responseData.data)
      localStorage.token = responseData.token
      if(currentRoute){
        await router.push({path: String(currentRoute)})

      }else{
        await router.push({path: "/business/vendor"})
      }

    }else{
      notify(responseData.message, 'error');
    }
  }catch(err){
    loading.value = false
    console.log('error:', err)
    notify(String(err), 'error');
  }

}


const handleLoginProcess = () => {
   if(isVerificationDone.value){
     handleLogin()
   }else{
     handleSendEmailOtp()
   }
}


onMounted(() => {
  if (current_route.code) return store.dispatch('auth', 'tictokLogin_', { access_token: current_route?.code });
})

</script>
<template>
    <OtpValidation v-if="showOtpScreen" page="login" :data="loginRequestModel" />
    <div class="min-h-screen flex flex-col bg-white">
        <div class="flex-1 flex flex-col items-center justify-center px-4 py-12">
            <div class="w-full max-w-md">
                <div class="text-center mb-8">
                    <a href="/"
                        class="text-3xl font-bold bg-gradient-to-r from-[#F97316] to-[#2563EB] text-transparent bg-clip-text inline-block mb-4">
                        Aza-pal
                    </a>
                    <h1 class="text-2xl font-bold text-gray-900 mb-2">Welcome Back.</h1>
                    <p class="text-gray-600 text-sm">
                        Social Commerce Made Easy.
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

                    <Button variant="outline" class="w-full justify-center gap-2 font-medium border-gray-300"
                        @click="() => handleSocialSignUp('Tiktok')" :disabled="loading" v-slot:child>
                        <img src="../../assets/icons/icons8-tiktok.svg" class="w-5 h-5" />
                        <span>Continue with TikTok</span>
                    </Button>
                </div>

                <div class="relative mb-8">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-white text-gray-500">{{isVerificationDone ? 'Your email was verified now enter your password' : 'Or continue with email' }}</span>
                    </div>
                </div>

                <form @submit.prevent="handleLoginProcess" class="space-y-5">
                    <label v-if="!isVerificationDone" for="login_email"
                        class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600 ">
                        <span class="text-xs font-medium text-gray-700 "> email </span>

                        <input type="email" v-model="loginRequestModel.email" id="login_email" placeholder="example@email.com"
                            class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm " required />
                    </label>
                    <label v-if="isVerificationDone" for="login_password"
                        class="block relative mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600 ">
                        <span class="text-xs font-medium text-gray-700 "> password </span>

                        <input :type="passwordVisible ? 'text': 'password'" v-model="loginRequestModel.password" id="login_password" placeholder="********"
                            class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm " />

                         <div class="absolute top-8 right-5 cursor-pointer" @click="passwordVisible = !passwordVisible">
                            <Eye v-if="passwordVisible"></Eye>
                            <EyeClosed v-else></EyeClosed>
                         </div>
                    </label>
                

                    <Button type="submit" class="w-full bg-[#F97316]  text-white"
                        :disabled="loading" v-slot:child>
                        {{ loading ? "Please chillax, it's working." : isVerificationDone ? "Login" : "Send Verification Email" }}
                    </Button>
                </form>

                <div class="text-center mt-6">
                    <p class="text-gray-600">
                        Dont have an account?
                        <a href="/create-account" class="text-[#F97316] font-medium">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<style></style>