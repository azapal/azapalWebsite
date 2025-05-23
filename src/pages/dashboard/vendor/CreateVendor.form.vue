<script setup>
import HeaderNav from '../../../components/HeaderNav.vue';
import Button from '../../../components/ui/button.vue';
import {Camera, ArrowRightCircle, ChevronsUpDown, Check} from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { app } from '../../../../firebase.js'
import OtpValidation from '../../../components/forms/OtpValidation.vue';
import StoreUtils from '../../../utils/storeUtils.js';
import { SendOtpRequest } from '../../../model/request/auth/authenticationRequest.js';
import Uploader from '../../../components/Uploader.vue';
import { CreateCooperative } from '../../../model/request/business/businessRequest.js';
import CooperativeProfile from "../../../components/CooperativeProfile.vue";

const auth = getAuth(app);
const selectedType = ref(null);
const store = StoreUtils

const loading = ref(false)
let user = store.get('auth', 'getCurrentUser');
const showBankDropdown = ref(false);

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
    loading.value = false;
    console.log(response)
  }catch(error){
    loading.value = false;
    console.log(error);
  }

  console.log('Submitting verified business data:', finalModel);
  // Call your API to submit the business data
  // apiService.submitBusiness(finalModel).then(...)
};
const selectTimeline = (value) => {
  createCooperativeModel.value.interest_timeline = value;
  showBankDropdown.value = false;
  console.log(createCooperativeModel.value)
};


</script>

<template>
  <div>

    <form @submit.prevent="submitBusinessForm">
      <HeaderNav>
        <template v-slot:others>
          <Button variant="outline" class="w-[100px]" type="submit" v-if="selectedType" v-slot:child>Save</Button>
        </template>
      </HeaderNav>


      <div class="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3 mx-auto relative p-3">
        <!-- Type Selection Screen -->
        <div>
          <h1 class="text-2xl font-bold mb-8">Cooperatives has one goal, <em class="p">to help people and businesses grow.</em></h1>

        </div>

        <!-- Business Information Form -->
        <div >

          <!-- Common Fields -->
          <label
            class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
            <span class="text-xs font-medium text-gray-700">Cooperative name</span>
            <input type="text" v-model="createCooperativeModel.corporative_name" placeholder="Enter Cooperative name"
              class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm" />

          </label>

          <label
            class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
            <span class="text-xs font-medium text-gray-700">Description</span>
            <textarea v-model="createCooperativeModel.description" placeholder="Describe your Cooperative"
              class="mt-1 w-full border-none bg-transparent p-0 h-[100px] focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm"></textarea>
          </label>

          <label
            class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
            <span class="text-xs font-medium text-gray-700">Interest</span>
            <input v-model="createCooperativeModel.saving_plan_interest" type="text" placeholder="1.0"
              class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm" />
          </label>


          <div class="space-y-2">
            <label for="bank" class="block text-sm font-medium ">Select Timeline for interest</label>
            <div class="relative">
              <div
                  @click="showBankDropdown = !showBankDropdown"
                  class="flex items-center justify-between w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 cursor-pointer">
                <span :class="createCooperativeModel.interest_timeline ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'">
                  {{ createCooperativeModel.interest_timeline || 'Timeline' }}
                </span>
                <ChevronsUpDown class="w-4 h-4 text-gray-500" />
              </div>

              <!-- Dropdown -->
              <div v-if="showBankDropdown" class="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">

                <div class="py-1">
                  <button
                      v-for="item in timelineOptions"
                      :key="item.value"
                      @click.prevent="selectTimeline(item.value)"
                      class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
                      :class="{'text-blue-600 dark:text-blue-400 font-medium': item.value === createCooperativeModel.interest_timeline}"
                  >
                    {{ item.key }}
                    <Check v-if="item.value === createCooperativeModel.interest_timeline" class="w-4 h-4" />
                  </button>

                </div>
              </div>
            </div>
          </div>

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
              <Button v-else type="submit" variant="outline" class="w-full" v-slot:child>Create Cooperative</Button>
            </div>
          </div>
        </div>
      </div>
    </form>

  </div>
</template>