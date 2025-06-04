<script setup>
import HeaderNav from '../../../components/HeaderNav.vue';
import Button from '../../../components/ui/button.vue';
import {Camera, ArrowRightCircle, ChevronsUpDown, Check, ChevronLeft} from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { app } from '../../../../firebase.js'
import OtpValidation from '../../../components/forms/OtpValidation.vue';
import StoreUtils from '../../../utils/storeUtils.js';
import { SendOtpRequest } from '../../../model/request/auth/authenticationRequest.js';
import Uploader from '../../../components/Uploader.vue';
import { CreateCooperative } from '../../../model/request/business/businessRequest.js';
import {notify} from "../../../utils/toast.js";
import router from "../../../router/index.js";
import FormLayout from "../layout/FormLayout.vue";

const auth = getAuth(app);
const selectedType = ref(null);
const store = StoreUtils

const loading = ref(false)
let user = store.get('auth', 'getCurrentUser');
const showTimelineDropdown = ref(false);
const creatingIsSuccess = ref(false);

const createCooperativeModel = ref(CreateCooperative);

const timelineOptions = [
  {key:"Monthly", value: "monthly"},
  {key:"Annual", value: "annual"},
]




// Submit business form after verification
const submitBusinessForm = async () => {
  loading.value = true;
  createCooperativeModel.value.user_id = user?.value?.id

  const finalModel = {
    ...createCooperativeModel.value,
  };

  try{
    const response  = await store.dispatch('business', 'createCooperative', finalModel);
    let responseData = response.data;
    loading.value = false;
    if(responseData.code === "00"){
      creatingIsSuccess.value = true
    }
  }catch(error){
    loading.value = false;
    notify(error);
  }

};
const selectTimeline = (value) => {
  createCooperativeModel.value.interest_timeline = value ? value : 'annual';
  showTimelineDropdown.value = false;
  console.log(createCooperativeModel.value)
};


</script>

<template>

  <FormLayout v-slot:form>
    <div v-if="creatingIsSuccess" class="bg-white bg-opacity-50 flex items-start justify-center z-50 lg:p-4">
      <div class="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div class="flex justify-center w-full">
        </div>
        <!-- Header -->
        <div class="px-6 pt-5 relative flex flex-col items-center gap-5">
          <img src="../../../assets/images/success.png" class="w-38" alt="success-img" />
          <section class="text-center">
            <h2 class="text-2xl font-semibold text-gray-900">Hey!</h2>
            <h3 class="text-xl font-semibold text-gray-900">That was a success.</h3>
          </section>
          <router-link to="/business/vendor"  class="w-full bg-[#F97316] text-white rounded-[18px] p-3 text-center">Go to business dashboard</router-link>

        </div>

      </div>
    </div>

    <form v-else @submit.prevent="submitBusinessForm" class="w-full">



      <div class="relative">

        <button class="flex cursor-pointer mb-3 hover:scale-101" @click="router.back()">
          <ChevronLeft />
          <p>Back</p>
        </button>

          <h1 class="text-2xl font-bold mb-8">Let's get to know what you are building.</h1>


        <div >

          <label
              class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
            <span class="text-xs font-medium text-gray-700">App name</span>
            <input type="text" required v-model="createCooperativeModel.corporative_name" placeholder="What did you call your app?"
                   class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm" />

          </label>

          <label
              class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
            <span class="text-xs font-medium text-gray-700">Description</span>
            <textarea required v-model="createCooperativeModel.description" placeholder="Tell us a lot about your app"
                      class="mt-1 w-full border-none bg-transparent p-0 h-[100px] focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm"></textarea>
          </label>


          <div class="mt-6">
            <div>
              <div v-if="loading" class="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
              <Button v-else type="submit" class="w-full bg-[#2563EB] text-white rounded-[18px]" v-slot:child>Create App</Button>
            </div>
          </div>
        </div>
      </div>
    </form>

  </FormLayout>



</template>