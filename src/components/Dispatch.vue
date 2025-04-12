<template>
  <div class="p-6 bg-white">
    <h2 class="text-2xl font-semibold mb-8 text-gray-800">Available Dispatch Services</h2>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-8">
      <div v-for="company in dispatchCompanies" :key="company"
        class="company-item flex flex-col items-center cursor-pointer p-4"
        :class="{ 'opacity-75': subscribedCompanyId && subscribedCompanyId !== company }"
        @click="selectCompany(company)">
        <div class="relative mb-3">
          <div class="logo-container rounded-full bg-white p-2 shadow-md border-2"
            :class="{ 'border-blue-500': company.id === selectedCompany, 'border-transparent': company !== selectedCompany }">
            <img :src="company.logo" :alt="company.name + ' logo'" class="w-16 h-16 object-contain rounded-full" />
            <div v-if="company.isSubscribed"
              class="absolute -top-2 -right-2 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
              <span class="text-white text-xs">✓</span>
            </div>
          </div>
        </div>
        <h3 class="text-center text-sm font-medium">{{ company.name }}</h3>
      </div>
    </div>
  </div> 

  <!-- Side panel for company details -->
 <div
    class="side-panel fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 w-full max-w-md overflow-y-auto"
    :class="{ 'translate-x-0': selectedCompany, 'translate-x-full': !selectedCompany }">

    <div v-if="selectedCompany" class="p-6">
      <button @click="selectedCompany = null" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="flex flex-col items-center mb-6 pt-4">
        <div class="mb-4">
          <img :src="selectedCompany.logo" :alt="selectedCompany.name + ' logo'"
            class="w-24 h-24 object-contain rounded-full bg-white p-2 shadow-sm" />
        </div>
        <h3 class="text-xl font-semibold text-center">{{ selectedCompany.name }}</h3>
        <p class="text-gray-600 text-center">{{ selectedCompany.location }}</p>
      </div>

      <div class="mb-6 flex justify-center">
        <button v-if="selectedCompany.isSubscribed" @click="unsubscribe"
          class="px-6 py-2 bg-red-100 text-red-700 rounded-full font-medium hover:bg-red-200 transition-colors w-full max-w-xs">
          Unsubscribe
        </button>
        <button v-else @click="subscribe"
          class="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors w-full max-w-xs"
          :disabled="selectedCompany.isSubscribed"
          :class="{ 'opacity-50 cursor-not-allowed': selectedCompany.isSubscribed }">
          Subscribe
        </button>
      </div>

      <div v-if="selectedCompany.isSubscribed"
        class="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
        <p class="text-amber-800 text-sm text-center">
          You are already subscribed to another dispatch service. Please unsubscribe first.
        </p>
      </div>

      <div class="company-details-content">
        <div class="mb-6">
          <h4 class="text-lg font-medium mb-2 border-b pb-2">About</h4>
          <p class="text-gray-700">{{ selectedCompany.description }}</p>
        </div>

        <div class="mb-6">
          <h4 class="text-lg font-medium mb-2 border-b pb-2">Features</h4>
          <ul class="list-disc pl-5 text-gray-700">
            <li v-for="(feature, index) in selectedCompany.features" :key="index" class="mb-2">
              {{ feature }}
            </li>
          </ul>
        </div>

        <div class="mb-6">
          <h4 class="text-lg font-medium mb-2 border-b pb-2">Coverage Areas</h4>
          <div class="flex flex-wrap gap-2 mt-3">
            <span v-for="(area, index) in selectedCompany.coverageAreas" :key="index"
              class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {{ area }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="selectedCompany" class="fixed inset-0 bg-black/20 bg-opacity-20 transition-opacity"
    @click="selectedCompany = null"></div>
</template>

<script setup>
import Bolt from '../assets/images/bolt.svg'
import { ref } from 'vue'
import StoreUtils from '../utils/storeUtils'

const store = StoreUtils
const selectedCompany = ref(null)
const subscribedCompanyId = ref(null)
const dispatchCompanies = store.get('business', 'getSubscribe')

function selectCompany(company) {
  selectedCompany.value = company;
}
function subscribe() {
  if (!subscribedCompanyId) {
    subscribedCompanyId.value = selectedCompany.value.id;
   
  }
}
function unsubscribe() {
  if (subscribedCompanyId.value === selectedCompany.value.id) {
    subscribedCompanyId.value = null;
  
  }
}
</script>

<style scoped>
.company-item {
  transition: all 0.2s ease;
}

.company-item:hover .logo-container {
  transform: translateY(-3px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.logo-container {
  transition: all 0.2s ease;
}

.side-panel {
  z-index: 50;
}
</style>