<script setup>
import HeaderNav from '../../../components/HeaderNav.vue';
import Button from '../../../components/ui/button.vue';
import {Check, ChevronLeft, ChevronsUpDown} from 'lucide-vue-next';
import {onMounted, ref} from 'vue';
import {getAuth} from "firebase/auth";
import {app} from '../../../../firebase.js'
import StoreUtils from '../../../utils/storeUtils.js';
import {CreateBusinessRequest} from '../../../model/request/business/businessRequest.js';
import {getUserLocation} from "../../../utils/getUserLocation.js";
import {notify} from "../../../utils/toast.js";
import FormLayout from "../layout/FormLayout.vue";
import router from "../../../router/index.js";
import { SendOtpRequest } from '../../../model/request/auth/authenticationRequest';
import OtpValidation from "../../../components/forms/OtpValidation.vue";
import DashboardLayout from "../layout/DashboardLayout.vue";

const auth = getAuth(app);
const selectedType = ref(null);
const store = StoreUtils

const loading = ref(false)
let user = store.get('auth', 'getCurrentUser');
const showBankDropdown = ref(false);
let showOtpScreen = store.get('auth', 'getShowOtpScreen')


const createBusinessModel = ref(CreateBusinessRequest);
const sendOtpRequest = ref(SendOtpRequest);

const creatingIsSuccess=ref(false)

const logoUrl = ref('');
const logo = ref(null);

function handleLogoUpload(event) {
  const file = event.target.files[0];
  if (file) {
    logoUrl.value = URL.createObjectURL(file);
    logo.value = file;
  }
}

// Start the verification process
const startVerification = () => {
  sendOtpRequest.value.phone_number = createBusinessModel.value.phone_number
  sendOtpRequest.value.email = createBusinessModel.value.email
  sendOtpRequest.value.platform = 'azapal'
  sendOtpRequest.value.source = 'web'
  store.dispatch('auth', 'sendOtp', sendOtpRequest.value)
};

// Submit business form after verification
const submitBusinessForm = async () => {
  loading.value = true;
  const formData = new FormData();
  formData.append('business_logo', logo.value);
  formData.append('name', createBusinessModel.value.name);
  formData.append('description', createBusinessModel.value.description);
  formData.append('email', createBusinessModel.value.email);
  formData.append('address', createBusinessModel.value.address);
  formData.append('phone_number', createBusinessModel.value.phone_number);
  formData.append('product_category', 'NA');
  formData.append('location', 'NA');
  formData.append('category', 'dispatch')

  try{
    const response  = await store.dispatch('business', 'createBusiness', formData);
    let responseData = response.data;
    loading.value = false;
    console.log(response)
    if(responseData.code === "00"){
      creatingIsSuccess.value = true
    }else{
      notify(responseData.message, 'error')
    }

  }

  catch(error){
    loading.value = false;
    notify(error, 'error')
    console.log(error);
  }

};

onMounted(() => {
  store.dispatch('auth', 'readUser')

})

</script>

<template>
  <OtpValidation v-if="showOtpScreen" page="business" :data="{type:selectedType}" />

  <DashboardLayout v-slot:content>

  <FormLayout v-slot:form>

      <div v-if="!creatingIsSuccess" class="bg-white w-full bg-opacity-50 flex items-start justify-center z-50 lg:p-4">
        <div class="bg-white rounded-2xl w-full  max-h-[90vh] overflow-y-auto">
          <!-- Header -->
          <div class="px-6 pt-5 relative flex flex-col items-center gap-5">
            <img src="../../../assets/images/success.png" class="w-38" alt="success-img" />
            <section class="text-center">
              <h2 class="text-2xl font-semibold text-gray-900">Hey!</h2>
              <h3 class="text-xl font-semibold text-gray-900">That was a success.</h3>
            </section>
            <router-link to="/business/logistics"  class="w-full underline  rounded-[18px] p-3 text-center">Go to business dashboard</router-link>

          </div>

        </div>
      </div>

      <form v-else @submit.prevent="submitBusinessForm" class="w-full">

        <div class="relative">
          <router-link to="/business/logistics" class="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-4">
            <ChevronLeft />
            <span class="text-lg font-semibold">Back</span>
          </router-link>
          <!-- Type Selection Screen -->
            <h1 class="text-2xl font-bold mb-2">Let's start simple</h1>
            <span class="text-md">Logistics partner helps in fulfilling logistics operation for azapal online vendors.</span>

          <!-- Business Information Form -->
          <div class="mt-2">

            <div class="flex items-center gap-2">
              <!-- Logo Upload -->
              <input type="file" id="logoUpload" class="hidden" accept="image/*" @change="handleLogoUpload" />
              <label for="logoUpload" class="cursor-pointer flex items-center justify-center p-4 mb-4 bg-gray-100 rounded-full hover:bg-gray-200">
                <img v-if="logoUrl" :src="logoUrl" alt="Logo" class="w-10 h-10 rounded-full object-cover" />

                <span v-else class="text-xs text-gray-500">+ upload a business logo</span>
              </label>

            </div>

            <!-- Common Fields -->
            <label
                class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
              <span class="text-xs font-medium text-gray-700">Business name</span>
              <input type="text" v-model="createBusinessModel.name" placeholder="Enter Business name"
                     class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm" />

            </label>

            <label
                class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
              <span class="text-xs font-medium text-gray-700">Business description</span>
              <textarea v-model="createBusinessModel.description" placeholder="Tell us what you sell or do"
                        class="mt-1 w-full border-none bg-transparent p-0 h-[100px] focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm"></textarea>
            </label>

            <label
                class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
              <span class="text-xs font-medium text-gray-700">Business email</span>
              <input v-model="createBusinessModel.email" type="text" placeholder="@yourbusiness.com"
                     class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm" />
            </label>

            <label
                class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
              <span class="text-xs font-medium text-gray-700">Business address</span>
              <input v-model="createBusinessModel.address" type="text" placeholder="business address"
                     class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm" />
            </label>

            <label
                class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
              <span class="text-xs font-medium text-gray-700">Business Phone</span>
              <input v-model="createBusinessModel.phone_number" type="text" placeholder="09039939453"
                     class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm" />
            </label>

            <label
                class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
              <span class="text-xs font-medium text-gray-700">Business Website(optional)</span>
              <input v-model="createBusinessModel.website" type="url" placeholder="https://mywebsit.com"
                     class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm" />
            </label>


            <div class="mt-12">
              <div>
                <div v-if="loading" class="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                <button v-else type="submit" class="w-full p-2 rounded-full bg-[#2563EB] cursor-pointer text-white">Become a partner</button>
              </div>
            </div>
          </div>
        </div>
      </form>

    </FormLayout>
  </DashboardLayout>

</template>