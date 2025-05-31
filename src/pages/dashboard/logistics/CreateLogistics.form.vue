<script setup>
import HeaderNav from '../../../components/HeaderNav.vue';
import Button from '../../../components/ui/button.vue';
import {Check, ChevronsUpDown} from 'lucide-vue-next';
import {ref} from 'vue';
import {getAuth} from "firebase/auth";
import {app} from '../../../../firebase.js'
import StoreUtils from '../../../utils/storeUtils.js';
import {CreateBusinessRequest} from '../../../model/request/business/businessRequest.js';
import {getUserLocation} from "../../../utils/getUserLocation.js";
import {notify} from "../../../utils/toast.js";

const auth = getAuth(app);
const selectedType = ref(null);
const store = StoreUtils

const loading = ref(false)
let user = store.get('auth', 'getCurrentUser');
const showBankDropdown = ref(false);

const createBusinessModel = ref(CreateBusinessRequest);

const timelineOptions = [
  {key:"Shoes/Wears", value: "shoes_wears"},
  {key:"Stationaries", value: "stationaries"},
  {key:"Food/Bakeries", value: "food_bakeries"},
]

const creatingIsSuccess=ref(false)




// Submit business form after verification
const submitBusinessForm = async () => {
  loading.value = true;

  const  {latitude, longitude} =  await getUserLocation({enableHighAccuracy: true, timeout: 5000})
  createBusinessModel.value.location = `${latitude}, ${longitude}`

  if(createBusinessModel.value.location){
    const finalModel = {
      ...createBusinessModel.value,
    };
    try{
      const response  = await store.dispatch('business', 'createBusiness', finalModel);
      let responseData = response.data;
      if(responseData.code === "00"){
        creatingIsSuccess.value = true
      }
      loading.value = false;
      console.log(response)
    }catch(error){
      loading.value = false;
      console.log(error);
    }
  }else{
    loading.value = false;
    notify('your location is required to smoother operative, please be where your products are most likely to be.')
  }


};
const selectTimeline = (value) => {
  createBusinessModel.value.product_category = value;
  showBankDropdown.value = false;
  console.log(createBusinessModel.value)
};


</script>

<template>
  <div>
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

    <form v-else @submit.prevent="submitBusinessForm">
      <HeaderNav>
        <template v-slot:others>
          <Button variant="outline" class="w-[100px]" type="submit" v-if="selectedType" v-slot:child>Save</Button>
        </template>
      </HeaderNav>


      <div class="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3 mx-auto relative p-3">
        <!-- Type Selection Screen -->
        <div>
          <h1 class="text-2xl font-bold mb-8">Let's start simple</h1>

        </div>

        <!-- Business Information Form -->
        <div >

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





          <!--          <label-->
          <!--            class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">-->
          <!--            <span class="text-xs font-medium text-gray-700">Timeline</span>-->
          <!--            <input v-model="createCooperativeModel.interest_timeline" type="text" placeholder="monthly/yearly"-->
          <!--              class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm" />-->
          <!--          </label>-->

          <!-- Phone verification section -->
          <div class="mt-6">
            <div>
              <div v-if="loading" class="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
              <Button v-else type="submit" variant="outline" class="w-full" v-slot:child>Create Business</Button>
            </div>
          </div>
        </div>
      </div>
    </form>

  </div>
</template>