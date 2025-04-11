<script setup>
import Button from '../ui/button.vue';
import Payment from '../../model/request/pay/payment.request';
import { reactive, ref, computed, watch } from 'vue'
import StoreUtils from '../../utils/storeUtils';

const store = StoreUtils;
const initiatePaymentModel = reactive(Payment.businessLookup)
const selectedDeliveryArea = ref(null);
const isLoading = ref(false)
const deliveryFee = ref(1000)
const protectionFee = ref(0)
const amount = ref(0)
const isPaid = ref(false)

const lookedUpBusiness = store.get('pay', 'getLookUp')

function selectDeliveryArea(area) {
  console.log(area)
  selectedDeliveryArea.value = area;
  deliveryFee.value = 1000;
}

// Calculate total amount
const totalAmount = computed(() => {
  return parseFloat(lookedUpBusiness.value.initial_amount) + parseFloat(lookedUpBusiness.value.protection_fee) + parseFloat(deliveryFee.value);
});


async function resumePayment() {
  isLoading.value = true
  console.log(isPaid.value)
  if(isPaid.value){initiatePaymentModel.amount = null}

  await store.dispatch('pay', 'businessLookup', initiatePaymentModel);
  isLoading.value = false
}

function processPayment() {
  if (!selectedDeliveryArea.value) {
    alert('Please select a delivery area');
    return;
  }

  // Create payment payload with delivery information
  const paymentPayload = {
    business_identification_name: lookedUpBusiness.value?.business?.business_identification_name,
    amount: totalAmount.value,
    // Add other necessary payment details
  };
  console.log(paymentPayload)

  // Dispatch payment action
  store.dispatch('pay', 'initializePayment', paymentPayload);
}

function cancelPayment() {
  // Reset form or navigate away
  initiatePaymentModel.business_identification_name = '';
  selectedDeliveryArea.value = null;
  deliveryFee.value = 0;
  store.commit('pay', 'lookup', null)
}
</script>

<template>
  <form @submit.prevent="resumePayment" class="p-3" v-if="!lookedUpBusiness">
    <label for="business"
      class="block mb-1 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
      <span class="text-xs font-medium text-gray-700 dark:text-gray-200">Business</span>

      <input type="text" id="Username" v-model="initiatePaymentModel.business_identification_name"
        placeholder="@businessname" required
        class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm dark:text-white" />

      <span class="text-xs text-gray-400">Use business username to send money</span>
    </label>
    <div class="flex items-center gap-2 pt-2 pb-2 bg-white" v-if="initiatePaymentModel?.business_identification_name?.length > 3">
      <input type="checkbox" id="paidCheckbox" v-model="isPaid"
        class="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
      <label for="paidCheckbox" class="text-gray-700 text-sm font-medium cursor-pointer select-none">
        I have already paid this business(just delivery need)
      </label>
    </div>
    <label for="amount"
      class="block mb-1 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
      <span class="text-xs font-medium text-gray-700 dark:text-gray-200">Amount</span>

      <input type="tel" id="amount" :disabled="isPaid" v-model="initiatePaymentModel.amount" placeholder="" :required="!isPaid"
        class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm dark:text-white" />

    </label>

    <div class="mt-3">
      <p class="text-xs">You must <router-link to="/identity-verification" class="text-blue-500">Add a Bank
          Information</router-link> before you can send money</p>
      <div class="flex gap-3 mt-3 items-center justify-end w-full">
        <div class="flex justify-center py-4">
          <div v-if="isLoading" class="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
          <Button v-else type="submit" variant="outline" v-slot:child>Look up "{{
            initiatePaymentModel.business_identification_name }}"</Button>
        </div>
      </div>
    </div>
  </form>

  <div class="" v-if="lookedUpBusiness">
    <!-- Business Information Card -->
    <div class="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="w-10 h-10 rounded-full bg-purple/20 flex items-center justify-center">
            <span class="text-purple font-bold">{{ lookedUpBusiness?.business?.name?.substring(0, 2).toUpperCase()
              }}</span>
          </div>
          <div class="ml-3">
            <p class="font-medium">Payment to {{ lookedUpBusiness?.business?.name }}</p>
            <p class="text-xs text-gray-500">{{ lookedUpBusiness?.business_identification_name }}</p>
          </div>
        </div>
        <div class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
          Protected
        </div>
      </div>
    </div>

    <!-- Delivery Area Selection -->
    <!-- <div class="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h3 class="font-medium mb-3">Select Delivery Area</h3>
    
      
      <div class="grid grid-cols-2 gap-2">
        <button 
          v-for="area in lookedUpBusiness?.areas" 
          :key="area.id"
          type="button"
          @click="selectDeliveryArea(area)"
          :class="[
            'p-3 border rounded-lg text-left transition-colors',
            selectedDeliveryArea?.id === area.id 
              ? 'border-orange-500 bg-orange-50' 
              : 'border-gray-200 hover:border-gray-300'
          ]"
        >
          <div class="font-medium">{{ area.area }}</div>
          <div class="text-sm text-gray-600">+${{ area.charge }}</div>
        </button>
      </div>
      
      <p v-if="lookedUpBusiness?.areas?.length === 0 && !isLoading" class="text-center text-gray-500 py-2">
        No delivery areas available
      </p>
    </div> -->

    <!-- Payment Summary -->
    <div class="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div class="space-y-3">
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">Amount</span>
          <span class="font-semibold">${{ lookedUpBusiness?.initial_amount }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">Protection Fee</span>
          <span class="font-semibold">${{ lookedUpBusiness?.protection_fee }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">Delivery</span>
          <span class="font-semibold" :class="{ 'text-orange-500': selectedDeliveryArea }">
            <span v-if="!selectedDeliveryArea" class="text-xs text-red-500">(based on your current location)</span>

            ${{ deliveryFee }}
          </span>
        </div>
        <div class="h-px bg-gray-200 my-2"></div>
        <div class="flex justify-between items-center">
          <span class="font-medium">Total</span>
          <span class="font-bold text-lg">${{ totalAmount }}</span>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="grid grid-cols-2 gap-4">
      <Button @click="cancelPayment" class="bg-gray-100 hover:bg-gray-200 py-3 rounded-lg font-medium transition-colors"
        v-slot:child>
        Cancel
      </Button>
      <Button @click="processPayment" :disabled="!selectedDeliveryArea" :class="[
        'py-3 rounded-lg font-medium transition-colors',
        selectedDeliveryArea
          ? 'bg-[#F97316] hover:bg-[#EA580C] text-white'
          : 'bg-[#F97316]/50 text-white cursor-not-allowed'
      ]" v-slot:child>
        Pay Securely
      </Button>
    </div>
  </div>
</template>

<style scoped>
.bg-purple\/20 {
  background-color: rgba(128, 0, 128, 0.2);
}

.text-purple {
  color: rgb(128, 0, 128);
}
</style>