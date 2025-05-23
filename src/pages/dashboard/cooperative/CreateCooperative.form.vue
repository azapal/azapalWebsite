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
import CooperativeProfile from "../../../components/CooperativeProfile.vue";
import {notify} from "../../../utils/toast.js";
import router from "../../../router/index.js";

const auth = getAuth(app);
const selectedType = ref(null);
const store = StoreUtils

const loading = ref(false)
let user = store.get('auth', 'getCurrentUser');
const showTimelineDropdown = ref(false);
const creatingSucceded = ref(false);

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
      creatingSucceded.value = true
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
  <div>
    <HeaderNav>
      <template v-slot:others>
        <Button variant="outline" class="w-[100px]" type="submit" v-if="selectedType" v-slot:child>Save</Button>
      </template>
    </HeaderNav>

    <div v-if="creatingSucceded" class="bg-white bg-opacity-50 flex items-start justify-center z-50 lg:p-4">
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
          <router-link to="/business/cooperative"  class="w-full bg-[#F97316] text-white rounded p-3 text-center">Go to cooperative dashboard</router-link>

        </div>

      </div>
    </div>
    <form v-else @submit.prevent="submitBusinessForm">



      <div class="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3 mx-auto relative p-3">
        <router-link class="flex items-center text-sm cursor-pointer" to="/business/cooperative">
          <ChevronLeft size="30"/>
          <p>back</p>
        </router-link>
        <div>
          <h1 class="text-2xl font-bold mb-8">Cooperatives has one goal, <em class="p">to help people and businesses grow.</em></h1>

        </div>

        <div >

          <label
              class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
            <span class="text-xs font-medium text-gray-700">Cooperative name</span>
            <input type="text" required v-model="createCooperativeModel.corporative_name" placeholder="Enter Cooperative name"
                   class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm" />

          </label>

          <label
              class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
            <span class="text-xs font-medium text-gray-700">Description</span>
            <textarea required v-model="createCooperativeModel.description" placeholder="Describe your Cooperative"
                      class="mt-1 w-full border-none bg-transparent p-0 h-[100px] focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm"></textarea>
          </label>

          <label
              class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
            <span class="text-xs font-medium text-gray-700">Interest</span>
            <input required v-model="createCooperativeModel.saving_plan_interest" type="text" placeholder="1.0"
                   class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm" />
          </label>


          <div class="space-y-2">
            <label for="bank" class="block text-sm font-medium ">Select Timeline for interest</label>
            <div class="relative">
              <div
                  @click="showTimelineDropdown = !showTimelineDropdown"
                  class="flex items-center justify-between w-full p-3 border border-gray-300  rounded-lg bg-whitecursor-pointer">
                <span :class="createCooperativeModel.interest_timeline ? 'text-gray-900 ' : 'text-gray-500 '">
                  {{ createCooperativeModel.interest_timeline || 'Timeline' }}
                </span>
                <ChevronsUpDown class="w-4 h-4 text-gray-500" />
              </div>

              <!-- Dropdown -->
              <div v-if="showTimelineDropdown" class="absolute z-10 w-full mt-1 bg-white  border border-gray-200  rounded-lg shadow-lg max-h-60 overflow-y-auto">

                <div class="py-1">
                  <button
                      v-for="item in timelineOptions"
                      :key="item.value"
                      @click.prevent="selectTimeline(item.value)"
                      class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100  flex items-center justify-between"
                      :class="{'text-blue-600  font-medium': item.value === createCooperativeModel.interest_timeline}"
                  >
                    {{ item.key }}
                    <Check v-if="item.value === createCooperativeModel.interest_timeline" class="w-4 h-4" />
                  </button>

                </div>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <div>
              <div v-if="loading" class="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
              <Button v-else type="submit" class="w-full bg-[#F97316] text-white rounded-[18px]" v-slot:child>Create Cooperative</Button>
            </div>
          </div>
        </div>
      </div>
    </form>



  </div>
</template>